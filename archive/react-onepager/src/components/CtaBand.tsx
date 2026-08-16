import { MessageCircle, Phone } from 'lucide-react';
import { SlotImage } from './Media';
import { ctaBandImage } from '../media';
import { waLink, PHONE_DISPLAY, PHONE_TEL } from '../site';

/**
 * P6 — banda full-bleed + panel que cruza el borde.
 * Es el único "momento caro" de la página: una sola frase grande, nada más.
 */
export default function CtaBand() {
  return (
    <section className="relative z-10 bg-[#F6E4CF]">
      <div className="relative h-[46vh] min-h-[320px] md:h-[58vh] w-full overflow-hidden">
        <SlotImage slot={ctaBandImage} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#160E04]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160E04]/80 to-transparent" />

        <div className="absolute inset-0 flex items-center px-6">
          <p className="max-w-5xl mx-auto w-full text-white font-normal tracking-tight leading-[0.98] text-[clamp(34px,6.2vw,76px)]">
            Un sitio que no vende es un gasto.
            <br />
            Uno que vende{' '}
            <em
              className="not-italic"
              style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}
            >
              se paga solo
            </em>
            .
          </p>
        </div>
      </div>

      {/* Panel que sube y cruza el borde de la banda */}
      <div className="relative z-20 px-6 -mt-14 md:-mt-20">
        <div className="max-w-5xl mx-auto bg-[#FFF9F2] rounded-[28px] px-6 py-8 md:px-12 md:py-10 shadow-[0_1px_2px_rgba(50,28,4,0.10),0_32px_70px_-30px_rgba(22,14,4,0.60)] flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <h2 className="text-[#321C04] text-xl md:text-2xl font-medium">
              Contanos tu negocio y te decimos qué necesita
            </h2>
            <p className="mt-2 text-[#321C04]/70 text-[15px] leading-relaxed max-w-[46ch]">
              Presupuesto sin costo y sin compromiso. Respondemos el mismo día
              hábil.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={waLink('banda-cta')}
              target="_blank"
              rel="noopener noreferrer"
              data-ev="whatsapp_click"
              data-ev-loc="banda_cta"
              className="inline-flex items-center justify-center gap-2 bg-[#321C04] text-[#FFF9F2] text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-[#1F1003] transition-colors"
            >
              <MessageCircle size={16} />
              Escribinos por WhatsApp
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              data-ev="call_click"
              data-ev-loc="banda_cta"
              className="inline-flex items-center justify-center gap-2 bg-[#D9C4AA] text-[#321C04] text-sm font-medium px-6 py-3.5 rounded-xl hover:bg-[#CEBA9E] transition-colors whitespace-nowrap"
            >
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
