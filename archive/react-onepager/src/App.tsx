import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TrustRibbon from './components/TrustRibbon';
import ServicesSection from './components/ServicesSection';
import PortfolioSection from './components/PortfolioSection';
import ProcessSection from './components/ProcessSection';
import CtaBand from './components/CtaBand';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import StickyContact from './components/StickyContact';
import ConsentBanner from './components/ConsentBanner';

/**
 * Ritmo de sección → patrón (web-design-system):
 *   1 Hero        → full-bleed video
 *   2 About       → P9 statement, solapa el hero 25px
 *   3 Confianza   → P8 banda full-bleed
 *   4 Servicios   → P1 split 5/7 + slider
 *   5 Trabajos    → P7 sticky-side scroll, fondo fijo
 *   6 Proceso     → P5 riel numerado
 *   7 Banda CTA   → P6 imagen full-bleed + panel que cruza el borde
 *   8 Contacto    → P1 espejado 5/7
 *   9 Footer
 * Ningún patrón se repite en secciones consecutivas.
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <AboutSection />
        <TrustRibbon />
        <ServicesSection />
        <PortfolioSection />
        <ProcessSection />
        <CtaBand />
        <ContactSection />
      </main>
      <Footer />
      <StickyContact />
      <ConsentBanner />
    </>
  );
}
