# Plan — sitiosweb.com.py (HTML/PHP en Hostinger)

Estado al 16/08/2026. Este documento es el que hay que revisar antes de seguir
construyendo.

---

## 1. Qué se decidió acá

**El sitio es PHP plano, sin build step, sin npm, sin base de datos.** Se sirve
desde `public_html/` en Hostinger. Esa era la instrucción del brief original
(`design/CLAUDE-CODE-BRIEF.md`) y es lo correcto para un sitio de ~10 páginas
estáticas que tiene que cargar rápido en Android de gama baja con datos móviles.

**El one-pager en React/Vite quedó archivado en `archive/react-onepager/`.**
Era una dirección paralela: otro diseño, otro texto, y con datos que el brief
prohíbe publicar sin confirmar (número de WhatsApp, email, portfolio de
propia/pozo/gruas como trabajos propios). No se borró — está en git y su
`PENDIENTES.md` y `PROMPTS-HIGGSFIELD.md` siguen siendo útiles. Pero **la fuente
de verdad ahora es la raíz del repo**, no `archive/`.

> Si la intención era al revés — seguir con React y descartar el PHP — esto es
> lo primero que hay que revertir, y es un solo `git revert`. Decidilo antes de
> que se acumule trabajo encima.

---

## 2. Arquitectura

```
index.php            home
privacidad.php       placeholder legal
terminos.php         placeholder legal
404.php              ErrorDocument, devuelve 404 real
sitemap.php          -> /sitemap.xml por rewrite
robots.txt
.htaccess            URLs limpias, caché, cabeceras, ErrorDocument

includes/
  config.php               constantes + cfg() + asset() con cache-busting
  config.local.example.php plantilla de datos reales (el .local no se versiona)
  content.php              TODO el texto de la home en arreglos
  whatsapp.php             whatsapp_url($intent) con mensajes prellenados
  seo.php                  page_meta(), canonical_url(), home_anchor(), robots
  schema.php               JSON-LD: Organization, Service, FAQPage, Breadcrumb
  head.php / header.php / footer.php

assets/css/site.css        un solo CSS, variables en :root
assets/js/site.js          vanilla, progressive enhancement
assets/img/*.webp

tools/preview-server.mjs   preview sin PHP (no se despliega)
tools/build-deploy-zip.sh  lint + ZIP listo para public_html

design/                    referencia de diseño y briefs (no se despliega)
archive/react-onepager/    dirección anterior, congelada
```

### Ruteo: archivos planos, no front controller

Cada página es un `.php` en la raíz. `.htaccess` mapea `/precios/` → `precios.php`
y redirige `/precios.php` → `/precios/` con 301, así nunca hay dos URLs por
página. Para ~10 páginas sin contenido dinámico, un front controller agrega una
capa que no compra nada; si más adelante aparecen páginas de rubro generadas
desde datos, se cambia solo ese bloque del `.htaccess`.

### Cómo se agrega una página

```php
<?php
declare(strict_types=1);
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/schema.php';

$page = [
    'title'       => 'Título propio | sitiosweb.com.py',
    'description' => 'Una sola intención de búsqueda.',
    'path'        => '/precios/',
];
$schema = [schema_organization(), schema_breadcrumbs([...])];

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/header.php';
?>
    <main id="contenido"> ... </main>
<?php require __DIR__ . '/includes/footer.php';
```

Después: sumar la ruta a `SITEMAP_ROUTES` en `sitemap.php`.

### Dos decisiones que conviene mirar con lupa

1. **El precio no va en el JSON-LD.** `SITE_PRICE['confirmed'] => false` en
   `includes/content.php` mantiene los Gs. 89.000 visibles en la página pero
   fuera del marcado `Offer`. Mostrar un precio provisorio es una cosa;
   declarárselo a Google como oferta vigente es otra. Se activa poniendo
   `confirmed => true` cuando el precio esté cerrado.
2. **Las legales están en `noindex, follow` mientras sean placeholders**, y por
   eso no entran al sitemap. Sacarles el noindex cuando tengan texto real.

---

## 3. Fases

### Fase 1 — base (hecha)

- [x] Arquitectura de includes y separación contenido/marcado
- [x] Config con precedencia `config.local.php` → env → default
- [x] SEO por página: title, description, canonical, OG/Twitter, robots
- [x] JSON-LD ProfessionalService + Service + FAQPage (las FAQ salen del mismo
      arreglo que renderiza la sección, no pueden desincronizarse)
- [x] `.htaccess` con URLs limpias, caché de assets, cabeceras de seguridad
- [x] robots.txt + sitemap generado
- [x] 404 con status real
- [x] Stubs legales enlazados en el pie
- [x] Script de ZIP para Hostinger (lint + solo archivos de producción)
- [x] Verificado: PHP 8.4 lint limpio, todas las rutas 200/404, un solo `<h1>`,
      JSON-LD parsea, sitemap es XML válido

### Fase 2 — pase de diseño (siguiente, esperando feedback)

Está todo especificado en `design/IMPLEMENTATION-NOTES.md` y el artefacto visual
en `design/homepage-design-pass.dc.html`. **No se portó todavía a propósito**:
si el feedback de Fable cambia la dirección, portarlo antes sería trabajo tirado.

Lo grueso del pase:

