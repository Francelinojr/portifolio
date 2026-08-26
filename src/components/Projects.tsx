import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardVariant, sectionContainer, hoverLift, tapScale } from '@/lib/motion-variants';
import { Project } from '@/types';
import { useGithubRepos } from '@/hooks/useGithubRepos';

// Mapeamento centralizado de imagens de projetos
const projectImages: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': '/projects/breast-cancer.jpg',
  'Costura-App': '/projects/Costura.jpg',
  'Geografia-da-Desigualdade': '/projects/desigualdade.jpg',
  'default': '/assets/default-project.jpg'
};

const projectWebP: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': '/projects/breast-cancer.webp',
  'Costura-App': '/projects/Costura.webp',
  'default': ''
};

const projectAVIF: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': '/projects/breast-cancer.avif',
  'Costura-App': '/projects/Costura.avif',
  'default': ''
};

const fallback: Project[] = [
  {
    title: 'Classificação de Câncer de Mama',
    description: 'Pipeline de Machine Learning (SVM) com 98,6% de acurácia na classificação de tumores.',
    tags: ['Python', 'Scikit-learn', 'SVM'],
    url: 'https://github.com/Francelinojr/Breast-Cancer-Wisconsin-Diagnostic-',
    image: projectImages['Breast-Cancer-Wisconsin-Diagnostic-'],
    complexity: 'Elaborados'
  },
  {
    title: 'Costura App',
    description: 'Sistema de gestão para ateliês com arquitetura MVC e persistência de dados local.',
    tags: ['Dart', 'Flutter', 'Provider'],
    url: 'https://github.com/Francelinojr',
    image: projectImages['Costura-App'],
    complexity: 'Elaborados'
  },
  {
    title: 'Geografia da Desigualdade',
    description: 'Estudo de clusters sobre a participação feminina em STEM no Nordeste vs. Sudeste.',
    tags: ['Python', 'K-Means', 'Geospatial'],
    url: 'https://github.com/Francelinojr',
    image: projectImages['Geografia-da-Desigualdade'],
    complexity: 'Simples'
  }
];

function classifyComplexity(name: string, desc: string | null | undefined): 'Simples' | 'Elaborados' {
  const text = `${name} ${desc ?? ''}`.toLowerCase();
  const heavy = ['app', 'dashboard', 'api', 'deploy', 'flutter', 'react'];
  if ((desc?.length ?? 0) > 80 || heavy.some((k) => text.includes(k))) return 'Elaborados';
  return 'Simples';
}

const TRANSPARENT_1PX = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

export default function Projects({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const [filter, setFilter] = useState<'Todos' | 'Simples' | 'Elaborados'>('Todos');
  const { repos: ghRepos, loading } = useGithubRepos('Francelinojr', 100);

  const mappedRepos = useMemo(() => {
    if (!ghRepos) return null;
    return ghRepos.map((d) => ({
      title: d.name,
      description: d.description ?? 'Projeto focado em Ciência de Dados e Desenvolvimento.',
      tags: [d.language ?? 'N/A', 'GitHub'],
      url: d.html_url,
      image: projectImages[d.name] ?? projectImages['default'],
      complexity: classifyComplexity(d.name, d.description),
    }));
  }, [ghRepos]);

  const repos = useMemo(() => {
    if (!mappedRepos) return null;
    if (variant === 'compact') {
      const keywords = ['svm', 'neural', 'notebook', 'ml', 'machine', 'cancer', 'costura', 'desigualdade', 'dashboard', 'api'];
      const curated = mappedRepos
        .filter((p) =>
          keywords.some((k) => p.title.toLowerCase().includes(k)) ||
          keywords.some((k) => (p.description ?? '').toLowerCase().includes(k))
        )
        .slice(0, 3);
      return curated.length ? curated : mappedRepos.slice(0, 3);
    }
    return mappedRepos;
  }, [mappedRepos, variant]);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    if (!target.src.endsWith(projectImages['default'])) {
      target.src = projectImages['default'];
    } else {
      target.src = TRANSPARENT_1PX;
    }
  }, []);

  const allProjects = useMemo(() => repos ?? fallback, [repos]);

  const filtered = useMemo(() => {
    if (variant === 'compact') return allProjects.slice(0, 3);
    if (filter === 'Todos') return allProjects;
    return allProjects.filter((p) => p.complexity === filter);
  }, [allProjects, filter, variant]);

  return (
    <section id="projects" className={`py-16 px-4 bg-white dark:bg-[#030712] transition-colors ${variant === 'compact' ? 'scroll-mt-20' : ''}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div className="text-left">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 border-l-4 border-blue-600 pl-3">
              {variant === 'compact' ? 'Projetos em Destaque' : 'Projetos'}
            </h2>
          </div>
          {variant === 'compact' ? (
            <Link
              to="/projects"
              className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline flex items-center gap-1"
            >
              Ver todos <ExternalLink size={12} />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              {(['Todos', 'Simples', 'Elaborados'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    filter === f
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && variant === 'full' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 animate-pulse bg-white dark:bg-slate-900/40">
                <div className="h-44 bg-slate-200 dark:bg-slate-800" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-4/5" />
                  <div className="flex gap-2 pt-2">
                    <div className="h-4 w-12 bg-blue-100 dark:bg-blue-900/40 rounded-full" />
                    <div className="h-4 w-12 bg-slate-100 dark:bg-slate-800 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project grid */}
        {!loading && (
          <motion.div
            className={`grid grid-cols-1 ${variant === 'full' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-6`}
            initial="hidden"
            animate="visible"
            variants={sectionContainer}
          >
            {filtered.length === 0 ? (
              <div className="col-span-3 py-20 text-center text-slate-400 dark:text-slate-500">
                <p className="text-sm">Nenhum projeto encontrado para este filtro.</p>
              </div>
            ) : (
              filtered.map((p) => (
                <motion.div
                  key={p.title}
                  variants={cardVariant}
                  whileHover={hoverLift}
                  whileTap={tapScale}
                  className="group grad-border-dark flex flex-col relative rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="glass-card flex flex-col flex-grow h-full bg-white dark:bg-slate-900/50">
                    <div className={`relative ${variant === 'compact' ? 'h-36' : 'h-44'} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                      <picture>
                        {projectAVIF[p.title] && (
                          <source srcSet={projectAVIF[p.title]} type="image/avif" />
                        )}
                        {projectWebP[p.title] && (
                          <source srcSet={projectWebP[p.title]} type="image/webp" />
                        )}
                        <img
                          src={p.image}
                          alt={p.title}
                          width={400}
                          height={variant === 'compact' ? 144 : 176}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={handleImageError}
                        />
                      </picture>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <div className="p-2 bg-white/90 dark:bg-slate-900/70 backdrop-blur-sm rounded-full text-slate-900 dark:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <Github size={18} />
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="hidden dark:flex items-center gap-1 px-2 py-0.5 bg-blue-600/80 backdrop-blur-sm text-white text-[9px] font-bold rounded-full">
                          GitHub
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 line-clamp-3 flex-grow italic leading-relaxed">
                        {p.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 dark:border dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-[9px] font-bold uppercase tracking-wider rounded-full"
                          >
                            {t}
                          </span>
                        ))}
                        <span className="ml-auto px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[9px] rounded-full font-medium">
                          {p.complexity}
                        </span>
                      </div>
                    </div>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10"
                      aria-label={`Ver projeto ${p.title}`}
                    />
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
