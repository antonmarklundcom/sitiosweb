# Prompt for Claude Code — sitiosweb.com.py

Paste everything below the line into Claude Code, in the project folder that contains
`index.php`, `assets/` and `tools/`. Drop `Homepage sitiosweb.dc.html`,
`IMPLEMENTATION-NOTES.md` and `screenshots/homepage-full.png` into that folder first.

---

You are working on `sitiosweb.com.py`, a PHP 8.x site on Hostinger that sells affordable
websites to Paraguayan local businesses. Spanish (es-PY, voseo). The audience is on Android
phones. The site's job is to start a WhatsApp conversation.

Read these first, in order:

1. `CLAUDE-CODE-BRIEF.md` — the existing implementation brief.
2. `IMPLEMENTATION-NOTES.md` — the design pass I'm asking you to port. It lists every change
   section by section.
3. `Homepage sitiosweb.dc.html` — the updated homepage design. **This is a visual reference
   only.** It is a Claude Design component (React-flavoured template + logic class, inline
   styles, container queries). Do not copy it into the project, do not run it, do not treat it
   as production HTML. Read it to see the intended markup order, spacing, type scale and
   carousel behaviour, then write ordinary PHP/CSS/JS.
4. `screenshots/homepage-full.png` — the mobile composition end to end.

The production source of truth stays `index.php` + `assets/css/site.css` + `assets/js/site.js`.
Keep the current architecture. No framework, no build step, no npm.

## Task 1 — port the design pass

Transfer the changes in `IMPLEMENTATION-NOTES.md` into the PHP homepage. Notes:

- Section 6 of the notes explains that the artifact uses `cqi` units so its 390px preview mode
  works. **In production use `vw`** with the same clamp values. Do not add `container-type`.
- The carousel rewrite is the substantial piece: JS-measured card sizing, snap-to-index easing
  instead of continuous drift, captions moved out of the cards, sprite scroll on the active card,
  swipe, and 44px controls. Port `layout()`, `tick()`, `nudge()`, `goTo()` and `syncActive()` from
  the artifact's logic class into plain DOM code in `site.js`, keeping the existing
  progressive-enhancement pattern (`js-ready`, reveal observer, reduced-motion guards).
- Delete the dead CSS the notes list: `.signal`, `.horizon`, `.browser-ghost`, `.mini-*`,
  `.site-card::after`, `.site-card-caption`, `.scroll-cue`.
- Keep the skip link, the focus ring `#77951B`, and every Spanish string exactly as written.

When done, run `tools/preview-server.mjs` and check 360px, 390px, 430px, 768px and 1440px for
horizontal overflow and for the price line wrapping.

## Task 2 — performance

Split `assets/img/mobile-sites-spanish-sprite-v1.webp` (486 KB) into six separate WebP files and
lazy-load them. Right now every visitor downloads all six concepts before the hero settles, on
mobile data. Keep the hero WebP preloaded with `fetchpriority="high"`.

## Task 3 — structured data and legal pages

- `FAQPage` JSON-LD generated from the same PHP array that renders the FAQ, so they can't drift.
- `Organization` / `Service` JSON-LD on the homepage.
- Stub `terminos.php` and `privacidad.php` using the existing section styles, and link them in the
  footer. Leave the legal text as clearly-marked placeholders — do not write terms.

## Task 4 — multi-page architecture (plan before you build)

The site is moving from a one-pager to roughly ten pages: Inicio, six rubro pages (dentista,
contador, constructora, restaurante, salón de belleza, arquitecto), Precios, Cómo funciona,
Contacto, plus the two legal pages. Rubro pages are the SEO targets; each reuses the existing
design system and one of the six existing concept images.

Navigation: keep four top-level links plus the WhatsApp CTA, with "Rubros" as a dropdown.
On mobile, replace the current dropdown panel with a full-screen sheet with the WhatsApp CTA
pinned at the bottom.

**Build the shared layout, the new navigation, and ONE rubro page as a template. Stop there and
show me before writing the other five.** Propose the routing and partials approach (front
controller vs. flat files, how `head`, `header`, `footer` and the WhatsApp button are shared)
before you start editing.

## Guardrails — do not violate these

- Never invent clients, results, reviews, testimonials, staff, an address, RUC, credentials,
  guarantees or contact details.
- The price, annual billing, 7-day delivery, VenderCRM and Google Business inclusions are
  unconfirmed draft claims. Keep them as-is; do not embellish them.
- `SITE_WHATSAPP` has no real number yet. Leave the pending-contact note in place until it does.
- Concept sites stay explicitly labelled as concepts, not client work.
- No new fonts, colours, gradients, icons, stock imagery or decorative elements. Ink `#14150F`,
  paper `#F7F5F2`, stone `#EBE7DF`, acid `#C8F04A`, Instrument Sans, JetBrains Mono.
