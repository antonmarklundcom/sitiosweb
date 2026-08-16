<?php
/**
 * Home de sitiosweb.com.py.
 *
 * El contenido vive en includes/content.php; acá solo está el marcado.
 * El pase de diseño de design/IMPLEMENTATION-NOTES.md todavía no está portado
 * (ver PLAN.md, fase 2).
 */

declare(strict_types=1);

require_once __DIR__ . '/includes/config.php';

$page = [
    'title' => 'Sitios web para negocios en Paraguay | sitiosweb.com.py',
    'description' => 'Sitios web para negocios paraguayos: presencia en Google, contacto por WhatsApp, dominio y CRM. Desde Gs. 89.000 al mes.',
    'path' => '/',
];

$preloadHero = true;

require_once __DIR__ . '/includes/schema.php';

$schema = [
    schema_organization(),
    schema_service(),
    schema_faq(SITE_FAQS),
];

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/header.php';
?>

    <main id="contenido">
        <section class="hero" id="inicio" data-hero>
            <div class="hero-background" aria-hidden="true"></div>
            <div class="hero-scrim" aria-hidden="true"></div>

            <div class="hero-copy">
                <p class="kicker">Sitios web para negocios en Paraguay</p>
                <h1>Tu negocio en Google <span>y respondiendo en WhatsApp</span></h1>
                <p class="hero-lede">Sitio web, dominio y CRM. Desde Gs.&nbsp;89.000 al mes, facturado anualmente.</p>
                <div class="hero-actions">
                    <a class="button button-ghost" href="#ejemplos">Ver ejemplos</a>
                    <a class="button button-primary" href="#empezar">Empezar <span aria-hidden="true">↗</span></a>
                </div>
            </div>

            <div class="showcase" id="ejemplos" data-carousel tabindex="0" aria-label="Ejemplos conceptuales de sitios web. Usá las flechas izquierda y derecha para navegar.">
                <p class="showcase-label">Ejemplos de dirección visual <span>— conceptos, no trabajos de clientes</span></p>
                <div class="showcase-stage">
<?php foreach (SITE_EXAMPLES as $index => $example): ?>
                    <article class="site-card <?= e($example['class']) ?>" data-card aria-label="<?= e($example['title']) ?>">
                        <div class="mobile-shot" aria-hidden="true"></div>
                        <div class="site-card-caption">
                            <span>Concepto <?= str_pad((string) ($index + 1), 2, '0', STR_PAD_LEFT) ?> / <?= e($example['category']) ?></span>
                            <strong><?= e($example['title']) ?></strong>
                        </div>
                    </article>
<?php endforeach; ?>
                </div>
                <div class="carousel-controls" aria-label="Controles del carrusel">
                    <button type="button" data-carousel-prev aria-label="Ejemplo anterior">←</button>
                    <button type="button" data-carousel-pause aria-label="Pausar carrusel" aria-pressed="false">Pausa</button>
                    <button type="button" data-carousel-next aria-label="Ejemplo siguiente">→</button>
                </div>
            </div>
            <span class="scroll-cue" aria-hidden="true"></span>
        </section>

        <section class="problem section-paper">
            <div class="split-copy">
                <h2 data-reveal>Tu negocio existe. <span>En Google, no.</span></h2>
                <div class="problem-lines">
                    <p data-reveal>Alguien busca desde el celular lo que vos vendés, ahora mismo.</p>
                    <p data-reveal>Encuentra primero a un competidor que sí aparece.</p>
                    <p data-reveal>Le escribe por WhatsApp a él, no a vos.</p>
                </div>
            </div>
        </section>

        <section class="section-stone" id="incluye">
            <div class="section-inner">
                <div class="section-heading" data-reveal>
                    <p class="kicker">El paquete esencial</p>
                    <h2>Qué incluye</h2>
                </div>
                <div class="feature-grid">
<?php foreach (SITE_INCLUDED as [$number, $label, $title, $copy, $class]): ?>
                    <article class="feature-card <?= e($class) ?>" data-reveal>
                        <span class="meta"><?= e($number) ?> / <?= e($label) ?></span>
                        <h3><?= e($title) ?></h3>
                        <p><?= e($copy) ?></p>
                    </article>
