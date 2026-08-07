import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { SlotVideo } from './Media';
import { heroVideos } from '../media';
import { waLink } from '../site';

const CYCLE_MS = 7000;

export default function Hero() {
  const clips = heroVideos.length ? heroVideos : [{ src: '', poster: '' }];
  const [active, setActive] = useState(0);

  // Con un solo clip no hay nada que rotar; el <video> ya hace loop.
  useEffect(() => {
    if (clips.length < 2) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % clips.length),
      CYCLE_MS
    );
    return () => window.clearInterval(id);
  }, [clips.length]);

  return (
    <section id="top" className="relative h-screen overflow-hidden mb-[-25px]">
      {clips.map((clip, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <SlotVideo slot={clip} className="h-full w-full object-cover" />
        </div>
      ))}

      {/* Scrim: nunca texto crudo sobre imagen */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/25" />

      <Navbar />

      {/* pb-28 en móvil: la barra fija de contacto mide ~68px y taparía el CTA */}
      <div className="relative z-10 h-full flex flex-col justify-end items-center pb-28 md:pb-16 px-6">
        <h1 className="text-center text-white font-normal tracking-tight text-5xl/[1.1] sm:text-7xl/[1.1] md:text-8xl/[1.1] lg:text-[96px]/[1.1]">
          <span className="block">Vendé más en línea</span>
          <span className="block">
            sin{' '}
            <em
              className="not-italic"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              complicarte
            </em>
          </span>
        </h1>

        <p className="mt-5 text-center text-white/80 text-sm md:text-base font-medium max-w-[460px]">
          Diseñamos sitios web para negocios paraguayos: rápidos, en tu idioma y
          conectados a tu WhatsApp. Vos atendé clientes — del sitio nos ocupamos
          nosotros.
        </p>

        <div className="mt-7 bg-black/25 backdrop-blur-md rounded-xl flex flex-row items-center pl-6 pr-1 py-1 max-w-full">
          <span className="hidden sm:block text-white text-sm font-medium">
            Sin plantillas. Sin mensualidades sorpresa. Presupuesto sin costo.
          </span>
          <span className="sm:hidden text-white text-sm font-medium">
            Presupuesto sin costo.
          </span>
          <a
            href={waLink('hero')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="hero"
            className="ml-4 shrink-0 bg-white text-black text-sm font-medium px-5 min-h-[48px] flex items-center rounded-xl hover:bg-white/90 transition-colors"
          >
            Escribinos
          </a>
        </div>
      </div>
    </section>
  );
}
