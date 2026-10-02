import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Brain, Code2, Layers, Binary, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardVariant, sectionContainer, hoverLift, tapScale } from '@/lib/motion-variants';

// Categorias para filtro
type Category = 'Todos' | 'Data Science & ML' | 'Software & Mobile' | 'Algoritmos & C++';

// ============================================================
// DADOS ESTÁTICOS DOS PROJETOS — edite aqui para adicionar/remover
// ============================================================
const ALL_PROJECTS: Project[] = [
  {
    rawName: 'ProjetoPLN-profissional',
    title: 'Detecção de Discurso de Ódio (NLP)',
    description: 'Detecção de discurso de ódio em português brasileiro usando embeddings multilíngues (BERTimbau), Sentence Transformers e classificação com Scikit-Learn.',
    tags: ['Python', 'NLP', 'BERTimbau', 'HuggingFace'],
    url: 'https://github.com/Francelinojr/ProjetoPLN-profissional',
    image: '/projects/nlp-odio.jpg',
    category: 'Data Science & ML',
    stars: 0,
    language: 'Jupyter Notebook',
  },
  {
    rawName: 'Breast-Cancer-Wisconsin-Diagnostic-',
    title: 'Classificação de Câncer de Mama (SVM)',
    description: 'Pipeline preditivo completo em Python utilizando Support Vector Machines (SVM) com 98,6% de acurácia na identificação de malignidade.',
    tags: ['Python', 'Scikit-Learn', 'SVM', 'Pandas'],
    url: 'https://github.com/Francelinojr/Breast-Cancer-Wisconsin-Diagnostic-',
    image: '/projects/breast-cancer.jpg',
    category: 'Data Science & ML',
    stars: 1,
    language: 'Jupyter Notebook',
  },
  {
    rawName: 'Analise-Epidemiologica-Entregadores-Aplicativo',
    title: 'Análise Epidemiológica de Entregadores',
    description: 'Análise epidemiológica de acidentes graves com entregadores de aplicativo no Brasil (2020-2025) com dados SINAN/DATASUS. Artigo publicado na SBC.',
    tags: ['Python', 'Pandas', 'DATASUS', 'Matplotlib'],
    url: 'https://github.com/Francelinojr/Analise-Epidemiologica-Entregadores-Aplicativo',
    image: '/projects/epidemiologia.jpg',
    category: 'Data Science & ML',
    stars: 0,
    language: 'Jupyter Notebook',
  },
  {
    rawName: 'costura-app',
    title: 'Costura App — Gestão de Ateliês',
    description: 'Aplicativo mobile multiplataforma desenvolvido em Flutter/Dart com arquitetura limpa MVC e gerenciamento de estado local.',
    tags: ['Flutter', 'Dart', 'Mobile', 'MVC'],
    url: 'https://github.com/Francelinojr/costura-app',
    image: '/projects/Costura.jpg',
    category: 'Software & Mobile',
    stars: 1,
    language: 'Dart',
  },
  {
    rawName: 'Geografia_da_Desigualdade',
    title: 'Geografia da Desigualdade em STEM',
    description: 'Estudo aprofundado com algoritmos de clustering (K-Means) e visualização geoespacial da representatividade feminina em cursos STEM no Brasil.',
    tags: ['Python', 'K-Means', 'Geopandas', 'Data Viz'],
    url: 'https://github.com/Francelinojr/Geografia_da_Desigualdade',
    image: '/projects/desigualdade.jpg',
    category: 'Data Science & ML',
    stars: 0,
    language: 'Python',
  },
  {
    rawName: 'Analise-de-Dados_da_Netflix',
    title: 'Análise de Dados do Catálogo Netflix',
    description: 'Análise exploratória do catálogo global, tendências de lançamentos, gêneros e distribuição por países com clustering K-Means.',
    tags: ['Python', 'EDA', 'Matplotlib', 'K-Means'],
    url: 'https://github.com/Francelinojr/Analise-de-Dados_da_Netflix',
    image: '/projects/netflix.jpg',
    category: 'Data Science & ML',
    stars: 0,
    language: 'Jupyter Notebook',
  },
  {
    rawName: 'Visao-geral-das-taxas-de-suicidio-1985-a-2016',
    title: 'Análise Exploratória: Taxas de Suicídio',
    description: 'Tratamento de séries temporais, correlações socioeconômicas e dashboards analíticos de taxas de suicídio por país, sexo e geração (1985–2016).',
    tags: ['Python', 'Pandas', 'Seaborn', 'Saúde Pública'],
    url: 'https://github.com/Francelinojr/Visao-geral-das-taxas-de-suicidio-1985-a-2016',
    image: '/projects/suicidio-data.jpg',
    category: 'Data Science & ML',
    stars: 0,
    language: 'Jupyter Notebook',
  },
  {
    rawName: 'Ames-Housing-Predictor',
    title: 'Previsão de Preços de Imóveis (Ames)',
    description: 'Modelo de regressão para previsão de preços de imóveis usando o dataset Ames Housing com engenharia de features e validação cruzada.',
    tags: ['Python', 'Regressão', 'Scikit-Learn', 'Feature Eng.'],
    url: 'https://github.com/Francelinojr/Ames-Housing-Predictor',
    image: '/projects/ames-housing.jpg',
    category: 'Data Science & ML',
    stars: 0,
    language: 'Python',
  },
  {
    rawName: 'K-means-em-C-C-Progamacao-Estruturada',
    title: 'K-Means em C com CSV & Gnuplot',
    description: 'Implementação do algoritmo K-Means do zero em linguagem C com leitura de CSV e visualização de clusters via Gnuplot.',
    tags: ['C', 'Algoritmos', 'K-Means', 'Gnuplot'],
    url: 'https://github.com/Francelinojr/K-means-em-C-C-Progamacao-Estruturada',
    image: '/projects/kmeans-c.jpg',
    category: 'Algoritmos & C++',
    stars: 0,
    language: 'C',
  },
  {
    rawName: 'Aprendizagem-de-maquina',
    title: 'Algoritmos de Machine Learning',
    description: 'Implementação e avaliação comparativa de modelos de classificação, regressão e métricas de desempenho supervisionado.',
    tags: ['Python', 'Scikit-Learn', 'Machine Learning'],
    url: 'https://github.com/Francelinojr/Aprendizagem-de-maquina',
    image: undefined,
    category: 'Data Science & ML',
    stars: 0,
    language: 'Jupyter Notebook',
  },
  {
    rawName: 'Meu-Corre.app',
    title: 'Meu Corre — App para Entregadores',
    description: 'Aplicativo Python para gestão e apoio a entregadores de aplicativo, com cálculo de rotas e controle de entregas.',
    tags: ['Python', 'App', 'Entregadores'],
    url: 'https://github.com/Francelinojr/Meu-Corre.app',
    image: undefined,
    category: 'Software & Mobile',
    stars: 0,
    language: 'Python',
  },
  {
    rawName: 'Atividade-cap-2-3-e-4-programa-em-c',
    title: 'Exercícios de Programação em C',
    description: 'Exercícios de programação em C sobre lógica, condicionais, loops, vetores, matrizes e fundamentos de algoritmos.',
    tags: ['C', 'Algoritmos', 'Programação'],
    url: 'https://github.com/Francelinojr/Atividade-cap-2-3-e-4-programa-em-c',
    image: undefined,
    category: 'Algoritmos & C++',
    stars: 0,
    language: 'C',
  },
];

