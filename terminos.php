<?php
/**
 * PLACEHOLDER. Las condiciones reales las define el dueño del sitio.
 * No redactar términos vinculantes acá.
 */

declare(strict_types=1);

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/schema.php';

$page = [
    'title' => 'Términos del servicio | sitiosweb.com.py',
    'description' => 'Condiciones del servicio de sitios web de sitiosweb.com.py.',
    'path' => '/terminos/',
    'robots' => 'noindex, follow', // Sin texto real todavía; no tiene sentido indexarla.
];

$schema = [
    schema_organization(),
    schema_breadcrumbs([
        ['name' => 'Inicio', 'path' => '/'],
        ['name' => 'Términos', 'path' => '/terminos/'],
    ]),
];

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/header.php';
?>

    <main id="contenido" class="legal-page">
        <section class="section-paper">
            <div class="section-inner legal-inner">
                <p class="kicker">Legales</p>
                <h1>Términos del servicio</h1>

                <div class="contact-status" role="note">
                    <span>Texto pendiente</span>
                    <p>Esta página todavía no tiene el texto definitivo. No la enlaces como condiciones vigentes hasta completarla.</p>
                </div>

                <h2>Qué falta definir</h2>
                <ul class="check-list">
                    <li>Razón social, RUC y datos de facturación del prestador.</li>
                    <li>Precio, moneda, IVA y condiciones de la facturación anual.</li>
                    <li>Qué incluye y qué no incluye el servicio mensual.</li>
                    <li>Plazo de entrega y qué pasa si el cliente demora los materiales.</li>
                    <li>Titularidad del dominio y del contenido, y cómo se transfiere.</li>
                    <li>Cancelación, renovación y política de reembolsos.</li>
                    <li>Límite de cambios de contenido incluidos.</li>
                </ul>
            </div>
        </section>
    </main>

<?php require __DIR__ . '/includes/footer.php';
