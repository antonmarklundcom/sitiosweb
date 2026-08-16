import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { SlotVideo, SlotImage } from './Media';
import { portfolioMedia, portfolioBackground } from '../media';
import { waLink } from '../site';

type Work = {
  key: keyof typeof portfolioMedia;
  title: string;
  domain: string;
  url: string;
  rubro: string;
  body: string;
};

/**
 * Solo sitios REALES. Si un proyecto no está en línea, se saca de esta lista
 * — no se rellena con un caso inventado. Ver PENDIENTES.md.
 */
const WORKS: Work[] = [
  {
    key: 'propia',
    title: 'Portal inmobiliario con buscador y cuotas',
    domain: 'propia.com.py',
    url: 'https://propia.com.py',
    rubro: 'Inmobiliaria',
    body: 'Miles de propiedades con filtros, fichas individuales y cálculo de cuota en el momento. Cargado por importación automática, así el equipo no publica una por una.',
  },
  {
    key: 'pozo',
    title: 'Vertical de servicio con cotizador propio',
    domain: 'pozo.com.py',
    url: 'https://pozo.com.py',
    rubro: 'Perforación de pozos',
    body: 'Páginas por servicio y por zona del Gran Asunción, más un cotizador que devuelve un rango antes de que la persona escriba. Todo el tráfico termina en un WhatsApp con contexto.',
  },
  {
    key: 'gruas',
    title: 'Sitio de urgencias, pensado para el celular',
    domain: 'gruas.com.py',
    url: 'https://gruas.com.py',
    rubro: 'Grúas y auxilio',
    body: 'Cuando alguien queda varado no navega: llama. Barra fija de llamada, tiempos de respuesta claros y cobertura por ciudad, todo por encima del pliegue en Android.',
  },
];

export default function PortfolioSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => WORKS.map(() => false));
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Observador 1 — cuál tarjeta manda en la navegación de la izquierda
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.idx);
          setActiveIdx(i);
        });
      },
      { threshold: 0.6 }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Observador 2 — entrada desde la derecha, una sola vez por tarjeta
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.idx);
          setRevealed((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))));
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollToCard = (i: number) => {
    cardRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="trabajos" className="relative px-5 md:px-10 lg:px-16 py-20 md:py-40 lg:py-48">
      {/* Fondo fijo */}
      <div className="fixed inset-0 -z-10">
        <SlotImage slot={portfolioBackground} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#160E04]/70" />
      </div>

      <div className="lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[460px_1fr] lg:gap-24 xl:gap-48">
        {/* ── Columna izquierda, sticky ── */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32">
          <div>
            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#E0B978]">
              Trabajos
            </span>
            {/* La altura de línea va PEGADA a cada tamaño (sintaxis `text-x/y`).
                Con `leading-[...]` suelto, el line-height del breakpoint anterior
                pisa al tamaño arbitrario y los renglones se superponen. */}
            <h2 className="mt-4 text-white font-normal text-2xl/[1.25] sm:text-3xl/[1.2] lg:text-[46px]/[1.15]">
              Sitios que ya están trabajando para alguien
            </h2>
          </div>

          <nav className="hidden lg:flex flex-col gap-2 mt-10" aria-label="Trabajos">
            {WORKS.map((w, i) => (
              <button
                key={w.key}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-current={i === activeIdx}
                className={`text-left text-sm font-medium px-5 py-3.5 rounded-xl bg-black/20 transition-colors duration-300 ${
                  i === activeIdx ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {w.domain}
                <span className="block text-xs font-normal text-white/35 mt-0.5">{w.rubro}</span>
              </button>
            ))}
          </nav>

          <div className="hidden lg:block mt-10">
            <p className="text-white/60 text-sm font-medium max-w-[320px] leading-relaxed">
              Tu rubro también entra. Contanos qué vendés y te decimos qué tipo
              de sitio te conviene.
            </p>
            <a
              href={waLink('trabajos')}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-loc="trabajos"
              className="mt-4 inline-block bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors"
            >
              Pedí tu presupuesto
            </a>
          </div>
        </div>

        {/* ── Columna derecha, tarjetas ── */}
        {/* overflow-x-clip: el estado previo a la revelación desplaza las
            tarjetas a la derecha y sin esto genera scroll horizontal en móvil.
            `clip` no crea contenedor de scroll, así que el sticky de la
            izquierda sigue funcionando. */}
        <div className="flex flex-col gap-6 md:gap-10 mt-10 lg:mt-0 overflow-x-clip">
          {WORKS.map((w, i) => (
            <article
              key={w.key}
              data-idx={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`backdrop-blur-sm rounded-3xl p-6 md:p-10 transition-all duration-700 ease-out ${
                i % 2 === 1 ? 'bg-black/30' : 'bg-black/20'
              } ${revealed[i] ? 'translate-x-0 opacity-100' : 'translate-x-8 md:translate-x-16 opacity-0'}`}
            >
              <Logo size={40} fill="rgba(255,255,255,0.8)" />

              <h3 className="mt-6 text-white text-xl md:text-2xl font-medium leading-snug">
                {w.title}
              </h3>

              <a
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                data-ev="portfolio_visit"
                data-ev-loc={w.domain}
                className="mt-1 inline-flex items-center gap-1.5 min-h-[44px] text-[#E0B978] text-sm font-medium hover:text-white transition-colors"
              >
                {w.domain}
                <ArrowUpRight size={14} />
              </a>

              <div className="mt-6 aspect-video rounded-2xl overflow-hidden bg-black/30">
                <SlotVideo
                  slot={portfolioMedia[w.key]}
                  className="h-full w-full object-cover"
                  title={`Recorrido del sitio ${w.domain}`}
                />
              </div>

              <p className="mt-6 text-white/60 font-medium text-sm md:text-base leading-relaxed">
                {w.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
