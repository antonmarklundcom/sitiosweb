import { useEffect, useState } from 'react';
import { ANALYTICS_ENABLED } from '../site';

const KEY = 'sw_consent';

/**
 * Solo aparece cuando ANALYTICS_ENABLED es true. Sin casilla premarcada:
 * hasta que la persona acepte, no se carga nada de medición.
 */
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ANALYTICS_ENABLED) return;
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      /* modo privado sin storage: no insistimos */
    }
  }, []);

  if (!show) return null;

  const decide = (value: 'aceptado' | 'rechazado') => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignorado */
    }
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-3 bottom-[152px] md:bottom-3 md:left-auto md:right-3 md:max-w-md z-[70] bg-[#FFF9F2] border border-[#321C04]/15 rounded-2xl p-5 shadow-[0_20px_50px_-20px_rgba(22,14,4,0.55)]"
    >
      <p className="text-sm text-[#321C04] leading-relaxed">
        Usamos cookies para medir cuántas personas visitan el sitio. Podés
        rechazarlas y navegar igual.
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => decide('aceptado')}
          className="flex-1 min-h-[44px] rounded-xl bg-[#321C04] text-[#FFF9F2] text-sm font-medium hover:bg-[#1F1003] transition-colors"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide('rechazado')}
          className="flex-1 min-h-[44px] rounded-xl bg-[#D9C4AA] text-[#321C04] text-sm font-medium hover:bg-[#CEBA9E] transition-colors"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}
