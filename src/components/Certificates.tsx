import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Clock, BookOpen, School } from 'lucide-react';
import { Certificate } from '@/types';

const certificates: Certificate[] = [
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
  }
];

export default function Certificates() {
  const [filter, setFilter] = useState('Todos');

  // Categorias únicas baseadas na referência
  const categories = ['Todos', 'Acadêmico', 'Evento', 'Ferramentas', 'Hardware', 'IA', 'Programação'];

  const stats = useMemo(() => ({
    total: certificates.length,
    institutions: new Set(certificates.map(c => c.org)).size
  }), []);

  const filteredCerts = useMemo(() =>
    filter === 'Todos' ? certificates : certificates.filter(c => c.category === filter)
    , [filter]);

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-[#030712] transition-colors scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">

        {/* Dashboard de Estatísticas */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-blue-600 pl-4">
            Certificados
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 ml-4">
            Certificações e cursos que completei ao longo da minha jornada de aprendizado.
          </p>

          <div className="flex gap-4 mb-10 ml-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-2xl flex items-center gap-3 border border-blue-100 dark:border-blue-800/50">
              <div className="bg-white dark:bg-blue-900/40 p-2 rounded-lg shadow-sm">
                <BookOpen size={20} className="text-blue-600" />
              </div>
              <div>
                <span className="block text-xl font-bold text-blue-600 leading-none">{stats.total}</span>
                <span className="text-[10px] text-blue-600/70 uppercase font-black tracking-wider">certificados</span>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-3 rounded-2xl flex items-center gap-3 border border-slate-100 dark:border-slate-800">
              <div className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-sm">
                <School size={20} className="text-slate-500" />
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-700 dark:text-slate-300 leading-none">{stats.institutions}</span>
                <span className="text-[10px] text-slate-500 uppercase font-black tracking-wider">instituições</span>
              </div>
            </div>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-2 bg-slate-50/50 dark:bg-slate-900/20 p-2 rounded-2xl border border-slate-100 dark:border-slate-800/50">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${filter === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-500 hover:bg-white dark:hover:bg-slate-800'
                  }`}
              >
                {cat} {cat === 'Todos' ? `(${stats.total})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Grade de Certificados Personalizada */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredCerts.map((cert) => (
              <motion.a
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={cert.title}
                href={cert.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 hover:border-blue-500 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-blue-500/5 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-2xl group-hover:bg-blue-600 transition-colors shadow-inner">
                      <Award size={24} className="text-blue-600 group-hover:text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800">
                      <Clock size={12} className="text-blue-500" /> {cert.hours}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-bold mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {cert.org}
                    </p>
                    <span className="inline-block text-[9px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-black uppercase tracking-tighter border border-slate-200 dark:border-slate-700/50">
                      {cert.category}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/50">
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{cert.date}</span>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-tight group-hover:translate-x-1 transition-transform">
                    ABRIR PDF <ExternalLink size={14} />
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
