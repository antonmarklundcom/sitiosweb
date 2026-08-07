import { useState, type FormEvent } from 'react';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import {
  WHATSAPP_NUMBER,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL,
  DOMAIN,
  LEADS_ENDPOINT,
  waLink,
} from '../site';

export default function ContactSection() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const fd = new FormData(e.currentTarget);
    const nombre = String(fd.get('nombre') ?? '').trim();
    const telefono = String(fd.get('telefono') ?? '').trim();
    const mensaje = String(fd.get('mensaje') ?? '').trim();

    // Si hay endpoint, el lead entra al CRM. Nunca bloquea al visitante:
    // si falla, WhatsApp se abre igual.
    if (LEADS_ENDPOINT) {
      try {
        await fetch(LEADS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, telefono, mensaje, site: DOMAIN, source: 'formulario' }),
        });
      } catch {
        /* silencioso a propósito — el fallback de WhatsApp cubre el lead */
      }
    }

    const texto = `Hola, vengo de ${DOMAIN} (formulario).%0A%0ANombre: ${nombre}%0ATeléfono: ${telefono}%0A%0A${mensaje}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank', 'noopener');
    setSending(false);
  }

  const field =
    'w-full bg-[#FFF9F2] border border-[#321C04]/15 rounded-xl px-4 py-3.5 text-[15px] text-[#321C04] placeholder:text-[#321C04]/40 outline-none focus:border-[#B4762C] focus:ring-2 focus:ring-[#B4762C]/20 transition-colors';

  return (
    <section id="contacto" className="relative z-10 bg-[#F6E4CF] py-20 md:py-28 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Izquierda 5/12 — WhatsApp primero, siempre */}
        <div className="lg:col-span-5">
          <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#B4762C]">
            Contacto
          </span>
          <h2 className="mt-4 text-[#321C04] font-normal tracking-tight text-3xl/[1.15] sm:text-4xl/[1.12] lg:text-[46px]/[1.1]">
            Hablemos de tu sitio
          </h2>
          <p className="mt-5 text-[#321C04]/70 text-base leading-relaxed max-w-[46ch]">
            Lo más rápido es WhatsApp. Escribinos con el rubro de tu negocio y te
            contestamos con una idea concreta, no con un catálogo.
          </p>

          <a
            href={waLink('contacto')}
            target="_blank"
            rel="noopener noreferrer"
            data-ev="whatsapp_click"
            data-ev-loc="contacto"
            className="mt-8 inline-flex items-center gap-3 bg-[#321C04] text-[#FFF9F2] rounded-full pl-1.5 pr-6 py-1.5 hover:bg-[#1F1003] transition-colors"
          >
            <span className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle size={17} className="text-white" />
            </span>
            <span className="text-xs uppercase tracking-wide font-medium">
              Escribinos por WhatsApp
            </span>
          </a>

          {/* gap chico + min-h en los links: el alto lo da el área táctil, no el gap */}
          <ul className="mt-8 flex flex-col gap-1 text-[#321C04]">
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-[#B4762C]" />
              <a href={`tel:${PHONE_TEL}`} data-ev="call_click" data-ev-loc="contacto" className="inline-flex items-center min-h-[48px] text-[15px] hover:underline">
                {PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-[#B4762C]" />
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center min-h-[48px] text-[15px] hover:underline">
                {EMAIL}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="shrink-0 text-[#B4762C]" />
              <span className="inline-flex items-center min-h-[48px] text-[15px]">
                Asunción · Gran Asunción · todo Paraguay
              </span>
            </li>
          </ul>
        </div>

        {/* Derecha 7/12 — formulario de 3 campos, ni uno más */}
        <div className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="bg-[#FFF9F2]/60 border border-[#321C04]/10 rounded-[28px] p-6 md:p-9"
          >
            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="nombre" className="block text-xs uppercase tracking-wide font-semibold text-[#321C04]/70 mb-2">
                  Tu nombre
                </label>
                <input id="nombre" name="nombre" type="text" required autoComplete="name" className={field} placeholder="Ej. Rocío Benítez" />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-xs uppercase tracking-wide font-semibold text-[#321C04]/70 mb-2">
                  Tu WhatsApp
                </label>
                <input id="telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel" className={field} placeholder="09XX XXX XXX" />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-xs uppercase tracking-wide font-semibold text-[#321C04]/70 mb-2">
                  ¿Qué hace tu negocio?
                </label>
                <textarea id="mensaje" name="mensaje" required rows={4} className={`${field} resize-y`} placeholder="Ej. Tengo una clínica odontológica en Luque y quiero que me encuentren en Google." />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              data-ev="form_submit"
              data-ev-loc="contacto"
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#321C04] text-[#FFF9F2] text-sm font-medium px-7 py-4 rounded-xl hover:bg-[#1F1003] transition-colors disabled:opacity-60"
            >
              <MessageCircle size={16} />
              {sending ? 'Abriendo WhatsApp…' : 'Enviar por WhatsApp'}
            </button>

            <p className="mt-4 text-xs text-[#321C04]/55 leading-relaxed">
              Al enviar se abre WhatsApp con tu mensaje ya escrito. Usamos tus
              datos solo para responderte esta consulta.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
