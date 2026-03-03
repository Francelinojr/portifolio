import { motion } from 'framer-motion';
import { Code2, Brain, Database, Cloud, BarChart3 } from 'lucide-react';
import * as SI from 'simple-icons';
import {
  sectionContainer,
  fadeUp,
  staggerItem,
  viewport,
  hoverScale,
  tapScale,
} from '@/lib/motion-variants';

/** Shared icon lookup — module-level so it's never rebuilt on re-render. */
const ICON_MAP: Record<string, { path: string; hex: string }> = {
  'Python': SI.siPython,
  'SQL': SI.siPostgresql,
  'JavaScript': SI.siJavascript,
  'Dart': SI.siDart,
  'HTML5': SI.siHtml5,
  'C/C++': SI.siCplusplus,
  'Pandas': SI.siPandas,
  'NumPy': SI.siNumpy,
  'Scikit-learn': SI.siScikitlearn,
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

/** Renders the brand-coloured SVG logo for a given tech name. */
const TechIcon = ({ name }: { name: string }) => {
  const icon = ICON_MAP[name.trim()];
  if (!icon) return null;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill={`#${icon.hex}`}
      className="mr-2"
    >
      <path d={icon.path} />
    </svg>
  );
};

const techCategories = [
  {
    title: 'Linguagens',
    icon: <Code2 size={16} className="text-blue-600" />,
    items: ['Python ', 'SQL ', 'JavaScript', 'Dart', 'HTML5', 'C/C++']
  },
  {
    title: 'Ciência de Dados',
    icon: <BarChart3 size={16} className="text-blue-600" />,
    items: ['Pandas', 'NumPy', 'Scikit-learn']
  },
  {
    title: 'Machine Learning',
    icon: <Brain size={16} className="text-blue-600" />,
    items: ['Modelagem Preditiva', 'SVM', 'Redes Neurais']
  },
  {
    title: 'Banco de Dados',
    icon: <Database size={16} className="text-blue-600" />,
    items: ['PostgreSQL', 'MySQL', 'MongoDB']
  },
  {
    title: 'Cloud & Ferramentas',
    icon: <Cloud size={16} className="text-blue-600" />,
    items: ['Git', 'GitHub', 'Docker', 'AWS (EC2, S3, Lambda)', 'FastAPI']
  }
];

export default function TechStack() {
  return (
    <section id="tech" className="py-16 px-4 bg-white dark:bg-[#030712]">
      <div className="max-w-6xl mx-auto">
        {/* Section heading — fade up */}
        <motion.div
          className="mb-10 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
            Competências Técnicas
          </h2>
          <div className="h-[0.2rem] w-16 bg-blue-600 rounded-full" />
        </motion.div>

        {/* Category grid — stagger container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={sectionContainer}
        >
          {techCategories.map((category) => (
            <motion.div key={category.title} variants={staggerItem}>
              <div className="flex items-center gap-2 mb-4">
                {category.icon}
                <h3 className="text-blue-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={hoverScale}
                    whileTap={tapScale}
                    className="flex items-center px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-default"
                  >
                    <TechIcon name={item} />
                    <span className="text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
