# IMPLEMENTATION-NOTES.md

Design pass on the sitiosweb.com.py homepage. Artifact: `Homepage sitiosweb.dc.html`
(Claude Design component — **not** deployable production HTML). The PHP project in
`uploads/sitiosweb-com-py-claude-handoff/` remains the implementation target: transfer the
changes below into `index.php`, `assets/css/site.css` and `assets/js/site.js`.

Copy preserved verbatim. Design system unchanged (Instrument Sans / JetBrains Mono, ink
`#14150F`, paper `#F7F5F2`, stone `#EBE7DF`, acid `#C8F04A`). No clients, results, reviews,
contact details or guarantees were added.

---

## 1. Header

- `position: fixed` → `position: sticky; top: 0`, with the hero pulled up by `margin-top: -66px`.
  Same floating-over-hero look, but no fixed-position layer, so mobile browser chrome and the
  sticky CTA can't fight it.
- Desktop nav gets `white-space: nowrap` and `font-size: .68rem` / `letter-spacing: .12em`
  (nav items were wrapping to two lines between ~880–1000px).
- Mobile menu is now full-width (`left`/`right` inset instead of `right: 16px; min-width: 210px`),
  rows are 52px tall, and it ends with an acid "Empezar por WhatsApp" row — the mobile header
  previously had no CTA at all (`.header-cta { display:none }` below 720px).

## 2. Hero

- Layout is a two-row grid (`auto` copy / `1fr` showcase) at `min-height: 100svh`, so the
  showcase gets the leftover height instead of hanging off the bottom edge.
- Headline: `max-width: 19ch`, `clamp(2.45rem, 6.2vw, 5rem)`, `line-height: .9`. Keeps the
  promise on two lines from 360px to 1600px.
- Kicker gains a 22px acid rule before the label.
- Scrim rebuilt: radial vignette + a vertical gradient that resolves to solid `#0E1723` at the
  bottom, so the hero hands off to the next section instead of ending on a hard image cut.
  Delete the unused `.signal`, `.horizon`, `.browser-ghost` and `.mini-*` rules from `site.css` —
  no markup references them.
- `.scroll-cue` removed. It sat on top of the carousel controls at small heights.

## 3. Concept carousel (the main change)

- **Cards are sized by JS, not by CSS.** `layout()` measures the stage and derives
  `cardH = stageHeight - 6`, `cardW = cardH * 9/16`, capped at `min(250px, 20vw)` desktop /
  `56vw` mobile. Replaces `bottom: clamp(-150px, -15svh, -92px)`, which cropped the phones by an
  arbitrary amount and cropped differently on every screen height. Phones now always show the
  full 9:16 concept.
- **Snap motion instead of continuous drift.** `position` eases toward an integer `target`
  (`pos += (target - pos) * min(1, dt/260)`); autoplay advances the target every 4200ms. Cards
  settle, so the concept screenshots are actually readable. Prev/next/dots set `target`.
- **Captions moved out of the cards.** The per-card caption plus its `::after` dark gradient
  covered the bottom 56% of every concept. There is now one caption line under the stage
  (`aria-live="polite"`) showing the active concept's tag and name. Remove `.site-card::after`
  and `.site-card-caption`.
- **Sprite scroll on the active card only:** active card's shot animates
  `background-position-y: 0% → 68%` over 6s; others reset to `0%`. Previously hover-only, which
  never fires on Android.
- **Controls:** one row under the stage — label left, six progress dots + prev / next / pause
  right. All buttons are 44×44 minimum. The pause button is no longer hidden below 860px
  (it was `display: none`, leaving touch users no way to stop the motion).
- **Swipe:** pointerdown/pointerup on the carousel, ±40px threshold → one step.
- Keyboard (←/→), `tabindex="0"`, `aria-roledescription="carousel"`, and per-card `aria-hidden` /
  `tabindex=-1` for off-screen cards are kept from the current JS.