- Header `fixed` → `sticky`, y CTA de WhatsApp en el menú móvil (hoy el header
  móvil no tiene ningún CTA)
- Reescritura del carrusel: tarjetas medidas por JS, snap en vez de deriva
  continua, captions fuera de las tarjetas, swipe, controles de 44px
- Secciones a `repeat(auto-fit, minmax(N,1fr))`; "Qué incluye" de cajas a filas
- Precio: `white-space: nowrap` — hoy "Gs. 89.000" se parte en dos líneas
  entre 360 y 430px
- Barra CTA fija en móvil
- Borrar CSS muerto: `.signal`, `.horizon`, `.browser-ghost`, `.mini-*`,
  `.site-card::after`, `.site-card-caption`, `.scroll-cue`
- El artefacto usa unidades `cqi`; **en producción van `vw`** con los mismos
  valores de clamp

### Fase 3 — rendimiento

- Partir `mobile-sites-spanish-sprite-v1.webp` (486 KB) en seis WebP con
  lazy-load. Hoy todo visitante baja los seis conceptos antes de que el hero
  termine de asentarse.
- Servir las fuentes localmente en vez de Google Fonts (dos preconnect + una
  hoja bloqueante en la ruta crítica).
- Imagen social `assets/img/og-default.jpg` (1200×630). Mientras no exista,
  `head.php` omite `og:image` en vez de apuntar a un 404.

### Fase 4 — multipágina

Rutas objetivo: Inicio, seis páginas de rubro (dentista, contador, constructora,
restaurante, salón de belleza, arquitecto), Precios, Cómo funciona, Contacto,
más las dos legales. Las de rubro son el objetivo SEO real y cada una reusa uno
de los seis conceptos que ya existen.

Navegación: cuatro links de primer nivel + CTA de WhatsApp, con "Rubros" como
desplegable; en móvil, hoja a pantalla completa con el CTA fijo abajo.

El brief pide **construir una sola página de rubro como plantilla y frenar ahí**
para revisarla antes de escribir las otras cinco. Respetarlo.

### Fase 5 — captación de leads

Cuando haya formulario: endpoint PHP propio con validación, CSRF, rate limiting,
texto de consentimiento y estados claros de éxito/error. Credenciales y llamadas
a VenderCRM del lado del servidor. Capturar página de origen y parámetros de
campaña antes de reenviar el lead. Ver la skill `vendercrm-lead-capture`.

---

## 4. Pendiente de confirmación (bloquea la publicación)

Nada de esto está inventado en el sitio. Donde falta un dato, se omitió.

| Dato | Dónde entra | Estado |
|---|---|---|
| Número de WhatsApp | `SITE_WHATSAPP` en `config.local.php` | ❌ vacío — los botones apuntan a `#empezar` y la home muestra "Contacto pendiente" |
| Email de contacto | `SITE_EMAIL` | ❌ vacío — no se muestra en ningún lado |
| Razón social y RUC | `SITE_LEGAL_NAME`, `SITE_RUC` | ❌ vacío — fuera del JSON-LD hasta confirmar |
| Precio Gs. 89.000 y facturación anual | `SITE_PRICE` en `content.php` | ⚠️ visible en la página, fuera del schema |
| Plazo de 7 días hábiles | `SITE_STEPS` y FAQ | ⚠️ declarado como "referencia" |
| VenderCRM y Google Business incluidos | `SITE_PRICE['includes']` | ⚠️ sin confirmar |
| Zona de cobertura y horario | — | ❌ no está en el sitio |
| Texto legal real | `privacidad.php`, `terminos.php` | ❌ placeholders |

Los seis conceptos del carrusel están rotulados como conceptos, no como trabajos
de clientes. **Que siga así** hasta que haya sitios reales publicados con permiso
para mostrarlos.

---

## 5. Deploy en Hostinger

```bash
bash tools/build-deploy-zip.sh      # corre php -l y arma dist/sitiosweb-<fecha>.zip
```

El ZIP no lleva carpeta contenedora: `index.php` y `.htaccess` quedan en la raíz
de `public_html/`. No incluye `archive/`, `design/`, los `.md`, las herramientas
locales ni `config.local.php`.

En el servidor, una sola vez:

1. Subir y extraer en `public_html/`.
2. Crear `includes/config.local.php` a partir de `config.local.example.php` con
   los datos reales.
3. Emitir el SSL y **recién ahí** descomentar el bloque HTTPS del `.htaccess`
   (y el de www/no-www, según qué variante sea la canónica).
4. Verificar sobre el dominio real: `/sitemap.xml`, `/robots.txt`, un 404 de
   verdad, y que los links de WhatsApp abran el chat con el mensaje prellenado.

Verificación local sin PHP instalado: `node tools/preview-server.mjs`.

---

## 6. Preguntas abiertas

1. ¿Se confirma PHP y se descarta el one-pager React, o al revés?
2. ¿El dominio canónico es `sitiosweb.com.py` o `www.sitiosweb.com.py`?
3. ¿El precio se publica ya, o el sitio sale con "consultá el precio" hasta
   cerrarlo?
4. ¿Las seis páginas de rubro se escriben a mano una por una, o se generan desde
   un arreglo de datos con texto propio por rubro? Lo segundo escala; lo primero
   posiciona mejor. Con seis, la recomendación es a mano.
