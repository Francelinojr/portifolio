import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Brain, Database, Code2, Layers, Binary, LineChart, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cardVariant, sectionContainer, hoverLift, tapScale } from '@/lib/motion-variants';
import { useGithubRepos } from '@/hooks/useGithubRepos';

// Imagens reais existentes na pasta /projects/
const projectImages: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': '/projects/breast-cancer.jpg',
  'Costura-App': '/projects/Costura.jpg',
  'Geografia-da-Desigualdade': '/projects/desigualdade.jpg',
};

// Dicionário de títulos humanos elegantes
const HUMAN_TITLES: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': 'Classificação de Câncer de Mama (SVM)',
  'Costura-App': 'Costura App — Gestão de Ateliês',
  'Geografia-da-Desigualdade': 'Geografia da Desigualdade em STEM',
  'Aprendizagem-de-maquina': 'Algoritmos de Machine Learning',
  'Estrutura-de-Dados-com-Grafos-e-arvores': 'Estruturas de Dados: Grafos & Árvores',
  'Analise-Estatistica-com-Testes-de-hipoteses': 'Análise Estatística & Testes de Hipótese',
  'Tabela-Hash-com-Encadeamento-e-Tratamento-de-Colisoes': 'Tabela Hash com Encadeamento em C++',
  'Implementacao-de-Grafo-com-BFS-e-DFS': 'Grafos em C++ (Buscas BFS & DFS)',
  'Visao-geral-das-taxas-de-suicidio-no-Brasil': 'Análise Exploratória: Dados Epidemiológicos',
  'Analise-de-Dados_da_Netflix': 'Análise de Dados do Catálogo Netflix',
};

// Dicionário de descrições enriquecidas
const CURATED_DESCRIPTIONS: Record<string, string> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': 'Pipeline preditivo completo em Python utilizando Support Vector Machines (SVM) com 98,6% de acurácia na identificação de malignidade.',
  'Costura-App': 'Aplicativo mobile multiplataforma desenvolvido em Flutter/Dart com arquitetura limpa MVC e gerenciamento de estado local.',
  'Geografia-da-Desigualdade': 'Estudo aprofundado com algoritmos de clustering (K-Means) e visualização geoespacial da representatividade feminina na área tech.',
  'Aprendizagem-de-maquina': 'Implementação e avaliação comparativa de modelos de classificação, regressão e métricas de desempenho supervisionado.',
  'Estrutura-de-Dados-com-Grafos-e-arvores': 'Modelagem e percursos em estruturas hierárquicas e redes utilizando C++ de alta performance.',
  'Analise-Estatistica-com-Testes-de-hipoteses': 'Inferência estatística, testes ANOVA, T-Student e testes não-paramétricos aplicados a conjuntos de dados reais.',
  'Tabela-Hash-com-Encadeamento-e-Tratamento-de-Colisoes': 'Estrutura de dados avançada com funções de dispersão customizadas e gerenciamento dinâmico de memória.',
  'Implementacao-de-Grafo-com-BFS-e-DFS': 'Algoritmos de busca em largura e profundidade com cálculo de caminhos mínimos e componentes conexos.',
  'Visao-geral-das-taxas-de-suicidio-no-Brasil': 'Tratamento de séries temporais, correlações socioeconômicas e dashboards analíticos em Python/Pandas.',
  'Analise-de-Dados_da_Netflix': 'Análise exploratória do catálogo global, tendências de lançamentos, gêneros e distribuição por países.',
};

// Tecnologias principais por projeto
const CURATED_TAGS: Record<string, string[]> = {
  'Breast-Cancer-Wisconsin-Diagnostic-': ['Python', 'Scikit-Learn', 'SVM', 'Pandas'],
  'Costura-App': ['Flutter', 'Dart', 'Mobile', 'MVC'],
  'Geografia-da-Desigualdade': ['Python', 'K-Means', 'Geopandas', 'Data Viz'],
  'Aprendizagem-de-maquina': ['Python', 'Scikit-Learn', 'Machine Learning'],
  'Estrutura-de-Dados-com-Grafos-e-arvores': ['C++', 'Algoritmos', 'Grafos'],
  'Analise-Estatistica-com-Testes-de-hipoteses': ['Python', 'SciPy', 'Estatística'],
  'Tabela-Hash-com-Encadeamento-e-Tratamento-de-Colisoes': ['C++', 'Estrutura de Dados'],
  'Implementacao-de-Grafo-com-BFS-e-DFS': ['C++', 'Grafos', 'BFS/DFS'],
  'Visao-geral-das-taxas-de-suicidio-no-Brasil': ['Python', 'Pandas', 'Seaborn'],
  'Analise-de-Dados_da_Netflix': ['Python', 'EDA', 'Matplotlib'],
};

// Categorias para filtro
type Category = 'Todos' | 'Data Science & ML' | 'Software & Mobile' | 'Algoritmos & C++';

