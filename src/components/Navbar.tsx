import { useEffect, useState } from 'react';
import { waLink } from '../site';

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Cómo trabajamos', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Cerrar con Escape — el menú tapa el hero en móvil
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[420px] sm:w-auto">
      <div className="bg-white rounded-full shadow-lg flex items-center justify-between gap-6 pl-5 pr-3 py-2.5">
        <a
          href="#top"
          className="text-lg font-bold tracking-tight text-black whitespace-nowrap"
        >
          sitiosweb<span className="text-[#B4762C]">.com.py</span>
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="relative w-12 h-12 -mr-1 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
        >
          <span
            className="absolute block h-[2px] w-5 bg-black transition-transform duration-300"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)',
              transform: open ? 'rotate(45deg) translateY(0)' : 'translateY(-3px)',
            }}
          />
          <span
            className="absolute block h-[2px] w-5 bg-black transition-transform duration-300"
            style={{
              transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)',
              transform: open ? 'rotate(-45deg) translateY(0)' : 'translateY(3px)',
            }}
          />
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 mt-2 origin-top bg-white rounded-2xl shadow-lg p-2 transition-all duration-300 ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
      >
        <nav className="flex flex-col">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-4 min-h-[48px] flex items-center rounded-xl text-sm font-medium text-black/70 hover:text-black hover:bg-black/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={waLink('menú')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="navbar"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 min-h-[48px] flex items-center justify-center rounded-xl text-sm font-semibold text-white bg-[#321C04] hover:bg-[#1F1003] transition-colors text-center"
          >
            Escribinos por WhatsApp
          </a>
        </nav>
      </div>
    </div>
  );
}
