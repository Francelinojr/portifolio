import Navbar from '@/components/ui/Navbar';
import Projects from '@/components/Projects';
import Footer from '@/components/ui/Footer';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] ambient-bg transition-colors duration-300">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Projects variant="full" />
      </main>
      <Footer />
    </div>
  );
}
