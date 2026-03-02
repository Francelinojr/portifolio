import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  image: string;
  complexity: 'Simples' | 'Elaborados';
};

// Mapeamento centralizado de imagens
const projectImages: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': '/projects/breast-cancer.jpg', 
  'Costura-App': '/projects/costura.jpg',
  'Geografia-da-Desigualdade': '/projects/desigualdade.jpg', // Adicionado conforme seu currículo
  'default': 'https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop'
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

function classifyComplexity(name: string, desc: string | null | undefined) {
  const text = `${name} ${desc ?? ''}`.toLowerCase();
  const heavy = ['app', 'dashboard', 'api', 'deploy', 'flutter', 'react'];
  if ((desc?.length ?? 0) > 80 || heavy.some((k) => text.includes(k))) return 'Elaborados';
  return 'Simples';
}

export default function Projects({ variant = 'compact' as 'compact' | 'full' }) {
  const [repos, setRepos] = useState<Project[] | null>(null);
  const [filter, setFilter] = useState<'Todos' | 'Simples' | 'Elaborados'>('Todos');

  useEffect(() => {
    fetch('https://api.github.com/users/Francelinojr/repos?per_page=100&sort=updated')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data)) return;

        const base = (data as any[])
          .filter((d) => !d.fork);

        const mapped = base.map((d: any) => ({
          title: d.name,
          description: d.description || 'Projeto focado em Ciência de Dados e Desenvolvimento.',
          tags: [d.language || 'N/A', 'GitHub'],
          url: d.html_url,
          image: projectImages[d.name] || projectImages['default'],
          complexity: classifyComplexity(d.name, d.description)
        })) as Project[];

        if (variant === 'compact') {
          const keywords = ['svm', 'neural', 'notebook', 'ml', 'machine', 'cancer', 'costura', 'desigualdade', 'dashboard', 'api'];
          const curated = mapped
            .filter((p) =>
              keywords.some((k) => p.title.toLowerCase().includes(k)) ||
              keywords.some((k) => (p.description ?? '').toLowerCase().includes(k))
            )
            .slice(0, 3);
          if (curated.length) setRepos(curated);
          else setRepos(mapped.slice(0, 3));
        } else {
          setRepos(mapped);
        }
      })
      .catch(() => void 0);
  }, [variant]);

  const allProjects = useMemo(() => repos ?? fallback, [repos]);
  const filtered = useMemo(() => {
    if (variant === 'compact') return (allProjects ?? []).slice(0, 3);
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
            <a 
              href="/projects"
              className="text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline flex items-center gap-1"
            >
              Ver todos <ExternalLink size={12} />
            </a>
          ) : (
            <div className="flex items-center gap-2">
              {(['Todos','Simples','Elaborados'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    filter === f
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/50'
                      : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={`grid grid-cols-1 ${variant === 'full' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} gap-6`}>
          {filtered.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col relative"
            >
              <div className={`relative ${variant === 'compact' ? 'h-36' : 'h-44'} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                <img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = projectImages['default'];
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="p-2 bg-white rounded-full text-slate-900 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      <Github size={18} />
                   </div>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-3 line-clamp-3 flex-grow italic">
                  {p.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {p.tags.slice(0, 3).map((t) => (
                    <span 
                      key={t} 
                      className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[9px] font-bold uppercase tracking-wider rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[9px] rounded-full">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
