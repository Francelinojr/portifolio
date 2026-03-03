import Navbar from '@/components/ui/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/ui/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
