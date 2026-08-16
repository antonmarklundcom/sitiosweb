import Logo from './Logo';
import { DOMAIN, EMAIL, PHONE_DISPLAY, PHONE_TEL, waLink } from '../site';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#321C04] text-[#F6E4CF] px-6 pt-16 pb-12 md:pt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="max-w-sm">
            <Logo size={36} fill="#F6E4CF" />
            <p className="mt-5 text-lg font-medium">{DOMAIN}</p>
            <p className="mt-2 text-sm text-[#F6E4CF]/60 leading-relaxed">
              Diseño y desarrollo de sitios web para negocios paraguayos.
              Asunción, Paraguay.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-16">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#F6E4CF]/50">
                Secciones
              </h3>
              <ul className="mt-4 flex flex-col text-sm">
                <li><a href="#servicios" className="inline-flex items-center min-h-[40px] hover:text-white transition-colors">Servicios</a></li>
                <li><a href="#trabajos" className="inline-flex items-center min-h-[40px] hover:text-white transition-colors">Trabajos</a></li>
                <li><a href="#proceso" className="inline-flex items-center min-h-[40px] hover:text-white transition-colors">Cómo trabajamos</a></li>
                <li><a href="#contacto" className="inline-flex items-center min-h-[40px] hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#F6E4CF]/50">
                Contacto
              </h3>
              <ul className="mt-4 flex flex-col text-sm">
                <li>
                  <a
                    href={waLink('footer')}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ev="whatsapp_click"
                    data-ev-loc="footer"
                    className="inline-flex items-center min-h-[40px] hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li><a href={`tel:${PHONE_TEL}`} className="inline-flex items-center min-h-[40px] hover:text-white transition-colors">{PHONE_DISPLAY}</a></li>
                <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center min-h-[40px] hover:text-white transition-colors">{EMAIL}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-[#F6E4CF]/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#F6E4CF]/50">
          <p>© {YEAR} {DOMAIN}. Todos los derechos reservados.</p>
          <p>Hecho en Paraguay 🇵🇾</p>
        </div>
      </div>
    </footer>
  );
}
