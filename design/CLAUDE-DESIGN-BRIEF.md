# Claude Design brief — sitiosweb.com.py

## Your role

Act as a senior web art director. Improve the supplied homepage visually in Claude Design. This is a design pass, not a production-code rewrite.

Treat `homepage-preview.html` as the current visual source of truth. Inspect it at desktop and mobile widths before proposing changes. The PHP file exists for implementation context, but Claude Design should not attempt to execute PHP.

## Business and audience

`sitiosweb.com.py` sells affordable websites to Paraguayan local-business owners who want to appear on Google and receive more WhatsApp enquiries. The audience primarily visits on Android phones. The language is Paraguayan Spanish with natural voseo.

The page's single job is to make a local-business owner understand the offer and start a WhatsApp conversation.

## Current design system

- Display/body: Instrument Sans.
- Utility labels: JetBrains Mono.
- Ink: `#14150F`.
- Paper: `#F7F5F2`.
- Stone: `#EBE7DF`.
- Conversion accent: `#C8F04A`.
- Hero: dark but positive Paraguayan blue-hour street with lapacho, tropical greenery and warm storefront light.
- Signature element: a depth carousel of six Spanish-market mobile website concepts.
- Visual character: adult, editorial, highly legible, locally grounded and optimistic.

## Preserve

- The central promise: “Tu negocio en Google / y respondiendo en WhatsApp”.
- Large mobile touch targets and WhatsApp-first conversion.
- Warm ivory/stone sections below the hero.
- The six sector concepts: dental, architecture, Paraguayan gastronomy, accounting, construction and beauty.
- Explicit conceptual-work labeling. These are not real client projects.
- One strong interaction system in the hero; restrained motion elsewhere.
- Responsive behavior without horizontal overflow.

## Improve

- Refine hero composition, headline rhythm, carousel depth and mobile cropping.
- Make the portfolio concepts feel premium and clearly mobile-first.
- Improve hierarchy and transitions between hero, problem, offer, process, price, qualification, FAQ and final CTA.
- Keep the page distinctive without adding generic SaaS cards, fake statistics, flags, testimonials, awards or decorative clutter.
- Maintain adequate contrast and respect reduced-motion settings.

## Factual guardrails

Do not invent clients, results, reviews, staff, an address, RUC, credentials, guarantees or contact details. Treat the displayed price, annual billing, seven-day delivery, VenderCRM and Google Business inclusions as supplied draft claims that require owner confirmation before public launch.

## Required output

1. A new self-contained Claude Design `.dc.html` artifact representing the improved homepage.
2. Desktop and mobile compositions from one responsive design system, not two unrelated pages.
3. A short `IMPLEMENTATION-NOTES.md` listing exact changes Claude Code must transfer into PHP/CSS/JS.
4. Do not claim the `.dc.html` file is deployable production HTML. Preserve the existing PHP project as the implementation target.
