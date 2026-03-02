import { Moon, Sun, Github, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState<string>('#home');
  const location = useLocation();

  useEffect(() => {
    const updateActive = () => {
      if (window.location.pathname.includes('/certificates')) {
        setActive('/certificates');
      } else if (window.location.pathname.includes('/contact')) {
        setActive('/contact');
      } else if (window.location.pathname.includes('/projects')) {
        setActive('/projects');
      } else {
        setActive(window.location.hash || '#home');
      }
    };

    updateActive();
    window.addEventListener('hashchange', updateActive);
    
    return () => {
      window.removeEventListener('hashchange', updateActive);
    };
  }, []);

  useEffect(() => {
    if (location) {
      if (location.pathname.includes('/certificates')) setActive('/certificates');
      else if (location.pathname.includes('/contact')) setActive('/contact');
      else if (location.pathname.includes('/projects')) setActive('/projects');
      else setActive(location.hash || '#home');
    }
  }, [location]);

  const linkClass = (target: string) =>
    `px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium ${
      active === target
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 relative">
        
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src="/lion.svg"
              alt="Logo Leão"
              className="w-6 h-6 object-contain select-none transition-all dark:invert"
              draggable="false"
            />
            <span className="text-base font-bold tracking-tighter text-slate-900 dark:text-white whitespace-nowrap">
              Francelino&nbsp;Júnior<span className="text-blue-500">.</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-slate-50/50 dark:bg-slate-900/20 p-1 rounded-full border border-slate-100 dark:border-slate-800/50">
          <a href="/#home" className={linkClass('#home')}>Início</a>
          <a href="/#experience" className={linkClass('#experience')}>Experiência</a>
          <Link to="/projects" className={linkClass('/projects')}>Projetos</Link>
          
          <Link to="/certificates" className={linkClass('/certificates')}>Certificados</Link>
          
          <Link to="/contact" className={linkClass('/contact')}>Contato</Link>
        </div>

        {/* Redes Sociais e Tema */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 pr-2 border-r border-slate-200 dark:border-slate-800">
            <a
              href="https://www.linkedin.com/in/francelino-j%C3%BAnior/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Francelinojr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Alternar tema"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