- Cards are `<button>` elements now (click a side card to bring it to front).

## 4. Sections below the hero

- All grids move to `repeat(auto-fit, minmax(Npx, 1fr))`, so the 860/720/390 breakpoints are no
  longer needed for layout — only for the nav and the sticky bar.
- **"Tu negocio existe"**: the three lines become a hairline-ruled sequence with mono `01/02/03`
  markers; first line stays full ink, the other two at 62%.
- **"Qué incluye"**: the four bordered `.feature-card` boxes are replaced by four full-width
  hairline rows (meta + heading left, body right). Removes the SaaS-card look, removes the
  `min-height: 280px` empty space, and reads as one list on mobile.
- **"Cómo funciona"**: unchanged structure; the "Referencia: 7 días hábiles" note becomes a
  pill so it stops reading as body copy.
- **Precio**: the amount is `white-space: nowrap` with `clamp(2.2rem, 7.5vw, 5rem)` / `line-height: 1` — at 360–430px the old `2.6rem` minimum wrapped "Gs. 89.000" onto two lines and collided with the line below. Single plate, two columns — price + CTA left, inclusion list right. Drops the
  `box-shadow: 0 28px 80px` centred card. Added a mono line at the end of the list:
  "Precio y alcance a confirmar antes de publicar" (the brief flags price, annual billing,
  7-day delivery, VenderCRM and Google Business as unconfirmed draft claims).
- **Ideal si / Todavía no**: unchanged content, hairline rows, 16px vertical padding.
- **Preguntas**: the first question stays open by default (`open`); `summary` is now `min-height: 64px` (was ~24px padding, below the 44px target)
  and the toggle is a "+" glyph rotated 45° when open (`details[open] > summary > span[data-toggle] { transform: rotate(45deg) }`) instead of two absolutely-positioned pseudo-element bars.
- **Empecemos hoy**: unchanged, including the "Contacto pendiente" note.

## 5. New: sticky mobile CTA bar

Below 860px, a sticky bottom bar ("Desde Gs. 89.000 /mes" + acid "Escribir" button → `#empezar`).
Implemented as `position: sticky; bottom: 0` on the last body child, with
`padding-bottom: calc(10px + env(safe-area-inset-bottom))`. This is the one addition that isn't a
refinement of existing content — it exists because the mobile header has no CTA and the price and
final CTA are several screens apart. Drop it if you'd rather not carry it.

## 6. Fluid scale — note for the CSS port

In the artifact the root wrapper is a size container (`container-type: inline-size`) and every
fluid `clamp()` uses `cqi` instead of `vw`, so the built-in `preview: "mobile"` (390px) mode
renders the true mobile composition inside a desktop window. **In production, `vw` is equivalent
and simpler** — the page always fills the viewport. Port the clamps as `vw` and keep the values:

- h1 `clamp(2.45rem, 6.2vw, 5rem)`, max-width 19ch
- section h2 `clamp(2.3rem, 5.4vw, 4.6rem)`
- final CTA h2 `clamp(2.8rem, 9vw, 6.6rem)`
- section padding `clamp(76px, 11vw, 148px) clamp(16px, 3vw, 34px)`

Second headline line uses a non-breaking space in "y respondiendo" so "y" never orphans.

## 7. Motion / accessibility

- Reveal-on-scroll is unchanged in behaviour, but elements start visible and are only hidden by JS
  if they are below 92% of the viewport on load — no above-the-fold flash, and no invisible content
  if JS fails.
- `prefers-reduced-motion`: autoplay off, carousel starts paused, reveals disabled, sprite scroll
  disabled by the global transition override.
- Focus ring `#77951B` and the skip link should be carried over as-is (the skip link is not in the
  design artifact; keep it in the PHP).

## 8. Still open for the owner

Real WhatsApp number (`SITE_WHATSAPP`), confirmation of the price, annual billing, 7-day
reference, VenderCRM and Google Business inclusions, and the legal/policy footer links.
