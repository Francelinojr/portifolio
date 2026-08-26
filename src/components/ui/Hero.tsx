import { ExternalLink, ArrowUpRight, ChevronDown, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, memo } from 'react';
import { Link } from 'react-router-dom';

const TypingLine = memo(function TypingLine({ phrases }: { phrases: string[] }) {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const charIndexRef = useRef(0);
  const typingIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const typeSpeed = 50;
    const holdTime = 1400;
    const eraseSpeed = 30;

    const startTyping = () => {
      typingIntervalRef.current = window.setInterval(() => {
        charIndexRef.current += 1;
        setDisplayText(current.slice(0, charIndexRef.current));
        if (charIndexRef.current >= current.length) {
          if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
          setTimeout(() => setTyping(false), holdTime);
        }
      }, typeSpeed);
    };

    const startErasing = () => {
      typingIntervalRef.current = window.setInterval(() => {
        charIndexRef.current -= 1;
        setDisplayText(current.slice(0, Math.max(0, charIndexRef.current)));
        if (charIndexRef.current <= 0) {
          if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setTyping(true);
        }
      }, eraseSpeed);
    };

    if (typing) {
      charIndexRef.current = 0;
      startTyping();
    } else {
      startErasing();
    }

    return () => {
      if (typingIntervalRef.current) window.clearInterval(typingIntervalRef.current);
    };
  }, [typing, phraseIndex, phrases]);

  return (
    <>
      <span className="align-middle">{displayText}</span>
      <span className="ml-1 inline-block w-[0.45rem] h-4 align-middle bg-blue-600 dark:bg-blue-400 animate-pulse rounded-sm" />
    </>
  );
});

export default function Hero() {
  const phrases = useMemo(
    () => [
      'Desenvolvedor Júnior • Cientista de Dados • Analista de Dados',
      'Estudante de Ciência de Dados e IA',
    ],
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="home" className="relative min-h-[90vh] md:h-[100dvh] overflow-hidden flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-transparent transition-colors duration-300">
      {/* Subtle background glow in dark mode */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative mb-6" variants={imageVariants}>
          <div className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300">
            <picture>
              <source srcSet="/assets/profile.avif" type="image/avif" />
              <source srcSet="/assets/profile.webp" type="image/webp" />
              <img
                src="/assets/profile.png"
                alt="Francelino Teotônio Júnior"
                width={128}
                height={128}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
          <motion.span
            className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-950 rounded-full shadow-lg"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            title="Disponível"
          />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center leading-tight tracking-tighter whitespace-nowrap"
          variants={itemVariants}
        >
          Francelino Júnior
        </motion.h1>

        <motion.div
          className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-5 text-center w-full max-w-xl mx-auto min-h-[1.5rem]"
          variants={itemVariants}
        >
          <TypingLine phrases={phrases} />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-8"
          variants={itemVariants}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Disponível para trabalho
          </span>
          <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/50">
            • João Pessoa, PB
          </span>
          <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/50">
            • UFPB
          </span>
        </motion.div>

        <motion.p
          className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-center max-w-xl mx-auto"
          variants={itemVariants}
        >
          Sou estudante de <span className="font-semibold text-slate-900 dark:text-white">Ciência de Dados e Inteligência Artificial</span> na UFPB e desenvolvedor apaixonado por transformar dados brutos em soluções inteligentes. Com sólida base em <span className="font-semibold text-slate-900 dark:text-white">Python</span> e desenvolvimento <span className="font-semibold text-slate-900 dark:text-white">Full-Stack</span>, busco oportunidades como <span className="font-semibold text-slate-900 dark:text-white">Cientista de Dados</span>, Desenvolvedor Júnior ou Analista de Dados.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 justify-center items-center"
          variants={itemVariants}
        >
          <a
            href="/curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
            title="Abrir currículo em PDF"
          >
            <ArrowUpRight size={18} />
            Abrir currículo
          </a>
          <Link
            to="/projects"
            className="flex items-center justify-center gap-2 min-h-[44px] bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:scale-105 active:scale-95 border border-slate-200/50 dark:border-slate-700/50"
          >
            <ExternalLink size={18} />
            Ver Projetos
          </Link>
          <a
            href="https://www.linkedin.com/in/francelino-j%C3%BAnior/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 min-h-[44px] bg-transparent text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-900/50 border border-slate-200 dark:border-slate-800"
            title="Conectar no LinkedIn"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 inset-x-0 hidden md:flex flex-col items-center pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest text-center">
          Role para explorar
        </div>
        <ChevronDown size={18} className="mt-2 text-slate-400 dark:text-slate-500" />
      </motion.div>
    </section>
  );
}
