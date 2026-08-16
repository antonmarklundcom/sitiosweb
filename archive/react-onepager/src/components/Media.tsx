import type { ImageSlot, VideoSlot } from '../media';

/**
 * Campo de respaldo cuando todavía no hay asset.
 * No es un "placeholder visible": es un motivo tonal que se ve intencional,
 * para que el sitio se pueda mostrar a un cliente antes de tener los videos.
 */
function MotifField({ className = '', tone = 'dark' }: { className?: string; tone?: 'dark' | 'cream' }) {
  const bg =
    tone === 'cream'
      ? 'linear-gradient(135deg,#EFDCC4 0%,#F6E4CF 45%,#E3CBAD 100%)'
      : 'linear-gradient(135deg,#241706 0%,#3A2409 48%,#120B03 100%)';
  return (
    <div
      className={`h-full w-full ${className}`}
      style={{
        background: bg,
        backgroundBlendMode: 'overlay',
      }}
      aria-hidden="true"
    >
      <div
        className="h-full w-full opacity-[0.13]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/** Video de fondo/tarjeta con degradación limpia a poster y luego a motivo. */
export function SlotVideo({
  slot,
  className = '',
  tone = 'dark',
  title,
}: {
  slot: VideoSlot;
  className?: string;
  tone?: 'dark' | 'cream';
  /** Descripción para lectores de pantalla; el video es decorativo si se omite */
  title?: string;
}) {
  if (!slot.src) {
    if (slot.poster) {
      return <img src={slot.poster} alt={title ?? ''} className={className} loading="lazy" decoding="async" />;
    }
    return <MotifField className={className} tone={tone} />;
  }

  return (
    <video
      className={className}
      src={slot.src}
      poster={slot.poster || undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
    />
  );
}

/** Imagen con degradación a motivo. */
export function SlotImage({
  slot,
  className = '',
  tone = 'dark',
  loading = 'lazy',
}: {
  slot: ImageSlot;
  className?: string;
  tone?: 'dark' | 'cream';
  loading?: 'lazy' | 'eager';
}) {
  if (!slot.src) return <MotifField className={className} tone={tone} />;
  return (
    <img
      src={slot.src}
      alt={slot.alt}
      className={className}
      loading={loading}
      decoding="async"
    />
  );
}
