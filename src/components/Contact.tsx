import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import {
  sectionContainer,
  fadeUp,
  slideLeft,
  staggerItem,
  viewport,
  hoverLift,
  tapScale,
} from '@/lib/motion-variants';

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        'service_za9dhfz',
        'template_lc2brf9',
        formRef.current,
        '6YGEOYBIfhJqpR9pj'
      );

      setStatus("success");
      formRef.current.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const socialLinks = [
    {
      href: "https://github.com/Francelinojr",
      label: "GitHub",
      handle: "Francelinojr",
      icon: <Github size={22} className="text-blue-600 group-hover:text-white" />,
    },
    {
      href: "https://www.linkedin.com/in/francelino-j%C3%BAnior/",
      label: "LinkedIn",
      handle: "francelino-júnior",
      icon: <Linkedin size={22} className="text-blue-600 group-hover:text-white" />,
    },
    {
      href: "https://wa.me/5581979018226",
      label: "WhatsApp / Celular",
      handle: "(81) 97901-8226",
      icon: <Phone size={22} className="text-blue-600 group-hover:text-white" />,
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#030712] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">

        {/* Section heading */}
        <motion.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-blue-600 pl-4">
            Contato
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg ml-4 max-w-3xl leading-relaxed">
            Quer conversar sobre um projeto ou oportunidade? Me chame por qualquer um dos canais abaixo ou envie uma mensagem diretamente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ml-4">

          {/* Social links — stagger */}
          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={sectionContainer}
          >
            <motion.h3
              variants={staggerItem}
              className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6"
            >
              Canais Diretos
            </motion.h3>

            <div className="grid gap-4">
              {socialLinks.map(({ href, label, handle, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={slideLeft}
                  whileHover={hoverLift}
                  whileTap={tapScale}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/60 transition-colors group shadow-sm"
                >
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:bg-blue-600 transition-colors">
                    {icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
                    <span className="text-slate-700 dark:text-slate-200 font-bold">{handle}</span>
                  </div>
                </motion.a>
              ))}

              {/* E-mail block */}
              <motion.div
                variants={slideLeft}
                className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 shadow-sm"
              >
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  <Mail size={22} className="text-blue-600" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</span>
                  <a href="mailto:juniorteotonio1@hotmail.com" className="block text-slate-700 dark:text-slate-200 font-bold text-sm truncate hover:text-blue-600 transition-colors">juniorteotonio1@hotmail.com</a>
                  <a href="mailto:francelino.junior@academico.ufpb.br" className="block text-slate-500 dark:text-slate-400 text-xs truncate hover:text-blue-600 transition-colors">francelino.junior@academico.ufpb.br</a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 p-8 shadow-sm"
          >
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
                Enviar Mensagem
              </h3>
              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Seu nome</label>
                  <input type="text" name="name" required placeholder="Como posso te chamar?"
                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/15 transition-all outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Seu e-mail</label>
                  <input type="email" name="email" required placeholder="nome@email.com"
                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/15 transition-all outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Mensagem</label>
                  <textarea rows={4} name="message" required placeholder="Escreva sua mensagem aqui..."
                    className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-slate-700/50 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/15 transition-all outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none text-sm"></textarea>
                </div>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-start gap-3 text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">Mensagem enviada com sucesso! Responderei em breve.</p>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-3 text-red-600 dark:text-red-400"
                  >
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">Ocorreu um erro ao enviar a mensagem. Tente novamente ou use os canais diretos.</p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={status !== "submitting" ? hoverLift : undefined}
                  whileTap={status !== "submitting" ? tapScale : undefined}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-blue-500/20 dark:shadow-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {status === "submitting" ? (
                    <>Enviando... <Loader2 size={16} className="animate-spin" /></>
                  ) : (
                    <>Enviar mensagem <Send size={16} /></>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
