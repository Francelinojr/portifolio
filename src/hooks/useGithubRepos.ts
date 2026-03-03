import { useEffect, useState } from 'react';

export interface GithubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    fork: boolean;
}

export function useGithubRepos(username = 'Francelinojr', limit = 100) {
    const [repos, setRepos] = useState<GithubRepo[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        fetch(`https://api.github.com/users/${username}/repos?per_page=${limit}&sort=updated`, {
            signal: controller.signal,
        })
            .then((r) => {
                if (!r.ok) throw new Error(`GitHub API ${r.status}`);
                return r.json() as Promise<GithubRepo[]>;
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    // Filtrar os forks logo na raiz dos dados isolados
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setRepos(data.filter((d) => !d.fork));
                }
            })
            .catch((err: unknown) => {
                if (err instanceof Error && err.name === 'AbortError') return;
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setError(err instanceof Error ? err : new Error(String(err)));
            })
            .finally(() => {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setLoading(false);
            });

        return () => controller.abort();
    }, [username, limit]);

    return { repos, loading, error };
}
