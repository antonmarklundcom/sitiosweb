/**
 * ────────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN DEL NEGOCIO — sitiosweb.com.py
 *  Todo lo que cambia por sitio vive acá. No hay datos duros en los
 *  componentes: cambiar el número de WhatsApp es UNA línea.
 * ────────────────────────────────────────────────────────────────
 */

/** Sin espacios, sin "+", como lo pide wa.me */
export const WHATSAPP_NUMBER = '595995628862';

/** Como se muestra al visitante (mucha gente lo copia a mano) */
export const PHONE_DISPLAY = '+595 995 628 862';
export const PHONE_TEL = '+595995628862';

export const EMAIL = 'hola@sitiosweb.com.py';
export const DOMAIN = 'sitiosweb.com.py';

/**
 * Poné esto en `true` EL MISMO DÍA que conectes GA4, Meta Pixel o cualquier
 * cosa que escriba cookies. Enciende el banner de consentimiento (Ley 6534/2020).
 * Hoy el sitio no escribe ninguna cookie, así que mostrarlo sería ruido.
 */
export const ANALYTICS_ENABLED = false;

/**
 * Endpoint del formulario. Mientras esté vacío, el formulario abre
 * WhatsApp con el mensaje ya armado (funciona desde el día uno).
 * Cuando VenderCRM tenga dominio, poné acá la URL de enviar.php.
 */
export const LEADS_ENDPOINT = '';

/**
 * Arma el link de WhatsApp con mensaje precargado.
 * `contexto` identifica QUÉ sección convirtió — es la única atribución
 * que existe en un sitio estático. Nunca lo dejes vacío.
 */
export function waLink(contexto: string): string {
  const msg = `Hola, vengo de ${DOMAIN} (${contexto}) — quiero consultar por un sitio web.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
