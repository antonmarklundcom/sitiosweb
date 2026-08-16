import { MessageCircle, Plus } from 'lucide-react';
import Logo from './Logo';
import { waLink } from '../site';

export default function AboutSection() {
  return (
    <section className="relative z-10 bg-[#F6E4CF] rounded-t-[25px] py-20 md:py-32 px-6">
      {/* ── Bloque superior ── */}
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <p className="text-[#321C04] text-base md:text-lg text-center leading-relaxed max-w-lg">
          Hacemos sitios que trabajan al ritmo de tu negocio, no en contra.
          Pensados para que se entiendan rápido, carguen rápido y te hagan
          escribir.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={waLink('about')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="about"
            className="group flex items-center gap-3 bg-[#321C04] text-[#FFF9F2] rounded-full pl-1.5 pr-6 py-1.5 hover:bg-[#1F1003] transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-[#FFF9F2] flex items-center justify-center shrink-0">
              <MessageCircle size={16} className="text-[#321C04]" />
            </span>
            <span className="text-xs uppercase tracking-wide font-medium">
              Escribinos
            </span>
          </a>

          <a
            href="#trabajos"
            data-ev="nav_click"
            data-ev-loc="about_portfolio"
            className="group flex items-center gap-3 bg-[#D9C4AA] text-[#321C04] rounded-full pl-1.5 pr-6 py-1.5 hover:bg-[#CEBA9E] transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-[#FFF9F2] flex items-center justify-center shrink-0">
              <Plus size={16} className="text-[#321C04]" />
            </span>
            <span className="text-xs uppercase tracking-wide font-medium">
              Ver trabajos
            </span>
          </a>
        </div>
      </div>

      {/* ── Separador decorativo ── */}
      <div className="mt-16 md:mt-24 flex items-center w-full">
        <span className="w-2 h-2 rounded-full bg-[#D9C4AA] shrink-0" />
        <span className="w-[2px]" />
        <span className="flex-1 h-[2px] bg-[#D9C4AA]" />
        <span className="w-[2px]" />
        <span className="w-2 h-2 rounded-full bg-[#D9C4AA] shrink-0" />
      </div>

      {/* ── Bloque inferior · statement ── */}
      <div className="mt-16 md:mt-24 max-w-6xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
        <div className="shrink-0 flex md:flex-col items-center md:items-start gap-4 md:gap-5">
          <Logo size={40} fill="#321C04" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#321C04] leading-relaxed">
            Diseño
            <br />
            Paraguayo
          </span>
        </div>

        <p className="text-[#321C04] font-normal text-2xl/[1.35] sm:text-3xl/[1.32] md:text-4xl/[1.3] lg:text-[42px]/[1.3]">
          Hacemos sitios web y herramientas digitales. Pero, sobre todo, hacemos
          que tu negocio se vea en línea tan serio como ya es en persona. Diseño
          propio, textos que venden y todo conectado a tu WhatsApp — para que el
          sitio traiga clientes mientras vos estás trabajando.
        </p>
      </div>
    </section>
  );
}
