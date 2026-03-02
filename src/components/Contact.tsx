import { useState } from 'react';
import { Github, Linkedin, Mail, Phone, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xgoljygl", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-[#030712] scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título da Seção */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 border-l-4 border-blue-600 pl-4">
            Contato
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg ml-4 max-w-3xl leading-relaxed">
            Quer conversar sobre um projeto ou oportunidade? Me chame por qualquer um dos canais abaixo ou envie uma mensagem diretamente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ml-4">

          {/* Coluna 1: Redes Sociais */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
              Redes Sociais
            </h3>

            <div className="grid gap-4">
              {/* GitHub */}
              <a href="https://github.com/Francelinojr" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all group">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Github size={24} className="text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">GitHub</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold">Francelinojr</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/francelino-júnior/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all group">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Linkedin size={24} className="text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold">francelino-júnior</span>
                </div>
              </a>

              {/* E-mails (Seus dois e-mails integrados) */}
              <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  <Mail size={24} className="text-blue-600" />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">E-mail</span>
                  <a href="mailto:juniorteotonio1@hotmail.com" className="block text-slate-700 dark:text-slate-200 font-bold text-sm truncate hover:text-blue-600 transition-colors">juniorteotonio1@hotmail.com</a>
                  <a href="mailto:francelino.junior@academico.ufpb.br" className="block text-slate-500 dark:text-slate-400 text-xs truncate hover:text-blue-600 transition-colors">francelino.junior@academico.ufpb.br</a>
                </div>
              </div>

              {/* Telefone */}
              <a href="tel:81979018226"
                className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-all group">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm group-hover:bg-blue-600 transition-colors">
                  <Phone size={24} className="text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Telefone / WhatsApp</span>
                  <span className="text-slate-700 dark:text-slate-200 font-bold">(81) 97901-8226</span>
                </div>
              </a>
            </div>
          </div>

          {/* Coluna 2: Formulário de Mensagem */}
          <div className="bg-slate-50/50 dark:bg-slate-900/30 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">
              Enviar mensagem
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Seu nome</label>
                <input type="text" name="name" required placeholder="Como posso te chamar?"
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Seu e-mail</label>
                <input type="email" name="email" required placeholder="nome@email.com"
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-700 dark:text-slate-200" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Mensagem</label>
                <textarea rows={4} name="message" required placeholder="Escreva sua mensagem aqui..."
                  className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-slate-700 dark:text-slate-200 resize-none"></textarea>
              </div>
              {status === "success" && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl flex items-start gap-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">Mensagem enviada com sucesso! Responderei em breve.</p>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl flex items-start gap-3 text-red-600 dark:text-red-400">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.</p>
                </div>
              )}

              <button type="submit" disabled={status === "submitting"}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-all active:scale-95">
                {status === "submitting" ? (
                  <>Enviando... <Loader2 size={16} className="animate-spin" /></>
                ) : (
                  <>Enviar mensagem <Send size={16} /></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}