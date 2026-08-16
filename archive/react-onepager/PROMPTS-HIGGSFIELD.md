# Prompts Higgsfield — sitiosweb.com.py

Todos los prompts son **autónomos**: se pegan tal cual en la UI de Higgsfield,
sin sustituir nada. No hay `<<<element_id>>>` en ningún lado — esa sintaxis solo
funciona generando por MCP en la misma sesión; pegada a mano sale escrita dentro
de la imagen.

Por eso cada prompt **repite** paleta, luz, lente y clima. Es redundante a
propósito: es lo único que mantiene el set coherente cuando lo genera una
persona de a una imagen por vez.

---

## Antes de arrancar

**Consistencia (recomendado).** Generá primero **HF-02** como imagen suelta. Esa
es tu referencia. Registrala como *Element / Style Reference* en Higgsfield y
aplicala al resto — así las nueve piezas parecen del mismo fotógrafo el mismo
día. Si no usás Elements, los prompts igual funcionan: por eso repiten el bloque
de estilo.

**Costos.** No asumas precios: cambian. Mirá el costo por modelo y resolución en
la UI antes de lanzar la tanda. Orientación de gasto: los `card-motif` van a
1024px (se muestran a ~560px, ya es 2x) y solo el hero justifica 2048px.

**Modelos sugeridos**

| Pieza | Modelo | Por qué |
|---|---|---|
| Videos hero | Seedance / image-to-video | movimiento sutil y loopeable |
| Imagen inicial del hero | `nano_banana_2` | mejor detalle, 2048px |
| Imágenes de servicios | `nano_banana_flash` | volumen barato, alcanza a 1024px |
| Fondo del portfolio | `soul_cinematic` | textura ambiente, no protagonista |
| Banda CTA | `seedream_v5_pro` | realismo físico en escena con gente |

---

## Bloque de estilo (ya está incluido en cada prompt)

