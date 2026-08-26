import { Moon, Sun, Github, Linkedin, Menu, X } from 'lucide-react';
import { useEffect, useState, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = memo(function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Close mobile menu on route/location change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  let active = '#home';
  if (location.pathname.includes('/certificates')) active = '/certificates';
  else if (location.pathname.includes('/contact')) active = '/contact';
  else if (location.pathname.includes('/projects')) active = '/projects';
  else if (location.hash || currentHash) active = location.hash || currentHash;

  const linkClass = (target: string) =>
    `px-4 py-1.5 rounded-full transition-all duration-300 text-sm font-medium ${
      active === target
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`;

  const mobileLinkClass = (target: string) =>
    `flex items-center px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
      active === target
        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#030712]/70 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 relative">

          {/* Logo */}
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

          {/* Desktop Nav — centrado */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 bg-slate-50/50 dark:bg-slate-900/20 p-1 rounded-full border border-slate-100 dark:border-slate-800/50">
            <a href="/#home" className={linkClass('#home')} aria-current={active === '#home' ? 'page' : undefined}>Início</a>
            <a href="/#experience" className={linkClass('#experience')} aria-current={active === '#experience' ? 'page' : undefined}>Experiência</a>
            <Link to="/projects" className={linkClass('/projects')} aria-current={active === '/projects' ? 'page' : undefined}>Projetos</Link>
            <Link to="/certificates" className={linkClass('/certificates')} aria-current={active === '/certificates' ? 'page' : undefined}>Certificados</Link>
            <Link to="/contact" className={linkClass('/contact')} aria-current={active === '/contact' ? 'page' : undefined}>Contato</Link>
          </div>

          {/* Redes Sociais, Tema e Hambúrguer */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 pr-2 border-r border-slate-200 dark:border-slate-800">
              <a
                href="https://www.linkedin.com/in/francelino-j%C3%BAnior/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="LinkedIn"
                aria-label="Perfil do LinkedIn de Francelino Júnior"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/Francelinojr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="GitHub"
                aria-label="Perfil do GitHub de Francelino Júnior"
              >
                <Github size={18} />
              </a>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={theme === 'light' ? 'Mudar para modo escuro' : 'Mudar para modo claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Hambúrguer — apenas mobile */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 dark:bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed top-14 left-0 right-0 z-50 md:hidden bg-white dark:bg-[#030712] border-b border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <div className="p-3 space-y-1">
                <a href="/#home" className={mobileLinkClass('#home')} onClick={() => setMobileOpen(false)}>Início</a>
                <a href="/#experience" className={mobileLinkClass('#experience')} onClick={() => setMobileOpen(false)}>Experiência</a>
                <Link to="/projects" className={mobileLinkClass('/projects')}>Projetos</Link>
                <Link to="/certificates" className={mobileLinkClass('/certificates')}>Certificados</Link>
                <Link to="/contact" className={mobileLinkClass('/contact')}>Contato</Link>
              </div>

              <div className="px-4 pb-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/francelino-j%C3%BAnior/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="https://github.com/Francelinojr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors"
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

export default Navbar;
