import { motion } from 'framer-motion';
import { ExperienceItem } from '@/types';
import { fadeUp, slideLeft, viewport } from '@/lib/motion-variants';

/** Static experience data — module-level to avoid per-render allocation. */
const EXP_DATA: ExperienceItem = {
  role: "Monitor e Organizador (Voluntário)",
  company: "UFPB - Projeto JP TECH",
  period: "AGO 2024 — OUT 2025",
  image: "/projects/jptech.jpg",
  details: [
    "Atuação nos projetos 'Capacitação para o Futuro Figital' e 'Jornada JPTech', totalizando 528 horas de atividades certificadas pela PROEX.",
    "Suporte Pedagógico ministrando aulas de lógica computacional e preparação de materiais didáticos.",
    "Gestão e Eventos: logística de oficinas e palestras, mediação entre discentes e docentes."
  ]
};

export default function Experience() {
  const exp = EXP_DATA;

  return (
    <section id="experience" className="py-12 scroll-mt-24">
      {/* Heading — fade up */}
      <motion.div
        className="text-left mb-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 border-l-4 border-blue-600 pl-4">
          Experiência
        </h2>
      </motion.div>

      <div className="relative pl-4 border-l-2 border-slate-100 dark:border-slate-800">
        {/* Timeline item — slide from left */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideLeft}
          className="relative"
        >
          {/* Timeline dot */}
          <div className="absolute -left-[1.5rem] top-7 w-4 h-4 rounded-full border-2 border-blue-600 bg-white dark:bg-[#030712] z-10" />

          <motion.div
            whileHover={{ y: -2, boxShadow: '0 8px 24px -4px rgb(0 0 0 / 0.12)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row gap-6 shadow-sm"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 bg-white p-1">
                <img
                  src={exp.image}
                  alt={`Logo ${exp.company}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/lion.svg';
                  }}
                />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {exp.company}
                  </p>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2">
                {exp.details.map((item, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex gap-2 italic">
                    <span className="text-blue-500 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