<?php endforeach; ?>
                </div>
            </div>
        </section>

        <section class="section-paper" id="como">
            <div class="section-inner">
                <div class="section-heading" data-reveal>
                    <p class="kicker">Del mensaje a la publicación</p>
                    <h2>Cómo funciona</h2>
                </div>
                <div class="steps">
<?php foreach (SITE_STEPS as [$number, $title, $copy, $note]): ?>
                    <article data-reveal>
                        <span><?= e($number) ?></span>
                        <h3><?= e($title) ?></h3>
                        <p><?= e($copy) ?></p>
<?php if ($note !== ''): ?>
                        <small><?= e($note) ?></small>
<?php endif; ?>
                    </article>
<?php endforeach; ?>
                </div>
            </div>
        </section>

        <section class="section-stone pricing-section" id="precio">
            <div class="price-card" data-reveal>
                <p class="meta">Precio</p>
                <div class="price"><strong><?= e(SITE_PRICE['amount']) ?></strong><span><?= e(SITE_PRICE['period']) ?></span></div>
                <p><?= e(SITE_PRICE['note']) ?></p>
                <ul>
<?php foreach (SITE_PRICE['includes'] as $item): ?>
                    <li><?= e($item) ?></li>
<?php endforeach; ?>
                </ul>
                <a class="button button-primary price-button" href="<?= e(whatsapp_url('precio')) ?>"<?= whatsapp_attrs() ?>>Empezar por WhatsApp <span aria-hidden="true">↗</span></a>
                <p class="human-note">Te responde una persona y te hace tres o cuatro preguntas sobre tu negocio.</p>
            </div>
        </section>

        <section class="section-paper fit-section">
            <div class="fit-grid">
                <article data-reveal>
                    <p class="kicker">Esto es para vos</p>
                    <h2>Ideal si...</h2>
                    <ul class="check-list">
<?php foreach (SITE_FIT_YES as $item): ?>
                        <li><?= e($item) ?></li>
<?php endforeach; ?>
                    </ul>
                </article>
                <article class="not-yet" data-reveal>
                    <p class="kicker">Otro tipo de proyecto</p>
                    <h2>Todavía no, si...</h2>
                    <ul class="check-list">
<?php foreach (SITE_FIT_NO as $item): ?>
                        <li><?= e($item) ?></li>
<?php endforeach; ?>
                    </ul>
                </article>
            </div>
        </section>

        <section class="section-stone faq-section" id="preguntas">
            <div class="faq-wrap">
                <div class="section-heading" data-reveal>
                    <p class="kicker">Antes de empezar</p>
                    <h2>Preguntas</h2>
                </div>
<?php foreach (SITE_FAQS as $index => [$question, $answer]): ?>
                <details data-reveal<?= $index === 0 ? ' open' : '' ?>>
                    <summary><?= e($question) ?><span aria-hidden="true"></span></summary>
                    <p><?= e($answer) ?></p>
                </details>
<?php endforeach; ?>
            </div>
        </section>

        <section class="final-cta" id="empezar">
            <div data-reveal>
                <p class="kicker">El próximo paso es simple</p>
                <h2>Empecemos hoy</h2>
                <p>Contanos qué hace tu negocio y te decimos qué diría tu sitio.</p>
<?php if (SITE_HAS_WHATSAPP): ?>
                <a class="button button-primary" href="<?= e(whatsapp_url('general')) ?>" target="_blank" rel="noopener">Empezar por WhatsApp <span aria-hidden="true">↗</span></a>
<?php else: ?>
                <div class="contact-status" role="note">
                    <span>Contacto pendiente</span>
                    <p>Agregá el número real en <code>SITE_WHATSAPP</code> para activar los botones antes de publicar.</p>
                </div>
<?php endif; ?>
            </div>
        </section>
    </main>

<?php require __DIR__ . '/includes/footer.php';
