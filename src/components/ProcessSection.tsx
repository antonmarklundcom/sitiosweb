const STEPS = [
  {
    n: '01',
    title: 'Charlamos por WhatsApp',
    body: 'Nos contás qué hacés, a quién le vendés y qué te está frenando hoy. Quince minutos, sin compromiso y sin vocabulario técnico.',
  },
  {
    n: '02',
    title: 'Te pasamos la propuesta',
    body: 'Precio cerrado, qué incluye exactamente y en cuánto tiempo lo tenés. Sin letra chica y sin mensualidades escondidas.',
  },
  {
    n: '03',
    title: 'Diseñamos y escribimos',
    body: 'Vos seguí atendiendo tu negocio. Nosotros armamos el diseño, los textos y las imágenes, y te mostramos el sitio antes de publicarlo.',
  },
  {
    n: '04',
    title: 'Publicamos y te enseñamos',
    body: 'Dominio, hosting y Google configurados. Te dejamos el sitio andando y te mostramos cómo ver quién te escribió y desde qué página.',
  },
];

export default function ProcessSection() {
  return (
    <section id="proceso" className="relative z-10 bg-[#F6E4CF] py-20 md:py-28 lg:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#B4762C]">
          Cómo trabajamos
        </span>
        <h2 className="mt-4 max-w-[18ch] text-[#321C04] font-normal tracking-tight text-3xl/[1.15] sm:text-4xl/[1.12] lg:text-[46px]/[1.1]">
          Cuatro pasos y tu sitio está en línea
        </h2>

        {/* Riel: 4 en fila en desktop, vertical con línea de conexión en móvil */}
        <ol className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-10">
          {STEPS.map((s) => (
            <li key={s.n} className="relative pt-6 border-t-2 border-[#D9C4AA]">
              <span
                className="absolute -top-2 right-0 text-[#B4762C]/20 font-normal leading-none text-6xl lg:text-7xl tabular-nums select-none"
                aria-hidden="true"
              >
                {s.n}
              </span>
              <h3 className="relative text-[#321C04] text-lg md:text-xl font-medium max-w-[16ch]">
                {s.title}
              </h3>
              <p className="relative mt-3 text-[#321C04]/70 text-[15px] leading-relaxed max-w-[38ch]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
