import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Clock, BookOpen, School, Search, Sparkles, CheckCircle2 } from 'lucide-react';
import { Certificate } from '@/types';

/** Mapa de meses em pt-BR para timestamp */
const MONTHS: Record<string, number> = {
  Jan: 0, Fev: 1, Mar: 2, Abr: 3, Mai: 4, Jun: 5,
  Jul: 6, Ago: 7, Set: 8, Out: 9, Nov: 10, Dez: 11,
};

function parseCertDate(dateStr: string): number {
  const parts = dateStr.trim().split(' ');
  const mon = parts[0];
  const year = parseInt(parts[1] ?? '2000', 10);
  return new Date(year, MONTHS[mon] ?? 0).getTime();
}

const RAW_CERTIFICATES: Certificate[] = [
  {
    title: "Instalador e Reparador de Redes de Computadores",
    org: "IFRS - Instituto Federal do Rio Grande do Sul",
    date: "Ago 2026",
    hours: "200h",
    category: "Hardware",
    pdf: "/Certificados/Instalador_e_Reparador_de_Redes_de_Computadores-Certificado_digital_4677642.pdf",
  },
  {
    title: "JP TECH: Capacitação para o Futuro Figital",
    org: "UFPB / PROEX",
    date: "Out 2025",
    hours: "336h",
    category: "Acadêmico",
    pdf: "/Certificados/CERTIFICADO_PROEX_40445023.pdf",
  },
  {
    title: "Jornada JPTech de Capacitação",
    org: "UFPB / PROEX",
    date: "Jun 2025",
    hours: "192h",
    category: "Acadêmico",
    pdf: "/Certificados/CERTIFICADO_PROEX_40444976.pdf",
  },
  {
    title: "Ciência de Dados por Ignorância Zero",
    org: "Cursa / Ignorância Zero",
    date: "Fev 2026",
    hours: "62h",
    category: "IA",
    pdf: "/Certificados/Ciencia de dados por ignorancianova data.pdf",
  },
  {
    title: "Aprenda criar seu próprio Jogo na prática",
    org: "Cursa / Crie Seus Jogos",
    date: "Fev 2026",
    hours: "113h",
    category: "Programação",
    pdf: "/Certificados/Aprenda criar seu prorio jogo na pratica por crie seus jogos.pdf",
  },
  {
    title: "Games com Unity 3D por GamesIndie",
    org: "Cursa / GamesIndie",
    date: "Fev 2026",
    hours: "86h",
    category: "Programação",
    pdf: "/Certificados/Games com Unity 3d por GamesIndie.pdf",
  },
  {
    title: "Princípios de Economia: Microeconomia",
    org: "Enap",
    date: "Fev 2026",
    hours: "50h",
    category: "Acadêmico",
    pdf: "/Certificados/principios_de_economia_microeconomia_turma_fev2026_certificado.pdf",
  },
  {
    title: "English Proficiency (Low Intermediate)",
    org: "Voxy",
    date: "Jan 2026",
    hours: "A2",
    category: "Acadêmico",
    pdf: "/Certificados/inglês certificado.pdf",
  },
  {
    title: "Excel na Prática",
    org: "Fundação Bradesco",
    date: "Fev 2026",
    hours: "16h",
    category: "Ferramentas",
    pdf: "/Certificados/CertificadoEXCEL NA PRÁTICA.pdf",
  },
  {
    title: "Word na Prática",
    org: "Fundação Bradesco",
    date: "Fev 2026",
    hours: "16h",
    category: "Ferramentas",
    pdf: "/Certificados/CertificadoWord.pdf",
  },
  {
    title: "PowerPoint na Prática",
    org: "Fundação Bradesco",
    date: "Fev 2026",
    hours: "16h",
    category: "Ferramentas",
    pdf: "/Certificados/Certificadopowerpoint na pratica.pdf",
  },
  {
    title: "Data Science 101",
    org: "IBM / Cognitive Class",
    date: "Jan 2026",
    hours: "8h",
    category: "IA",
    pdf: "/Certificados/Certificado IBMData Science 101.pdf",
  },
  {
    title: "Desafio de GenAI do iFood",
    org: "iFood / NetworkMe",
    date: "Nov 2025",
    hours: "Partic.",
    category: "IA",
    pdf: "/Certificados/certificado ifood.pdf",
  },
  {
    title: "Banco de Dados SQL Server",
    org: "Cursa / Trovato",
    date: "Fev 2026",
    hours: "16h",
    category: "Programação",
    pdf: "/Certificados/Certificado Sql server.pdf",
  },
  {
    title: "Jornada Python",
    org: "Hashtag Treinamentos",
    date: "Jan 2026",
    hours: "8h",
    category: "Programação",
    pdf: "/Certificados/Validação Certificado.pdf",
  },
  {
    title: "Introdução à POO",
    org: "Fundação Bradesco",
    date: "Fev 2026",
    hours: "5h",
    category: "Programação",
    pdf: "/Certificados/CertificadoIPOO A.pdf",
  },
  {
    title: "Microsoft Office 365: Outlook",
    org: "Fundação Bradesco",
    date: "Fev 2026",
    hours: "1h",
    category: "Ferramentas",
    pdf: "/Certificados/Certificado outlook.pdf",
  },
  {
    title: "Montagem e Manutenção de PCs",
    org: "Microlins",
    date: "Jan 2015",
    hours: "16h",
    category: "Hardware",
    pdf: "/Certificados/Certificado Microlins.pdf",
  },
  {
    title: "Word e Excel Essencial",
    org: "Cursa / Curso em Vídeo",
    date: "Abr 2025",
    hours: "8h",
    category: "Ferramentas",
    pdf: "/Certificados/Certificado excel e word.pdf",
  },
  {
    title: "XXII Semana da Computação (Dia 1)",
    org: "UFPB / CI",
    date: "Out 2019",
    hours: "6h",
    category: "Evento",
    pdf: "/Certificados/CERTIFICADO_PROEX_50731.pdf",
  },
  {
    title: "XXII Semana da Computação (Dia 2)",
    org: "UFPB / CI",
    date: "Out 2019",
    hours: "4h",
    category: "Evento",
    pdf: "/Certificados/CERTIFICADO_PROEX_50783.pdf",
  },
  {
    title: "XXII Semana da Computação (Dia 3)",
    org: "UFPB / CI",
    date: "Out 2019",
    hours: "8h",
    category: "Evento",
    pdf: "/Certificados/CERTIFICADO_PROEX_50840 .pdf",
  },
];

