import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    if (!window.location.hash) {
      history.replaceState(null, '', '/#home');
    }
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300">
      <Navbar />
      <Hero />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <TechStack />
        <Experience />
        <Projects variant="compact" />
      </main>

      <Footer />
    </div>
  );
}
