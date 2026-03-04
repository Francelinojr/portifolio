/**
 * optimize-images.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Converte todas as imagens do /public para WebP + AVIF e gera fallback JPEG
 * otimizado. Também cria variantes responsivas (400w, 800w).
 *
 * USO:  node scripts/optimize-images.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Pastas a processar (relativas a /public)
const INPUT_DIRS = [
    path.join(ROOT, 'public', 'assets'),
    path.join(ROOT, 'public', 'projects'),
];

const SUPPORTED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif']);

// Tamanhos responsivos para geração (somente para imagens > 200px de largura)
const RESPONSIVE_WIDTHS = [400, 800];

// Qualidade de saída
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 65;
const JPEG_QUALITY = 80;

// ─── helpers ─────────────────────────────────────────────────────────────────

function humanBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
}

async function getSize(filePath) {
    try { return fs.statSync(filePath).size; }
    catch { return 0; }
}

// ─── main ────────────────────────────────────────────────────────────────────

async function optimizeImage(inputPath, outputDir) {
    const ext = path.extname(inputPath).toLowerCase();
    const stem = path.basename(inputPath, ext);
    const origSize = await getSize(inputPath);

    // Pular arquivos já otimizados (ex: .webp, .avif)
    if (!SUPPORTED_EXTS.has(ext)) return;

    console.log(`\n📷  ${path.relative(ROOT, inputPath)} (${humanBytes(origSize)})`);

    const img = sharp(inputPath);
    const meta = await img.metadata();
    const w = meta.width ?? 800;
    const h = meta.height ?? 600;

    const results = [];

    // ── WebP (full size) ──────────────────────────────────────────────────────
    const webpPath = path.join(outputDir, `${stem}.webp`);
    await sharp(inputPath).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
    results.push({ label: 'WebP (full)', path: webpPath, size: await getSize(webpPath) });

    // ── AVIF (full size) ──────────────────────────────────────────────────────
    const avifPath = path.join(outputDir, `${stem}.avif`);
    await sharp(inputPath).avif({ quality: AVIF_QUALITY }).toFile(avifPath);
    results.push({ label: 'AVIF (full)', path: avifPath, size: await getSize(avifPath) });

    // ── JPEG optimized fallback ───────────────────────────────────────────────
    const jpgOut = ext === '.png'
        ? path.join(outputDir, `${stem}.jpg`)
        : inputPath;                    // sobrescreve o JPG original
    await sharp(inputPath).jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(jpgOut + '.tmp');
    // Só substitui se o resultado for menor
    const tmpSize = await getSize(jpgOut + '.tmp');
    if (tmpSize < origSize || ext === '.png') {
        fs.renameSync(jpgOut + '.tmp', jpgOut);
        results.push({ label: 'JPEG optimized', path: jpgOut, size: tmpSize });
    } else {
        fs.unlinkSync(jpgOut + '.tmp');
        results.push({ label: 'JPEG (kept original)', path: inputPath, size: origSize });
    }

    // ── Responsive variants (WebP only) ──────────────────────────────────────
    for (const targetW of RESPONSIVE_WIDTHS) {
        if (targetW >= w) continue;           // não upscale
        const targetH = Math.round((h / w) * targetW);
        const respPath = path.join(outputDir, `${stem}-${targetW}w.webp`);
        await sharp(inputPath)
            .resize(targetW, targetH, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: WEBP_QUALITY })
            .toFile(respPath);
        results.push({ label: `WebP ${targetW}w`, path: respPath, size: await getSize(respPath) });
    }

    // ── Print summary ─────────────────────────────────────────────────────────
    let totalSaved = 0;
    for (const r of results) {
        const saved = origSize - r.size;
        totalSaved += Math.max(0, saved);
        const pct = origSize > 0 ? ((saved / origSize) * 100).toFixed(0) : '0';
        const icon = saved > 0 ? '✅' : '⚠️';
        console.log(`   ${icon}  ${r.label.padEnd(22)} → ${humanBytes(r.size).padStart(8)}  (${pct}% savings)`);
    }
    console.log(`   💾  Total saved: ${humanBytes(totalSaved)}`);
}

async function processDir(dir) {
    if (!fs.existsSync(dir)) {
        console.warn(`⚠️  Directory not found, skipping: ${dir}`);
        return;
    }

    // Pasta de saída = mesma de entrada (sobrescreve otimizados)
    const outputDir = dir;
    fs.mkdirSync(outputDir, { recursive: true });

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (SUPPORTED_EXTS.has(ext)) {
            await optimizeImage(path.join(dir, file), outputDir);
        }
    }
}

// ─── entry point ─────────────────────────────────────────────────────────────
console.log('🚀  Image Optimization Script — Portfólio Francelino Júnior\n');
console.log('📁  Targets:', INPUT_DIRS.map(d => path.relative(ROOT, d)).join(', '));
console.log('────────────────────────────────────────────────────────────');

for (const dir of INPUT_DIRS) {
    await processDir(dir);
}

console.log('\n✨  Optimization complete!');
console.log('   Next steps:');
console.log('   1. Update <img> tags to use <picture> with srcset (WebP + AVIF + JPG fallback)');
console.log('   2. Run: npm run build && npx lighthouse http://localhost:4173/ --view');
