import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';
import { fadeUp, slideLeft, viewport } from '@/lib/motion-variants';

interface TimelineItem {
  type: 'experience' | 'education';
  title: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  skills: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    type: 'experience',
    title: 'Monitor e Organizador Pedagógico (Voluntário)',
    institution: 'UFPB — Projeto JP TECH / PROEX',
    period: 'AGO 2024 — OUT 2025',
    location: 'João Pessoa, PB',
    description: 'Atuação de destaque nos programas "Capacitação para o Futuro Figital" e "Jornada JPTech", somando mais de 528 horas certificadas de atividades pedagógicas e tecnológicas.',
    bullets: [
      'Ministração de aulas práticas de lógica computacional e introdução à programação para turmas de capacitação.',
      'Elaboração de materiais didáticos, exercícios práticos e mediação de dúvidas técnicas de alunos.',
      'Organização de eventos, logística de oficinas e palestras com corpo docente e coordenação.',
    ],
    skills: ['Lógica de Programação', 'Suporte Pedagógico', 'Gestão de Eventos', 'PROEX UFPB'],
  },
  {
    type: 'education',
    title: 'Bacharelado em Ciência de Dados & Inteligência Artificial',
    institution: 'Universidade Federal da Paraíba (UFPB)',
    period: '2023 — Presente (Em andamento)',
    location: 'João Pessoa, PB',
    description: 'Formação acadêmica sólida focada em fundamentos matemáticos, estatísticos e computacionais para extração de conhecimento e desenvolvimento de soluções de IA.',
    bullets: [
      'Domínio em Estatística Descritiva e Inferencial, Álgebra Linear e Cálculo Numérico aplicado a dados.',
      'Desenvolvimento de algoritmos de Machine Learning supervisionado e não supervisionado em Python.',
      'Construção de pipelines de dados, modelagem preditiva, análise exploratória e bancos de dados SQL/NoSQL.',
    ],
    skills: ['Machine Learning', 'Estatística', 'Python & SQL', 'Algoritmos & Estruturas de Dados', 'Deep Learning'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-16 px-4 bg-transparent transition-colors scroll-mt-24">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-left mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Briefcase size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Trajetória Profissional
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Experiência & Formação
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Minha base acadêmica na UFPB somada a projetos práticos de ensino e extensão tecnológica.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {TIMELINE_DATA.map((item, index) => {
            const isExp = item.type === 'experience';

            return (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={slideLeft}
                className="flex flex-col justify-between p-6 sm:p-7 rounded-3xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80 relative"
              >
                <div>
                  {/* Top Bar: Type Icon & Period */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2.5 rounded-xl ${isExp ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'}`}>
                        {isExp ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {isExp ? 'Experiência & Extensão' : 'Formação Acadêmica'}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40">
                      <Calendar size={11} />
                      {item.period}
                    </span>
                  </div>

                  {/* Title & Institution */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 mb-4">
                    <MapPin size={13} className="text-slate-400 shrink-0" />
                    {item.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Bullets */}
                  <ul className="space-y-2.5 mb-6">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills Tags */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70 flex flex-wrap gap-1.5 mt-auto">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