> Warm documentary photography, Paraguayan setting. Natural daylight, soft
> directional light from a window or open doorway, warm cream and amber palette
> (#F6E4CF cream, #B4762C amber, #321C04 deep brown), shallow depth of field,
> 35mm or 50mm lens, subtle film grain, muted saturation, calm and unhurried
> mood. Real working people, relaxed and genuinely warm — not posed, not
> grinning at the camera.

## Bloque negativo (pegalo al final de TODOS)

```
--no text, watermark, logo, signage with letters, captions, subtitles,
distorted hands, extra fingers, deformed faces, plastic skin, waxy skin,
heavy HDR, oversaturated colors, neon colors, cold blue tint, stock-photo grin,
thumbs up, business suits in an office tower, North American or Northern
European faces, snow, autumn foliage, pine trees, cluttered composition,
collage, split screen, borders, frames
```

---

# SECCIÓN 1 · HERO — videos

Van en `src/media.ts` → `heroVideos`.

**Reglas que no son negociables para estas tomas:**

- **16:9 horizontal.** Se recorta con `object-cover` a pantalla completa.
- **El tercio inferior central tiene que quedar tranquilo y más oscuro.** Ahí va
  el H1, el subtítulo y el CTA. Si esa zona tiene una cara o un detalle
  brillante, el texto se vuelve ilegible y el video no sirve.
- **5–8 segundos, movimiento lento y continuo, sin cortes.** Hace loop infinito:
  si hay un corte se nota el salto.
- **Sin texto real en cámara.** Ningún cartel legible: la IA escribe mal el
  castellano y un cartel roto en el hero mata la credibilidad de una web
  agency.
- Exportá a **1080p**, después convertilo a MP4 H.264 por debajo de **2,5 MB**
  por clip (ver `PENDIENTES.md`).

Podés usar uno solo, o los tres: con dos o más se cruzan solos cada 7 segundos.

---

### HF-01a — Almacenera / dueña de comercio de barrio

**Imagen inicial**

```
Warm documentary photograph of a Paraguayan woman in her early forties, mestiza
with warm brown skin and dark hair tied back, standing behind the counter of her
own small neighbourhood shop in Asunción. She is mid-conversation with a
customer just out of frame, smiling naturally, one hand resting on the counter.
Behind her, shelves of everyday goods in soft focus. Late morning tropical
light coming through the open shopfront from the left, warm and slightly hazy.
Warm cream and amber palette (#F6E4CF cream, #B4762C amber, #321C04 deep
brown), shallow depth of field, 35mm lens, subtle film grain, muted saturation,
calm unhurried mood. Composition: subject in the upper left third, the lower
centre of the frame is empty counter surface falling into soft shadow, clean and
uncluttered. 16:9 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames
```

**Movimiento (image-to-video)**

```
Very slow push-in on the shopkeeper, almost imperceptible. She laughs softly and
tilts her head as she keeps talking to the customer. Dust motes drift in the
warm light from the doorway. Fabric and hair move slightly. Camera is handheld
but nearly still, minimal drift. No cuts, no zoom snap, continuous single take,
seamless loop. Duration 6 seconds.
```

---

### HF-01b — Taller / carpintería

**Imagen inicial**

```
Warm documentary photograph of a Paraguayan man in his thirties, mestizo with
warm brown skin, wearing a worn work apron over a plain t-shirt, standing in his
own small carpentry workshop in Asunción. He is looking down at a finished piece
of wood on the bench, quietly satisfied, sanding dust in the air. Tools hanging
on a pegboard behind him, well used and organised. Strong warm daylight entering
from a large open doorway on the right, hard-edged but warm. Warm cream and
amber palette (#F6E4CF cream, #B4762C amber, #321C04 deep brown), shallow depth
of field, 50mm lens, subtle film grain, muted saturation, calm focused mood.
Composition: subject on the right third, the lower centre and lower left of the
frame is a dark uncluttered workbench surface. 16:9 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames
```

**Movimiento**

```
Slow lateral drift to the right, very subtle. The carpenter runs his hand once
along the wood surface, then looks up briefly toward the doorway light and
half-smiles. Sawdust floats slowly through the warm light beam. Camera almost
static, gentle handheld breathing. No cuts, continuous single take, seamless
loop. Duration 6 seconds.
```

---

### HF-01c — Dueña de local gastronómico

**Imagen inicial**

```
Warm documentary photograph of a Paraguayan woman in her late twenties, warm
brown skin, hair in a loose bun, standing at the pass of her own small
restaurant kitchen in Asunción, handing a plate forward. She is smiling at
someone off camera, relaxed, mid-service. Warm steam rising, other staff blurred
in the background. Warm interior light plus daylight from a side window, golden
and slightly hazy. Warm cream and amber palette (#F6E4CF cream, #B4762C amber,
#321C04 deep brown), shallow depth of field, 35mm lens, subtle film grain, muted
saturation, warm energetic but not frantic mood. Composition: subject in the
upper right third, the lower centre of the frame falls into warm shadow and is
uncluttered. 16:9 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames
```

**Movimiento**

```
Very slow push-in. She sets the plate down, wipes her hands on her apron and
laughs at something said off camera. Steam curls upward continuously. Background
staff move softly out of focus. Camera nearly static, minimal handheld drift. No
cuts, continuous single take, seamless loop. Duration 6 seconds.
```

---

# SECCIÓN 4 · SERVICIOS — imágenes del slider

Van en `src/media.ts` → `serviceImages`. **4:3 horizontal, 1024px.**
Se muestran a ~560px con un scrim oscuro abajo y el nombre del servicio encima,
así que **dejá el tercio inferior tranquilo**.

---

### HF-02 — `sitio-a-medida` *(generá esta primero y usala como referencia)*

```
Warm documentary photograph of a Paraguayan woman in her thirties, warm brown
skin, sitting at a wooden table in her own small clothing shop in Asunción,
looking at a laptop screen with quiet satisfaction. Racks of clothes softly out
of focus behind her. A glass of tereré and a notebook on the table. Soft
directional daylight from a window on the left. Warm cream and amber palette
(#F6E4CF cream, #B4762C amber, #321C04 deep brown), shallow depth of field, 50mm
lens, subtle film grain, muted saturation, calm and unhurried mood. The laptop
screen is a soft indistinct glow with no readable content. Composition: subject
left of centre, lower third of the frame is the plain wooden table surface.
4:3 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames, readable user interface, browser window, app screenshot
```

---

### HF-03 — `google-seo`

```
Warm documentary photograph of a Paraguayan man in his late twenties standing on
a sunlit street in Asunción, holding up his phone and looking at it while
walking, searching for something. Behind him, low ochre and terracotta
storefronts and a lapacho tree, softly out of focus. Bright tropical midday
light, warm and slightly hazy. Warm cream and amber palette (#F6E4CF cream,
#B4762C amber, #321C04 deep brown), shallow depth of field, 35mm lens, subtle
film grain, muted saturation, everyday unhurried mood. The phone screen is a
soft indistinct glow with no readable content. Composition: subject right of
centre, lower third is empty sunlit pavement. 4:3 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames, readable user interface, app screenshot, map pins
```

---

### HF-04 — `whatsapp`

```
Warm documentary photograph of a Paraguayan man in his forties, warm brown skin,
short grey-flecked hair, standing in his own hardware shop in Asunción, typing a
reply on his phone with one hand while resting the other on a shelf. Relaxed
half-smile, clearly in the middle of an ordinary workday. Shelves of stock softly
out of focus. Warm daylight from the open shopfront on the right. Warm cream and
amber palette (#F6E4CF cream, #B4762C amber, #321C04 deep brown), shallow depth
of field, 50mm lens, subtle film grain, muted saturation, calm mood. The phone
screen is a soft indistinct glow with no readable content. Composition: subject
left of centre, lower third of the frame falls into soft shadow. 4:3 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames, readable user interface, chat bubbles, app screenshot, messaging
icons
```

---

### HF-05 — `fotos-textos`

```
Warm documentary photograph of a small product photography setup inside a
Paraguayan workshop: handmade leather goods arranged on a weathered wooden
surface, a simple softbox light to one side, a camera on a tripod partially in
frame. A pair of hands adjusting the arrangement, no face visible. Warm
directional light, deep soft shadows. Warm cream and amber palette (#F6E4CF
cream, #B4762C amber, #321C04 deep brown), shallow depth of field, 50mm lens,
subtle film grain, muted saturation, quiet craft mood. Composition: the setup
occupies the upper two thirds, lower third is plain wood surface falling into
shadow. 4:3 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames
```

---

### HF-06 — `hosting`

```
Warm documentary photograph of a Paraguayan woman in her twenties sitting on the
steps outside a small shop in Asunción during a work break, holding her phone
with both hands, calm and content. A thermos of tereré beside her on the step.
Warm late afternoon light, long soft shadows, ochre wall behind her. Warm cream
and amber palette (#F6E4CF cream, #B4762C amber, #321C04 deep brown), shallow
depth of field, 35mm lens, subtle film grain, muted saturation, restful mood. The
phone screen is a soft indistinct glow with no readable content. Composition:
subject right of centre, lower third is plain concrete step. 4:3 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, stock-photo grin, thumbs up,
business suits in an office tower, North American or Northern European faces,
snow, autumn foliage, pine trees, cluttered composition, collage, split screen,
borders, frames, readable user interface, app screenshot
```

---

# SECCIÓN 5 · PORTFOLIO — fondo fijo

Va en `src/media.ts` → `portfolioBackground`. **16:9, 1920px.**
Se cubre con `#160E04` al 70%: es **textura**, no protagonista. Si tiene un
punto de interés, va a pelear con las tarjetas. Que sea casi abstracto.

### HF-07

```
Abstract atmospheric photograph, extremely soft focus, of warm ochre and deep
brown adobe wall texture in Asunción at dusk, with a faint blurred suggestion of
warm window light in the distance. No subject, no recognisable object, no
horizon line. Very low contrast, deep shadow across most of the frame, warm cream
and amber palette (#F6E4CF cream, #B4762C amber, #321C04 deep brown), heavy
bokeh, subtle film grain, muted saturation, calm and dark. Evenly weighted
composition with no focal point. 16:9 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, people,
faces, hands, vehicles, buildings in focus, sharp detail, high contrast, bright
highlights, oversaturated colors, neon colors, cold blue tint, heavy HDR,
cluttered composition, collage, split screen, borders, frames
```

---

# SECCIÓN 7 · BANDA CTA

Va en `src/media.ts` → `ctaBandImage`. **16:9, 1920px.**
Encima va la frase grande en blanco con un scrim al 55%, así que la imagen tiene
que ser **oscura y de contraste bajo**, con espacio libre a la izquierda.

### HF-08

```
Warm documentary photograph, wide shot, of two Paraguayan small business
partners in their thirties standing together inside their own workshop in
Asunción at the end of the day, talking quietly, relaxed body language, seen
from a distance. Deep warm shadow fills most of the frame, one shaft of warm
late daylight from a doorway on the right catching them. Warm cream and amber
palette (#F6E4CF cream, #B4762C amber, #321C04 deep brown), 35mm lens, subtle
film grain, muted saturation, low contrast, calm end-of-day mood. Composition:
subjects small in the right third, the entire left half of the frame is dark
empty space. 16:9 horizontal.

--no text, watermark, logo, signage with letters, captions, subtitles, distorted
hands, extra fingers, deformed faces, plastic skin, waxy skin, heavy HDR,
oversaturated colors, neon colors, cold blue tint, bright highlights,
stock-photo grin, thumbs up, handshake, business suits in an office tower, North
American or Northern European faces, snow, autumn foliage, pine trees, cluttered
composition, collage, split screen, borders, frames
```

---

# SECCIÓN 5 · PORTFOLIO — esto NO se genera con IA

Las tres tarjetas de trabajos son **prueba**, no ilustración. Una captura
generada de un sitio que no existe es exactamente el tipo de cosa que un cliente
verifica y que te cuesta la venta.

Lo que va ahí:

1. Abrí el sitio real (propia.com.py, pozo.com.py, gruas.com.py).
2. Grabá la pantalla haciendo scroll lento, 6–10 segundos, 16:9, sin cursor
   visible. En Chrome: DevTools → device toolbar → grabá a 1280×720.
3. Guardá también el primer frame como `.jpg` para el `poster`.
4. Cargalos en `portfolioMedia` en `src/media.ts`.

Si un sitio no está en línea, **sacá esa entrada del arreglo `WORKS`** en
`src/components/PortfolioSection.tsx`. El diseño aguanta dos tarjetas sin
problema. No lo rellenes con un caso inventado.

---

# Manifiesto de archivos

Guardá todo en `public/media/` con estos nombres exactos y no vas a tener que
tocar el código más que para pegar la ruta.

| # | Slot | Archivo | Alt / uso |
|---|---|---|---|
| HF-01a | `heroVideos[0]` | `hero-comercio-asuncion.mp4` + `.jpg` | Comerciante paraguaya atendiendo en su local |
| HF-01b | `heroVideos[1]` | `hero-taller-carpinteria.mp4` + `.jpg` | Carpintero paraguayo en su taller |
| HF-01c | `heroVideos[2]` | `hero-gastronomia.mp4` + `.jpg` | Dueña de restaurante paraguayo en servicio |
| HF-02 | `sitio-a-medida` | `sitio-web-a-medida-paraguay.webp` | Dueña de una tienda en Asunción mirando su nuevo sitio web en una notebook |
| HF-03 | `google-seo` | `seo-local-google-asuncion.webp` | Cliente buscando un servicio local en el celular en una calle de Asunción |
| HF-04 | `whatsapp` | `whatsapp-negocio-paraguay.webp` | Comerciante paraguayo respondiendo consultas de clientes por WhatsApp en su local |
| HF-05 | `fotos-textos` | `fotos-productos-taller-paraguay.webp` | Sesión de fotos de producto en un taller paraguayo para el sitio web |
| HF-06 | `hosting` | `hosting-dominio-com-py.webp` | Sitio web paraguayo cargando rápido en un celular con datos móviles |
| HF-07 | `portfolioBackground` | `fondo-trabajos.webp` | *(decorativa, alt vacío)* |
| HF-08 | `ctaBandImage` | `equipo-negocio-paraguayo.webp` | Equipo de un negocio paraguayo trabajando en su local |

Los `alt` ya están escritos en `src/media.ts` — no hace falta que los toques.