// Ordenação decrescente por data
const ALL_CERTIFICATES = [...RAW_CERTIFICATES].sort(
  (a, b) => parseCertDate(b.date) - parseCertDate(a.date)
);

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'IA': { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800/40' },
  'Programação': { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800/40' },
  'Hardware': { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-800/40' },
  'Acadêmico': { bg: 'bg-indigo-50 dark:bg-indigo-950/40', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-200 dark:border-indigo-800/40' },
  'Ferramentas': { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-800/40' },
  'Evento': { bg: 'bg-cyan-50 dark:bg-cyan-950/40', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-200 dark:border-cyan-800/40' },
};

function isRecent(dateStr: string): boolean {
  const parts = dateStr.trim().split(' ');
  const year = parseInt(parts[1] ?? '2000', 10);
  return year >= 2026;
}

export default function Certificates() {
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Todos', 'IA', 'Programação', 'Hardware', 'Acadêmico', 'Ferramentas', 'Evento'];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: ALL_CERTIFICATES.length };
    for (const cert of ALL_CERTIFICATES) {
      counts[cert.category] = (counts[cert.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const stats = useMemo(() => ({
    total: ALL_CERTIFICATES.length,
    institutions: new Set(ALL_CERTIFICATES.map((c) => c.org)).size,
    recentCount: ALL_CERTIFICATES.filter((c) => isRecent(c.date)).length,
  }), []);

  const filteredCerts = useMemo(() => {
    return ALL_CERTIFICATES.filter((c) => {
      const matchesCategory = filter === 'Todos' || c.category === filter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <section id="certificates" className="py-16 px-4 bg-transparent transition-colors scroll-mt-24">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-10 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Award size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Educação Continuada
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certificações & Cursos
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Histórico completo de cursos, oficinas e especializações com verificação em PDF.
          </p>
        </div>

        {/* Stats Mini Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-2xl glass-panel flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <BookOpen size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{stats.total}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Certificados Registrados</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <School size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{stats.institutions}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Instituições Emissoras</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl glass-panel flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Sparkles size={22} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{stats.recentCount}</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Novas Conquistas (2026)</p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8 p-3 rounded-2xl glass-panel">
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por curso, instituição (ex: IFRS, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-800/50'
                }`}
              >
                {cat} {categoryCounts[cat] !== undefined ? `(${categoryCounts[cat]})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => {
              const catStyle = CATEGORY_COLORS[cert.category] ?? {
                bg: 'bg-slate-50 dark:bg-slate-900',
                text: 'text-slate-700 dark:text-slate-300',
                border: 'border-slate-200 dark:border-slate-800',
              };
              const recent = isRecent(cert.date);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={cert.title}
                  className="group flex flex-col justify-between p-5 rounded-2xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80"
                >
                  {/* Top Bar: Category Pill + Hours Pill + Novo Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}>
                        {cert.category}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {recent && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow-sm shadow-emerald-500/30">
                            <Sparkles size={10} /> NOVO
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          <Clock size={10} className="text-blue-500" />
                          {cert.hours}
                        </span>
                      </div>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug mb-1.5 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-4">
                      <School size={13} className="text-indigo-500 shrink-0" />
                      <span className="truncate">{cert.org}</span>
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between mt-2">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {cert.date}
                    </span>

                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-600 dark:hover:bg-blue-600 text-blue-600 dark:text-blue-400 hover:text-white dark:hover:text-white text-xs font-semibold transition-all border border-blue-200/60 dark:border-blue-900/60 cursor-pointer shadow-xs"
                    >
                      Ver PDF
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredCerts.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl glass-panel">
            <p className="text-base font-semibold text-slate-900 dark:text-white mb-1">Nenhum certificado encontrado</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tente buscar por outro termo ou selecione a categoria "Todos".</p>
          </div>
        )}

      </div>
    </section>
  );
}
