import { ArrowUpRight, ChevronDown, Linkedin, MapPin, GraduationCap, Sparkles, FolderGit2, Award, Terminal } from 'lucide-react';
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
    const typeSpeed = 45;
    const holdTime = 1600;
    const eraseSpeed = 25;

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
      <span className="ml-1 inline-block w-[0.4rem] h-5 align-middle bg-blue-600 dark:bg-blue-400 animate-pulse rounded-full" />
    </>
  );
});

export default function Hero() {
  const phrases = useMemo(
    () => [
      'Cientista de Dados • Machine Learning • Full-Stack',
      'Estudante de Ciência de Dados & IA na UFPB',
      'Python • TypeScript • SQL • Modelagem Preditiva',
    ],
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-[95vh] flex flex-col items-center justify-center pt-16 pb-12 px-4 ambient-bg transition-colors duration-300 overflow-hidden">
      
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[20rem] h-[20rem] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[20rem] h-[20rem] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <motion.div
        className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Avatar with glowing ring */}
        <motion.div className="relative mb-6" variants={imageVariants}>
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 shadow-xl shadow-blue-500/20">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-white dark:bg-slate-900 border-2 border-white dark:border-slate-900">
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
          </div>

          {/* Pulsing online badge */}
          <div className="absolute bottom-1 right-1 flex items-center justify-center p-1 bg-white dark:bg-slate-900 rounded-full shadow-md">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight"
          variants={itemVariants}
        >
          Francelino Júnior<span className="text-blue-600 dark:text-blue-400">.</span>
        </motion.h1>

        {/* Typing Line */}
        <motion.div
          className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-5 min-h-[1.75rem]"
          variants={itemVariants}
        >
          <TypingLine phrases={phrases} />
        </motion.div>

        {/* Badges bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2.5 mb-6"
          variants={itemVariants}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            <Sparkles size={13} className="text-emerald-500 animate-pulse" />
            Disponível para novas oportunidades
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
            <MapPin size={13} className="text-blue-500" />
            João Pessoa, PB
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
            <GraduationCap size={14} className="text-indigo-500" />
            UFPB
          </span>
        </motion.div>

        {/* Bio Paragraph */}
        <motion.p
          className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          Estudante de <span className="font-semibold text-slate-900 dark:text-white">Ciência de Dados & Inteligência Artificial</span> na UFPB e desenvolvedor focado em unir modelos preditivos de machine learning com arquiteturas web escaláveis.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap gap-3.5 justify-center items-center mb-12"
          variants={itemVariants}
        >
          <a
            href="/curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
            title="Abrir currículo em PDF"
          >
            <ArrowUpRight size={18} />
            Abrir currículo
          </a>
          <Link
            to="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800/90 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white rounded-xl text-sm font-semibold transition-all border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <FolderGit2 size={18} className="text-blue-500" />
            Ver Projetos
          </Link>
          <a
            href="https://www.linkedin.com/in/francelino-j%C3%BAnior/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl text-sm font-semibold transition-all border border-slate-200 dark:border-slate-800 hover:-translate-y-0.5 active:translate-y-0"
            title="Conectar no LinkedIn"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
        </motion.div>

        {/* Quick Stats Highlights Banner */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel text-left">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <GraduationCap size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Graduação</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Ciência de Dados & IA</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">UFPB • Em andamento</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel text-left">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              <Award size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Certificações</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">22+ Concluídas</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">IFRS, IBM, PROEX, Bradesco</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl glass-panel text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
              <Terminal size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Especialidades</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">ML & Full-Stack</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Python, React, TypeScript, SQL</p>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="mt-12 hidden md:flex flex-col items-center pointer-events-none text-slate-400 dark:text-slate-500 text-xs font-medium"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[11px] uppercase tracking-widest font-semibold">Explorar portfólio</span>
        <ChevronDown size={16} className="mt-1" />
      </motion.div>
    </section>
  );
}
