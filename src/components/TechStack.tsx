import { motion } from 'framer-motion';
import { Code2, Brain, Database, Cloud, BarChart3, Globe, Cpu, Wrench } from 'lucide-react';
import * as SI from 'simple-icons';
import {
  sectionContainer,
  fadeUp,
  staggerItem,
  viewport,
  hoverScale,
  tapScale,
} from '@/lib/motion-variants';

/** Shared icon lookup */
const ICON_MAP: Record<string, { path: string; hex: string }> = {
  'Python': SI.siPython,
  'TypeScript': SI.siTypescript,
  'JavaScript': SI.siJavascript,
  'SQL': SI.siPostgresql,
  'Dart': SI.siDart,
  'HTML5': SI.siHtml5,
  'C/C++': SI.siCplusplus,
  'Pandas': SI.siPandas,
  'NumPy': SI.siNumpy,
  'Scikit-learn': SI.siScikitlearn,
  'React': SI.siReact,
  'Flutter': SI.siFlutter,
  'Tailwind CSS': SI.siTailwindcss,
  'PostgreSQL': SI.siPostgresql,
  'MySQL': SI.siMysql,
  'MongoDB': SI.siMongodb,
  'Git': SI.siGit,
  'GitHub': SI.siGithub,
  'Docker': SI.siDocker,
  'FastAPI': SI.siFastapi,
  'Flask': SI.siFlask,
  'Django': SI.siDjango,
};

const TechIcon = ({ name }: { name: string }) => {
  const icon = ICON_MAP[name.trim()];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill={`#${icon.hex}`}
      className="mr-2 flex-shrink-0"
    >
      <path d={icon.path} />
    </svg>
  );
};

const techCategories = [
  {
    title: 'Linguagens',
    icon: <Code2 size={18} className="text-blue-500" />,
    items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Dart', 'HTML5', 'C/C++'],
  },
  {
    title: 'Ciência de Dados',
    icon: <BarChart3 size={18} className="text-indigo-500" />,
    items: ['Pandas', 'NumPy', 'Scikit-learn', 'Modelagem Preditiva'],
  },
  {
    title: 'Machine Learning & IA',
    icon: <Brain size={18} className="text-purple-500" />,
    items: ['SVM', 'Redes Neurais', 'Clustering (K-Means)', 'GenAI'],
  },
  {
    title: 'Frameworks & Frontend',
    icon: <Globe size={18} className="text-cyan-500" />,
    items: ['React', 'Flutter', 'Tailwind CSS', 'FastAPI', 'Flask', 'Django'],
  },
  {
    title: 'Bancos de Dados',
    icon: <Database size={18} className="text-emerald-500" />,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQL Server'],
  },
  {
    title: 'DevOps & Ferramentas',
    icon: <Wrench size={18} className="text-amber-500" />,
    items: ['Git', 'GitHub', 'Docker', 'AWS (EC2, S3)', 'Redes de Computadores'],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-16 px-4 bg-transparent transition-colors scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Section heading */}
        <motion.div
          className="mb-10 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Cpu size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Stack Tecnológica
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Competências Técnicas
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Linguagens, frameworks, bibliotecas e ferramentas aplicadas no desenvolvimento dos meus projetos.
          </p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionContainer}
        >
          {techCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={staggerItem}
              className="p-5 rounded-2xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 shadow-xs">
                    {category.icon}
                  </div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <motion.div
                      key={item}
                      whileHover={hoverScale}
                      whileTap={tapScale}
                      className="flex items-center px-2.5 py-1.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 shadow-xs cursor-default"
                    >
                      <TechIcon name={item} />
                      <span className="text-slate-700 dark:text-slate-300 text-xs font-medium">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
