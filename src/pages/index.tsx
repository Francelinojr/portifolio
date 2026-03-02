import Navbar from '@/components/Navbar';
import Certificates from '@/components/Certificates';
import Footer from '@/components/Footer';

export default function CertificatesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] transition-colors duration-300">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Certificates />
      </main>
      <Footer />
    </div>
  );
}
