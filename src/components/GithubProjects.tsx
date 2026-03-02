import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitBranch } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export default function GithubProjects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/Francelinojr/repos?per_page=12&sort=updated')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(
            data
              .filter((r) => !r.fork)
              .sort((a, b) => b.stargazers_count - a.stargazers_count)
              .slice(0, 8)
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="notebooks" className="py-20 px-4 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
            Modelos & Notebooks
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Repositórios recentes do meu GitHub
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-slate-500 dark:text-slate-400">Carregando...</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {repo.name}
                  </h3>
                  <ExternalLink size={18} className="text-slate-400 group-hover:text-blue-500" />
                </div>
                {repo.description && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {repo.description}
                  </p>
                )}
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center gap-1">
                    <Star size={16} /> {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch size={16} /> {repo.forks_count}
                  </span>
                  <span className="ml-auto">
                    Atualizado {new Date(repo.updated_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
