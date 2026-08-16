# Claude Code implementation brief — sitiosweb.com.py

## Objective

Continue the supplied standalone PHP 8.x website into a complete, SEO-ready, Hostinger-compatible public site. Implement and verify rather than only advise.

## Existing implementation

- `index.php` is the real homepage.
- `homepage-preview.html` is a generated static visual handoff, not the production source.
- `assets/css/site.css` contains the responsive design system.
- `assets/js/site.js` contains menu, reveal and carousel behavior.
- WebP hero and carousel assets are under `assets/img/`.
- `.htaccess` contains the initial Apache defaults.
- `tools/preview-server.mjs` exists only for dependency-free visual preview when PHP is unavailable.

Preserve PHP, server-rendered HTML and lightweight vanilla JavaScript. Do not migrate this project to React, Next.js, Tailwind or a database unless the owner explicitly changes the scope.

## First implementation milestone

Refactor shared layout/configuration and build these routes:

- `/`
- `/servicios/`
- `/servicios/paginas-web/`
- `/servicios/seo-local/`
- `/servicios/google-business/`
- `/servicios/vendercrm/`
- `/trabajos/`
- `/trabajos/[proyecto]/`
- `/planes/`
- `/proceso/`
- `/nosotros/`
- `/contacto/`
- `/preguntas/`
- `/privacidad/`
- `/terminos/`
- custom `/404.php`

Use reusable PHP includes such as `includes/config.php`, `includes/header.php`, `includes/footer.php`, `includes/seo.php` and `includes/schema.php`. Update the homepage navigation from section-only anchors to appropriate real pages while preserving useful same-page links.

## SEO requirements

- `<html lang="es-PY">` and Paraguayan Spanish/voseo.
- One useful search intent per page; no thin city doorway pages.
- Unique title, description, canonical URL and one H1 per page.
- Open Graph/Twitter metadata and a real social image.
- Organization or ProfessionalService JSON-LD; Service, BreadcrumbList and FAQPage schema where applicable.
- Public `robots.txt`, XML sitemap and clean trailing-slash URLs.
- Descriptive internal links among services, projects, plans and contact.
- Custom 404 behavior and redirect checks.
- Indexable public pages by default; do not add `noindex` or block crawling unless explicitly requested for staging.
- Keep above-the-fold transfer light; ship WebP/AVIF and exclude unused source PNGs from the deployment ZIP.

## Conversion requirements

- Configure the real WhatsApp number in one server-side configuration location.
- Use intent-specific prefilled messages per page.
- Keep credentials and VenderCRM API calls server-side.
- If a form is implemented, use a site-owned PHP endpoint with validation, CSRF protection, rate limiting, consent copy and clear success/error states.
- Capture source page and campaign parameters before forwarding a lead.

## Content and truth rules

Do not fabricate clients, results, reviews, business identity, RUC, address, phone number, guarantees or credentials. Keep conceptual portfolio entries visibly labeled “Proyecto conceptual”. Do not publish pending legal/contact text as confirmed fact.

The owner must confirm before public launch:

- WhatsApp number and email.
- Operator/business name and RUC.
- Service area and support hours.
- Gs. 89.000 price and annual billing terms.
- Seven-day delivery statement.
- VenderCRM and Google Business inclusions.
- Domain ownership, cancellation and content-change terms.
- Privacy-controller identity and lead-data handling.

## Verification and delivery

Before calling the project complete:

1. Run PHP lint on every PHP file using PHP 8.x.
2. Verify every route returns the intended status, one H1, unique metadata and valid internal targets.
3. Verify sitemap URLs and robots directives.
4. Validate JSON-LD parsing.
5. Inspect 360, 390, 768, 1024 and 1440px widths; confirm `scrollWidth === clientWidth`.
6. Test menu, carousel, FAQ, WhatsApp and form behavior with keyboard and reduced motion.
7. Check console/network errors and actual asset responses.
8. Build a Hostinger ZIP with root `index.php`/`.htaccess`, forward-slash entries and no wrapper folder, source PNGs, local tools or preview-only files.
9. Separate local validation from live Hostinger, DNS, HTTPS, email/CRM receipt and public-indexing verification.

Start by auditing the supplied files and reporting any conflict with this brief. Then implement the shared PHP architecture and the first milestone completely.
