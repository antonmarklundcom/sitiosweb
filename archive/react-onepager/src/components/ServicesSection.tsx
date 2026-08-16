import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SlotImage } from './Media';
import { serviceImages } from '../media';
import { waLink } from '../site';

const ADVANCE_MS = 6000;

type Service = {
  key: keyof typeof serviceImages;
  title: string;
  body: string;
};

const SERVICES: Service[] = [
  {
    key: 'sitio-a-medida',
    title: 'Sitio web a medida',
    body: 'Nada de plantillas recicladas. Dibujamos tu sitio desde cero para que no se parezca al de tu competencia — y para que se entienda en los primeros tres segundos, que es lo único que te dan.',
  },
  {
    key: 'google-seo',
    title: 'Google y SEO local',
    body: 'Que aparezcas cuando alguien busca tu servicio en tu ciudad. Trabajamos la ficha de Google, las páginas por zona y la estructura del sitio para que Google entienda dónde estás y qué hacés.',
  },
  {
    key: 'whatsapp',
    title: 'WhatsApp que convierte',
    body: 'Cada botón abre WhatsApp con el mensaje ya escrito, distinto según la sección. Así sabés qué página te trajo el cliente, sin instalar nada ni pagar una herramienta aparte.',
  },
  {
    key: 'fotos-textos',
    title: 'Fotos y textos incluidos',
    body: 'No hace falta que consigas fotógrafo ni que te sientes a escribir. Entregamos el sitio con las imágenes y los textos hechos, en castellano paraguayo, listos para publicar.',
  },
  {
    key: 'hosting',
    title: 'Dominio, hosting y mantenimiento',
    body: 'Registramos tu .com.py, lo alojamos en un servidor rápido y nos ocupamos de las actualizaciones. Un solo contacto para todo, sin tener que entender de servidores.',
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SERVICES.length),
      ADVANCE_MS
    );
    return () => window.clearInterval(id);
  }, [paused, active]);

  return (
    <section id="servicios" className="bg-[#FFF9F2] py-20 md:py-28 lg:py-36 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* ── Columna de texto (5/12) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#B4762C]">
            Qué hacemos
          </span>

          <h2 className="mt-4 text-[#321C04] font-normal tracking-tight text-3xl/[1.15] sm:text-4xl/[1.12] lg:text-[46px]/[1.1]">
            Todo lo que tu negocio necesita para vender en línea
          </h2>

          <p className="mt-5 text-[#321C04]/70 text-base md:text-[17px] leading-relaxed max-w-[52ch]">
            No vendemos “paquetes”. Armamos un sitio completo y te lo entregamos
            andando. Elegí un servicio para ver de qué se trata.
          </p>

          <ul
            className="mt-9 flex flex-col"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {SERVICES.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.key} className="border-t border-[#321C04]/10 last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className="w-full text-left py-4 flex items-start gap-4 group"
                  >
                    <span
                      className={`mt-1.5 text-[11px] font-semibold tabular-nums transition-colors ${
                        isActive ? 'text-[#B4762C]' : 'text-[#321C04]/35'
                      }`}
                    >
                      0{i + 1}
                    </span>

                    <span className="flex-1">
                      <span
                        className={`block text-lg md:text-xl font-medium transition-colors ${
                          isActive ? 'text-[#321C04]' : 'text-[#321C04]/50 group-hover:text-[#321C04]/80'
                        }`}
                      >
                        {s.title}
                      </span>

                      {/* El cuerpo solo existe para el servicio activo */}
                      <span
                        className="grid transition-all duration-300 ease-out"
                        style={{
                          gridTemplateRows: isActive ? '1fr' : '0fr',
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <span className="overflow-hidden">
                          <span className="block pt-2 text-[15px] leading-relaxed text-[#321C04]/70 max-w-[46ch]">
                            {s.body}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <a
            href={waLink('servicios')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="servicios"
            className="mt-8 inline-flex items-center gap-2 bg-[#321C04] text-[#FFF9F2] text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-[#1F1003] transition-colors"
          >
            Contanos qué necesitás
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* ── Columna visual (7/12) — el slider ── */}
        <div className="lg:col-span-7 lg:sticky lg:top-24">
          <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden bg-[#EFDCC4] shadow-[0_1px_2px_rgba(50,28,4,0.08),0_24px_60px_-24px_rgba(50,28,4,0.35)]">
            {SERVICES.map((s, i) => (
              <div
                key={s.key}
                className="absolute inset-0 transition-all duration-[900ms]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                  opacity: i === active ? 1 : 0,
                  // Ken Burns lento: la imagen activa sigue viva mientras se lee
                  transform: i === active ? 'scale(1.04)' : 'scale(1)',
                }}
                aria-hidden={i !== active}
              >
                <SlotImage
                  slot={serviceImages[s.key]}
                  tone="cream"
                  className="h-full w-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}

            {/* Scrim + etiqueta: nunca texto crudo sobre imagen */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
            <span className="absolute bottom-5 left-6 right-6 text-white text-sm md:text-base font-medium">
              {SERVICES[active].title}
            </span>
          </div>

          {/* Indicador de progreso — también sirve de navegación */}
          <div className="mt-4 flex gap-2" role="tablist" aria-label="Servicios">
            {SERVICES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={s.title}
                onClick={() => setActive(i)}
                className="flex-1 h-12 flex items-center group"
              >
                <span
                  className={`w-full h-[3px] rounded-full transition-colors duration-300 ${
                    i === active ? 'bg-[#B4762C]' : 'bg-[#321C04]/15 group-hover:bg-[#321C04]/30'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
