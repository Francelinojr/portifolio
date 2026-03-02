import { ExternalLink, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState, memo } from 'react';

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
      <span className="ml-1 inline-block w-[7px] h-4 align-middle bg-blue-600 dark:bg-blue-400 animate-pulse rounded-sm" />
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
    <section id="home" className="relative h-screen overflow-hidden flex flex-col items-center justify-center py-8 sm:py-12 px-4 bg-white dark:bg-transparent transition-colors duration-300">
      <motion.div
        className="flex-1 -mt-10 sm:-mt-12 flex flex-col items-center justify-center w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative mb-8" variants={imageVariants}>
          <div className="w-32 h-32 rounded-full border-4 border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300">
            <img
              src="https://github.com/Francelinojr.png"
              alt="Francelino Teotonio Júnior"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.span
            className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-950 rounded-full shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        <motion.h1
          className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 text-center leading-tight tracking-tighter whitespace-nowrap"
          variants={itemVariants}
        >
          Francelino Júnior
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-5 text-center w-full max-w-xl mx-auto min-h-[24px]"
          variants={itemVariants}
        >
          <TypingLine phrases={phrases} />
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-8"
          variants={itemVariants}
        >
          <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/40 shadow-sm">
            ✓ Disponível para trabalho
          </span>
          <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/50">
            • João Pessoa, PB
          </span>
          <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-50/50 dark:bg-slate-900/20 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/50">
            • UFPB
          </span>
        </motion.div>

        <motion.p
          className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-10 text-center max-w-xl mx-auto"
          variants={itemVariants}
        >
          Sou estudante de <span className="font-semibold">Ciência de Dados</span> e Inteligência Artificial na UFPB e desenvolvedor apaixonado por transformar dados brutos em soluções inteligentes. Com sólida base em <span className="font-semibold">Python</span> e desenvolvimento <span className="font-semibold">Full-Stack</span>, busco minha primeira oportunidade como <span className="font-semibold">Cientista de Dados</span>, Desenvolvedor Júnior ou Analista de Dados.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3.5 justify-center"
          variants={itemVariants}
        >
          <a
            href="/curriculo.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/20 hover:scale-105 active:scale-95"
            title="Abrir currículo em PDF"
          >
            <ArrowUpRight size={18} />
            Abrir currículo
          </a>
          <a
            href="#projects"
            className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <ExternalLink size={18} />
            Ver Projetos
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 inset-x-0 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest mt-12 text-center">Scroll para explorar</div>
        <ChevronDown size={18} className="mt-3 text-slate-400 dark:text-slate-600" />
      </motion.div>
    </section>
  );
}
