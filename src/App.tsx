import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import CertificatesPage from '@/pages'; // Certifique-se de criar este arquivo em src/pages/
import { ThemeProvider } from '@/contexts/ThemeContext';
import ContactPage from '@/pages/ContactPage';
import ProjectsPage from '@/pages/ProjectsPage';

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router>
        <Routes>
          {/* Rota principal que contém Experiência, Projetos e Contato */}
          <Route path="/" element={<Home />} />
          
          {/* Rota exclusiva para a galeria de certificados com filtros */}
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