interface Project {
  rawName: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  image: string | undefined;
  category: Category;
  stars: number;
  language: string;
}

/** Componente de Banner Tecnológico para projetos sem screenshot */
function TechCardBanner({ category, language }: { category: Category; language?: string }) {
  const theme = useMemo(() => {
    if (category === 'Data Science & ML') {
      return {
        gradient: 'from-blue-600/20 via-indigo-600/15 to-purple-600/20 dark:from-blue-900/40 dark:via-indigo-900/30 dark:to-purple-900/40',
        icon: <Brain size={32} className="text-blue-500" />,
        badge: 'Data Science & AI',
        color: 'text-blue-500 dark:text-blue-400',
      };
    }
    if (category === 'Software & Mobile') {
      return {
        gradient: 'from-cyan-600/20 via-blue-600/15 to-teal-600/20 dark:from-cyan-900/40 dark:via-blue-900/30 dark:to-teal-900/40',
        icon: <Layers size={32} className="text-cyan-500" />,
        badge: 'App & Full-Stack',
        color: 'text-cyan-500 dark:text-cyan-400',
      };
    }
    return {
      gradient: 'from-indigo-600/20 via-slate-600/15 to-blue-600/20 dark:from-indigo-900/40 dark:via-slate-800/40 dark:to-blue-900/40',
      icon: <Binary size={32} className="text-indigo-500" />,
      badge: 'C & Algoritmos',
      color: 'text-indigo-500 dark:text-indigo-400',
    };
  }, [category]);

  return (
    <div className={`h-40 w-full relative overflow-hidden bg-gradient-to-br ${theme.gradient} flex flex-col justify-between p-4 border-b border-slate-100 dark:border-slate-800/80`}>
      {/* Top terminal bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-white/40 dark:bg-slate-900/50 px-2 py-0.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
          <Terminal size={10} /> {language ?? 'Python'}
        </span>
      </div>

      {/* Center Icon & Badge */}
      <div className="flex items-center justify-between">
        <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 shadow-md backdrop-blur-sm border border-white/50 dark:border-slate-800">
          {theme.icon}
        </div>
        <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.color}`}>
          {theme.badge}
        </span>
      </div>
    </div>
  );
}

export default function Projects({ variant = 'compact' }: { variant?: 'compact' | 'full' }) {
  const [activeFilter, setActiveFilter] = useState<Category>('Todos');

  // Projetos exibidos com base no filtro e variante
  const displayedProjects = useMemo(() => {
    if (variant === 'compact') {
      // Home page: mostra os 3 projetos mais impactantes
      const priority = ['ProjetoPLN-profissional', 'Breast-Cancer-Wisconsin-Diagnostic-', 'costura-app'];
      const curated = ALL_PROJECTS.filter((p) => priority.includes(p.rawName));
      return curated.length >= 3 ? curated : ALL_PROJECTS.slice(0, 3);
    }

    // Página /projects: aplica filtro de categoria
    if (activeFilter === 'Todos') return ALL_PROJECTS;
    return ALL_PROJECTS.filter((p) => p.category === activeFilter);
  }, [variant, activeFilter]);

  const categories: Category[] = ['Todos', 'Data Science & ML', 'Software & Mobile', 'Algoritmos & C++'];

  return (
    <section id="projects" className={`py-16 px-4 bg-transparent transition-colors ${variant === 'compact' ? 'scroll-mt-24' : ''}`}>
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Code2 size={18} />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Portfólio de Código
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {variant === 'compact' ? 'Projetos em Destaque' : 'Todos os Projetos'}
            </h2>
          </div>

          {variant === 'compact' ? (
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
            >
              Ver todos os projetos ({ALL_PROJECTS.length})
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          ) : (
            /* Filtros de Categoria na página cheia */
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeFilter === cat
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid de Projetos */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={sectionContainer}
        >
          {displayedProjects.map((p) => (
            <motion.div
              key={p.rawName}
              variants={cardVariant}
              whileHover={hoverLift}
              whileTap={tapScale}
              className="group flex flex-col rounded-2xl overflow-hidden glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80"
            >
              {/* Header: Imagem Real OU Banner Tecnológico Moderno */}
              {p.image ? (
                <div className="h-40 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Se a imagem falhar, esconde e deixa o banner aparecer
                      (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={12} className="text-blue-400" /> Ver no GitHub
                    </span>
                    <div className="p-2 bg-white/90 dark:bg-slate-900/90 rounded-full text-slate-900 dark:text-white shadow">
                      <Github size={16} />
                    </div>
                  </div>
                </div>
              ) : (
                <TechCardBanner category={p.category} language={p.language} />
              )}

              {/* Corpo do Card */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                    {p.title}
                  </h3>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-5 line-clamp-3 flex-grow">
                  {p.description}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-4 mt-auto">
                  {p.tags.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Footer do Card */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <Github size={14} />
                    Código Fonte
                    <ExternalLink size={12} />
                  </a>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                    {p.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
