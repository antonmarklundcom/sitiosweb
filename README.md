# sitiosweb.com.py

Landing page de una sola página. React + Vite + TypeScript + Tailwind +
lucide-react. Sin otras librerías de UI.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # sirve el build de producción
npm run lint     # typecheck
```

## Los dos archivos que vas a tocar

| Archivo | Qué tiene |
|---|---|
| `src/site.ts` | WhatsApp, teléfono, email, endpoint del formulario, flag de analytics |
| `src/media.ts` | **todas** las URLs de videos e imágenes |

Ningún componente tiene una URL ni un número escrito adentro. Cambiar el
WhatsApp de todo el sitio es una línea.

Los slots de medios vacíos caen a un panel de motivo en la paleta del sitio, así
que **el sitio se puede mostrar hoy**, sin un solo asset generado.

## Estructura

```
src/
  App.tsx                     orden de secciones
  main.tsx
  index.css                   fuentes + Tailwind + guardas globales
  site.ts                     ← configuración del negocio
  media.ts                    ← manifiesto de medios
  components/
    Hero.tsx                  video a pantalla completa, rota entre clips
    Navbar.tsx                píldora flotante con hamburguesa animada
    AboutSection.tsx          crema, solapa el hero 25px
    TrustRibbon.tsx           banda de confianza
    ServicesSection.tsx       split + slider de servicios
    PortfolioSection.tsx      sticky izquierda + tarjetas con scroll
    ProcessSection.tsx        riel numerado de 4 pasos
    CtaBand.tsx               banda full-bleed + panel que cruza el borde
    ContactSection.tsx        WhatsApp + formulario de 3 campos
    Footer.tsx
    StickyContact.tsx         FAB de WhatsApp + barra fija móvil
    ConsentBanner.tsx         apagado hasta que actives analytics
    Media.tsx                 slots con degradación
    Logo.tsx
```

## Ritmo de secciones

Cada sección tiene asignado un patrón del design system y ninguno se repite en
secciones consecutivas:

| # | Sección | Patrón |
|---|---|---|
| 1 | Hero | video full-bleed |
| 2 | Nosotros | P9 statement (solapa el hero) |
| 3 | Confianza | P8 banda full-bleed |
| 4 | Servicios | P1 split 5/7 + slider |
| 5 | Trabajos | P7 sticky-side scroll |
| 6 | Proceso | P5 riel numerado |
| 7 | Banda CTA | P6 imagen full-bleed + panel que cruza el borde |
| 8 | Contacto | P1 espejado 5/7 |

## Verificado

- Sin scroll horizontal en 360 / 390 / 768 / 1024 / 1440px
- Un solo `<h1>`, todas las imágenes con `alt`
- Sin errores de consola
- `prefers-reduced-motion` desactiva el carrusel del hero, el slider y las revelaciones
- Áreas táctiles: todos los CTA, botones y links del menú ≥ 48px. Los links de
  texto del footer quedaron en 40px y los dominios del portfolio en 44px — subirlos
  a 48 rompía el ritmo vertical de esos bloques y no son acciones primarias.
- Verde `#25D366` usado **solo** dentro del glifo de WhatsApp, nunca como color de diseño

## Documentos

- `PROMPTS-HIGGSFIELD.md` — prompts listos para pegar, con manifiesto de archivos
- `PENDIENTES.md` — qué falta confirmar antes de lanzar

## Deploy

`npm run build` genera `dist/`, estático puro. Va a Netlify, o a
`public_html/` en Hostinger vía FTP. Sin Node en el servidor, sin base de datos.
