# Pendientes — sitiosweb.com.py

Lo que quedó asumido o vacío. Nada de esto está inventado en el sitio: cuando un
dato no se podía verificar, se omitió en vez de rellenarlo.

## 1. Datos que tenés que confirmar

| Qué | Dónde | Estado |
|---|---|---|
| WhatsApp `+595 995 628 862` | `src/site.ts` → `WHATSAPP_NUMBER` | ⚠️ tomado del número stage-1. Confirmá que es el de esta marca. |
| Email `hola@sitiosweb.com.py` | `src/site.ts` → `EMAIL` | ⚠️ asumido. Creá la casilla o cambiá la dirección. |
| RUC / factura legal | — | ❌ **no está en el sitio.** Es de las cosas que más convierten en Paraguay. Pasame el RUC y lo agrego a la banda de confianza y al schema. |
| Años en el rubro / cantidad de clientes | — | ❌ no está. No inventé ninguna cifra. Decime los números reales y los sumo. |
| Plazo de entrega ("7 días", "2 semanas"…) | — | ❌ no está. Es un diferencial fuerte si lo podés sostener. |
| Precios / rango en Gs. | — | ❌ no está. Si querés mostrar "desde Gs. X", decímelo y armo la sección con IVA declarado. |
| Reseñas reales de clientes | — | ❌ no hay sección de reseñas. Se agrega cuando tengas citas reales con nombre y ciudad. |

## 2. Trabajos del portfolio

`src/components/PortfolioSection.tsx` → arreglo `WORKS`.

Están cargados **propia.com.py**, **pozo.com.py** y **gruas.com.py**.
Confirmá cuáles están efectivamente en línea. Si alguno no lo está, **borrá esa
entrada del arreglo** — el diseño funciona bien con dos. No lo reemplaces por un
caso inventado.

Las descripciones las escribí a partir de lo que hacen esos sitios. Leelas y
corregí lo que no sea exacto.

## 3. Medios

Todo vacío hoy. El sitio **no se ve roto** sin ellos: cada slot cae a un panel de
motivo en la paleta, así que ya se lo podés mostrar a alguien. Pero con los
videos cambia de categoría.

- Prompts listos para pegar → `PROMPTS-HIGGSFIELD.md`
- Se cargan en → `src/media.ts`
- Portfolio: **capturas reales**, no IA. Ver la sección final de los prompts.

**Peso:** después de generar, comprimí antes de subir. Objetivo por clip de hero
≤ 2,5 MB, imágenes ≤ 150 KB.

```bash
# video → MP4 web (necesita ffmpeg)
ffmpeg -i entrada.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 26 \
       -preset slow -an -movflags +faststart public/media/hero-comercio-asuncion.mp4

# primer frame para el poster
ffmpeg -i public/media/hero-comercio-asuncion.mp4 -frames:v 1 -q:v 3 \
       public/media/hero-comercio-asuncion.jpg

# imagen → WebP
ffmpeg -i entrada.png -vf "scale=1024:-2" -quality 82 \
       public/media/sitio-web-a-medida-paraguay.webp
```

El `-an` saca el audio: los videos van muteados igual y el audio es peso puro.

## 4. Antes de lanzar en el dominio real

- [ ] Cargar los medios y volver a medir el peso de la página
- [ ] Confirmar WhatsApp y email
- [ ] Revisar/ajustar las entradas del portfolio
- [ ] Crear `public/og-sitiosweb.jpg` (1200×630) — hoy el `og:image` apunta a un archivo que no existe
- [ ] Lighthouse móvil ≥ 90 con los medios ya cargados
- [ ] Si conectás GA4 o Meta Pixel: poner `ANALYTICS_ENABLED = true` en `src/site.ts` (enciende el banner de consentimiento, Ley 6534/2020)
- [ ] Conectar el formulario a VenderCRM: `LEADS_ENDPOINT` en `src/site.ts`

## 5. Decisiones que tomé y conviene que sepas

**No hay banner de cookies hoy.** El sitio no escribe ninguna cookie: no hay
analytics, no hay pixel, no hay embeds de terceros. Un banner que pide permiso
para nada es ruido y baja la conversión. El componente está escrito y probado —
se enciende solo cuando pongas `ANALYTICS_ENABLED = true`. Encendelo **el mismo
día** que agregues medición, no después.

**El formulario abre WhatsApp, no manda un mail.** Con `LEADS_ENDPOINT` vacío,
al enviar se abre WhatsApp con nombre, teléfono y mensaje ya escritos. Funciona
desde el día uno y sin backend. Cuando pongas el endpoint, el lead va al CRM
*además* de abrir WhatsApp — el fallback nunca se apaga, así que un CRM caído no
te cuesta un lead.

**Cada link de WhatsApp lleva de dónde salió** (`hero`, `servicios`, `fab`,
`barra-movil`…). En un sitio estático esa es toda tu atribución: cuando alguien
escribe, ves en el mensaje qué sección lo convenció.

**Todos los CTA tienen `data-ev` / `data-ev-loc`.** El shim de `index.html` no
carga nada ni manda nada, solo acumula los clicks en `window.__ev`. Conectar GA4
más adelante es una línea, no re-etiquetar el sitio entero.
