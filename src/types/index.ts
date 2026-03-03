export type Project = {
    title: string;
    description: string;
    tags: string[];
    url: string;
    image: string;
    complexity: 'Simples' | 'Elaborados';
};

export type ExperienceItem = {
    role: string;
    company: string;
    period: string;
    image: string;
    details: string[];
};

export type Certificate = {
    title: string;
    org: string;
    date: string;
    hours: string;
    category: string;
    pdf: string;
};
