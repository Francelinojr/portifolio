import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2, Copy, Check, MessageSquare, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';
import {
  sectionContainer,
  fadeUp,
  slideLeft,
  viewport,
  hoverLift,
  tapScale,
} from '@/lib/motion-variants';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        'service_za9dhfz',
        'template_lc2brf9',
        formRef.current,
        '6YGEOYBIfhJqpR9pj'
      );

      setStatus('success');
      formRef.current.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 bg-transparent transition-colors scroll-mt-24">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          className="text-left mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <MessageSquare size={18} />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Vamos Conversar
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Entre em Contato
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Aberto a oportunidades profissionais em Ciência de Dados, Machine Learning e Desenvolvimento de Software.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Channels (5 cols) */}
          <motion.div
            className="lg:col-span-5 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={sectionContainer}
          >
            {/* WhatsApp / Telefone */}
            <div className="p-5 rounded-2xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">WhatsApp / Celular</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">(81) 97901-8226</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('81979018226', 'phone')}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copiar número"
                >
                  {copiedKey === 'phone' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              <a
                href="https://wa.me/5581979018226"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs shadow-emerald-500/20 cursor-pointer"
              >
                Conversar no WhatsApp
              </a>
            </div>

            {/* E-mail */}
            <div className="p-5 rounded-2xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <Mail size={20} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">E-mail Principal</span>
                    <a href="mailto:juniorteotonio1@hotmail.com" className="text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate block">
                      juniorteotonio1@hotmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy('juniorteotonio1@hotmail.com', 'email')}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Copiar e-mail"
                >
                  {copiedKey === 'email' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 dark:text-slate-500 pl-11">
                Acadêmico: francelino.junior@academico.ufpb.br
              </p>
            </div>

            {/* Redes Sociais Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.linkedin.com/in/francelino-j%C3%BAnior/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 text-left group"
              >
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Linkedin size={18} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Perfil</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">LinkedIn</span>
                </div>
              </a>

              <a
                href="https://github.com/Francelinojr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel card-glow border border-slate-200/80 dark:border-slate-800/80 flex items-center gap-3 text-left group"
              >
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-colors">
                  <Github size={18} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Código</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">GitHub</span>
                </div>
              </a>
            </div>

            {/* Availability Notice */}
            <div className="p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Clock size={15} className="text-blue-500 shrink-0" />
              <span>Costumo responder mensagens em até <strong>24 horas</strong>.</span>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            className="lg:col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={slideLeft}
          >
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200/80 dark:border-slate-800/80 shadow-md">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                Envie uma Mensagem Direta
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Preencha os campos abaixo para entrar em contato diretamente pela caixa de entrada.
              </p>

              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Como posso te chamar?"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    placeholder="Olá Francelino! Gostaria de conversar sobre uma oportunidade..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-500 transition-all text-xs sm:text-sm resize-none"
                  ></textarea>
                </div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl flex items-center gap-2.5 text-emerald-700 dark:text-emerald-300 text-xs font-semibold"
                  >
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    <span>Mensagem enviada com sucesso! Responderei em breve.</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 rounded-xl flex items-center gap-2.5 text-red-700 dark:text-red-300 text-xs font-semibold"
                  >
                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                    <span>Ocorreu um erro ao enviar. Tente novamente ou use o WhatsApp.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
                >
                  {status === 'submitting' ? (
                    <>
                      Enviando... <Loader2 size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar Mensagem <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
