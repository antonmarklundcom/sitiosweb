# sitiosweb.com.py

Sitio en PHP 8.x para Hostinger. Sin build step, sin npm, sin base de datos.
Español paraguayo (voseo), pensado para Android de gama baja.

**Empezá por [`PLAN.md`](PLAN.md)** — estado, arquitectura, fases y qué falta
confirmar antes de publicar.

## Correr en local

```bash
php -S 127.0.0.1:8088 -t .
```

Sin PHP instalado, para ver el diseño nada más:

```bash
node tools/preview-server.mjs
```

## Configuración

Los datos reales (WhatsApp, email, RUC) no se versionan:

```bash
cp includes/config.local.example.php includes/config.local.php
```

Y completar los valores. Alternativa: las mismas claves como variables de
entorno. Mientras `SITE_WHATSAPP` esté vacío los botones quedan desactivados y
la home muestra la nota de contacto pendiente — es a propósito.

## Estructura

| Ruta | Qué es |
|---|---|
| `index.php` | Home |
| `includes/content.php` | **Todo el texto de la home**, en arreglos |
| `includes/config.php` | Constantes del sitio, `cfg()`, `asset()` |
| `includes/whatsapp.php` | Links de WhatsApp con mensaje prellenado |
| `includes/seo.php` | Metadatos por página |
| `includes/schema.php` | JSON-LD |
| `assets/css/site.css` | Todo el CSS |
| `assets/js/site.js` | Menú, reveals, carrusel |
| `design/` | Pase de diseño pendiente de portar + briefs |
| `archive/react-onepager/` | Dirección anterior en React/Vite, congelada |

Para cambiar un texto de la home se toca `includes/content.php`, no `index.php`.

## Deploy

```bash
bash tools/build-deploy-zip.sh
```

Corre `php -l` sobre todo y deja `dist/sitiosweb-<fecha>.zip` listo para
extraer en `public_html/`. Los pasos del servidor están en `PLAN.md` §5.

## Reglas de contenido

No se inventan clientes, resultados, reseñas, RUC, dirección, garantías ni datos
de contacto. Los ejemplos del carrusel son **conceptos**, no trabajos de
clientes, y así están rotulados. El precio, la facturación anual, el plazo de 7
días y las inclusiones de VenderCRM y Google Business siguen sin confirmar.
