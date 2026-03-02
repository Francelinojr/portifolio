import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Projects variant="full" />
      </main>
      <Footer />
    </div>
  );
}