function getCategory(name: string, lang: string | null): Category {
  const text = `${name} ${lang ?? ''}`.toLowerCase();
  if (text.includes('c++') || text.includes('grafo') || text.includes('hash') || text.includes('estrutura')) {
    return 'Algoritmos & C++';
  }
  if (text.includes('flutter') || text.includes('costura') || text.includes('react') || text.includes('dart') || text.includes('app')) {
    return 'Software & Mobile';
  }
  return 'Data Science & ML';
}

function cleanTitle(rawName: string): string {
  if (HUMAN_TITLES[rawName]) return HUMAN_TITLES[rawName];
  return rawName
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

/** Componente de Banner Tecnológico para projetos sem screenshot */
function TechCardBanner({ name, category, language }: { name: string; category: Category; language?: string }) {
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
      badge: 'C++ & Algoritmos',
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
  const { repos: ghRepos, loading } = useGithubRepos('Francelinojr', 100);

  // Lista de repositórios a serem ignorados (configuração de perfil, repositório de portfólio, etc.)
  const IGNORED_REPOS = useMemo(() => ['francelinojr', 'portifolio', 'portfolio'], []);

  const projects = useMemo(() => {
    // Se não carregou ainda do GitHub, usa fallback estático inicial
    if (!ghRepos) {
      return [
        {
          rawName: 'Breast-Cancer-Wisconsin-Diagnostic-',
          title: HUMAN_TITLES['Breast-Cancer-Wisconsin-Diagnostic-'],
          description: CURATED_DESCRIPTIONS['Breast-Cancer-Wisconsin-Diagnostic-'],
          tags: CURATED_TAGS['Breast-Cancer-Wisconsin-Diagnostic-'],
          url: 'https://github.com/Francelinojr/Breast-Cancer-Wisconsin-Diagnostic-',
          image: projectImages['Breast-Cancer-Wisconsin-Diagnostic-'],
          category: 'Data Science & ML' as Category,
          stars: 0,
          language: 'Jupyter Notebook',
        },
        {
          rawName: 'Costura-App',
          title: HUMAN_TITLES['Costura-App'],
          description: CURATED_DESCRIPTIONS['Costura-App'],
          tags: CURATED_TAGS['Costura-App'],
          url: 'https://github.com/Francelinojr/Costura-App',
          image: projectImages['Costura-App'],
          category: 'Software & Mobile' as Category,
          stars: 0,
          language: 'Dart',
        },
        {
          rawName: 'Geografia-da-Desigualdade',
          title: HUMAN_TITLES['Geografia-da-Desigualdade'],
          description: CURATED_DESCRIPTIONS['Geografia-da-Desigualdade'],
          tags: CURATED_TAGS['Geografia-da-Desigualdade'],
          url: 'https://github.com/Francelinojr/Geografia-da-Desigualdade',
          image: projectImages['Geografia-da-Desigualdade'],
          category: 'Data Science & ML' as Category,
          stars: 0,
          language: 'Python',
        },
      ];
    }

    // Processa repositórios do GitHub
    return ghRepos
      .filter((r) => !IGNORED_REPOS.includes(r.name.toLowerCase()))
      .map((r) => {
        const cat = getCategory(r.name, r.language);
        return {
          rawName: r.name,
          title: cleanTitle(r.name),
          description:
            CURATED_DESCRIPTIONS[r.name] ??
            r.description ??
            'Projeto de tecnologia focado em boas práticas de programação e resolução analítica de problemas.',
          tags: CURATED_TAGS[r.name] ?? [r.language ?? 'Python', 'GitHub'],
          url: r.html_url,
          image: projectImages[r.name],
          category: cat,
          stars: r.stargazers_count ?? 0,
          language: r.language ?? 'Python',
        };
      });
  }, [ghRepos, IGNORED_REPOS]);

  // Filtra projetos para exibição
  const displayedProjects = useMemo(() => {
    let list = projects;
    if (variant === 'compact') {
      // No modo compacto, mostra os 3 projetos principais destacados
      const priority = ['Breast-Cancer-Wisconsin-Diagnostic-', 'Costura-App', 'Geografia-da-Desigualdade'];
      const curated = list.filter((p) => priority.includes(p.rawName));
      return curated.length ? curated : list.slice(0, 3);
    }

    if (activeFilter !== 'Todos') {
      list = list.filter((p) => p.category === activeFilter);
    }
    return list;
  }, [projects, variant, activeFilter]);

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
              Ver todos os projetos ({projects.length})
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

        {/* Loading Skeleton */}
        {loading && variant === 'full' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden glass-panel animate-pulse p-4 space-y-4">
                <div className="h-36 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

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
                      // Se a imagem falhar, substitui dinamicamente
                      (e.currentTarget as HTMLElement).style.display = 'none';
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
                <TechCardBanner name={p.rawName} category={p.category} language={p.language} />
              )}

              {/* Corpo do Card */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-1">
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
