/**
 * ────────────────────────────────────────────────────────────────
 *  MANIFIESTO DE MEDIOS
 *  Pegá acá las URLs de Higgsfield (o rutas locales tipo
 *  "/media/hero-negocios.mp4"). Los componentes NO tienen URLs.
 *
 *  Cualquier slot vacío ('') se degrada solo:
 *   · video  → se muestra el poster; si tampoco hay, un campo con gradiente
 *   · imagen → panel de motivo en la paleta del sitio
 *  El sitio nunca se ve roto por un asset que falta.
 *
 *  REGLA DE HONESTIDAD (higgsfield-web-imagery):
 *   · HERO y SERVICIOS  → generados con IA, está bien: ilustran un oficio.
 *   · PORTFOLIO         → capturas/grabaciones REALES de sitios reales.
 *                         Nunca generar con IA un "trabajo hecho".
 * ────────────────────────────────────────────────────────────────
 */

export type VideoSlot = {
  /** .mp4 — autoplay, muted, loop */
  src: string;
  /** primer frame en .jpg/.webp — evita el flash negro y cubre 3G */
  poster: string;
};

export type ImageSlot = {
  src: string;
  alt: string;
};

/* ── SECCIÓN 1 · HERO ─────────────────────────────────────────────
   Empresarios paraguayos trabajando / atendiendo / contentos.
   Prompts HF-01a … HF-01c en PROMPTS-HIGGSFIELD.md

   Poné 1 video y hace loop. Poné 2 o 3 y se cruzan solos cada 7s.
   Con 3 clips el hero se siente vivo sin pesar más de ~2 MB.        */
export const heroVideos: VideoSlot[] = [
  { src: '', poster: '' },
];

/* ── SECCIÓN 3 · SERVICIOS (slider) ───────────────────────────────
   Una imagen por servicio. 4:3, 1024px alcanza (se muestran ~560px).
   Prompts HF-02 a HF-06.                                           */
export const serviceImages: Record<string, ImageSlot> = {
  'sitio-a-medida': {
    src: '',
    alt: 'Dueña de una tienda en Asunción mirando su nuevo sitio web en una notebook',
  },
  'google-seo': {
    src: '',
    alt: 'Cliente buscando un servicio local en el celular en una calle de Asunción',
  },
  whatsapp: {
    src: '',
    alt: 'Comerciante paraguayo respondiendo consultas de clientes por WhatsApp en su local',
  },
  'fotos-textos': {
    src: '',
    alt: 'Sesión de fotos de producto en un taller paraguayo para el sitio web',
  },
  hosting: {
    src: '',
    alt: 'Sitio web paraguayo cargando rápido en un celular con datos móviles',
  },
};

/* ── SECCIÓN 4 · PORTFOLIO ────────────────────────────────────────
   SOLO material real: grabación de pantalla del sitio andando (mejor)
   o captura estática. Nada de IA acá — es una prueba, no una ilustración. */
export const portfolioMedia: Record<string, VideoSlot> = {
  propia: { src: '', poster: '' },
  pozo: { src: '', poster: '' },
  gruas: { src: '', poster: '' },
};

/* ── SECCIÓN 4 · Fondo fijo del portfolio ─────────────────────────
   Prompt HF-07. Textura ambiente, no protagonista.                 */
export const portfolioBackground: ImageSlot = {
  src: '',
  alt: '',
};

/* ── SECCIÓN 6 · Banda full-bleed antes del contacto ──────────────
   Prompt HF-08.                                                    */
export const ctaBandImage: ImageSlot = {
  src: '',
  alt: 'Equipo de un negocio paraguayo trabajando en su local',
};
