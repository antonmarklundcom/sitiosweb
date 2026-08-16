/**
 * P8 — banda full-bleed de confianza.
 * Solo afirmaciones verificables. Nada de años, cantidad de clientes,
 * ni RUC inventado: eso se agrega cuando Anton confirme los datos.
 * Ver PENDIENTES.md.
 */
const FACTS = [
  'Diseño a medida, sin plantillas',
  'Textos y fotos incluidos',
  'Dominio .com.py + hosting',
  'Optimizado para Google',
  'Asunción · Gran Asunción · todo el país',
];

export default function TrustRibbon() {
  return (
    <section className="relative bg-[#321C04] py-5 md:py-6 px-6 overflow-hidden">
      {/* grano — el upgrade más barato que existe sobre una sección oscura */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
      <ul className="relative max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-5">
        {FACTS.map((f, i) => (
          <li key={f} className="flex items-center gap-3 md:gap-5">
            {i > 0 && (
              <span className="hidden sm:block w-1 h-1 rounded-full bg-[#D9C4AA]/50" aria-hidden="true" />
            )}
            <span className="text-[#F6E4CF] text-[11px] md:text-xs uppercase tracking-[0.12em] font-medium">
              {f}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
