import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const Footer = memo(function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-[#030712] pt-12 pb-6 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Coluna 1: Nome e Resumo */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Francelino&nbsp;Júnior<span className="text-blue-600">.</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs">
              Estudante de Ciência de Dados e IA na UFPB, focado em transformar dados complexos em soluções inteligentes e escaláveis.
            </p>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Navegação</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-xs font-medium transition-colors">Início</Link>
              </li>
              <li>
                <a href="/#experience" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-xs font-medium transition-colors">Experiência</a>
              </li>
              <li>
                <a href="/#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-xs font-medium transition-colors">Projetos</a>
              </li>
              <li>
                <Link to="/certificates" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-xs font-medium transition-colors">Certificados</Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-xs font-medium transition-colors">Contato</Link>
              </li>
              <li>
                <a href="/curriculo.pdf" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 text-xs font-medium transition-colors">Currículo</a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato Direto */}
          <div>
            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://github.com/Francelinojr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                  <Github size={14} />
                  <span className="text-xs font-medium">GitHub</span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/francelino-júnior/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                  <Linkedin size={14} />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="mailto:juniorteotonio1@hotmail.com" className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                  <Mail size={14} />
                  <span className="text-xs font-medium">E-mail</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[9px] font-medium tracking-wide">
            © {year} FRANCELINO JÚNIOR. TODOS OS DIREITOS RESERVADOS.
          </p>

          <div className="flex items-center gap-4">
            <p className="text-slate-400 text-[9px] font-medium tracking-wide">
              FEITO COM REACT + TAILWIND CSS
            </p>
            <button
              onClick={scrollToTop}
              className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
