<?php
/**
 * PLACEHOLDER. El texto real de la política lo tiene que definir el dueño del
 * sitio (identidad del responsable, qué datos se guardan, por cuánto tiempo,
 * con quién se comparten y cómo se ejerce la baja). No redactar términos acá.
 */

declare(strict_types=1);

require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/schema.php';

$page = [
    'title' => 'Política de privacidad | sitiosweb.com.py',
    'description' => 'Cómo se tratan los datos de contacto de quienes escriben a sitiosweb.com.py.',
    'path' => '/privacidad/',
    'robots' => 'noindex, follow', // Sin texto real todavía; no tiene sentido indexarla.
];

$schema = [
    schema_organization(),
    schema_breadcrumbs([
        ['name' => 'Inicio', 'path' => '/'],
        ['name' => 'Privacidad', 'path' => '/privacidad/'],
    ]),
];

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/header.php';
?>

    <main id="contenido" class="legal-page">
        <section class="section-paper">
            <div class="section-inner legal-inner">
                <p class="kicker">Legales</p>
                <h1>Política de privacidad</h1>

                <div class="contact-status" role="note">
                    <span>Texto pendiente</span>
                    <p>Esta página todavía no tiene el texto definitivo. No la enlaces como política vigente hasta completarla.</p>
                </div>

                <h2>Qué falta definir</h2>
                <ul class="check-list">
                    <li>Identidad y datos de contacto del responsable del tratamiento.</li>
                    <li>Qué datos se recogen cuando alguien escribe por WhatsApp o completa un formulario.</li>
                    <li>Para qué se usan y por cuánto tiempo se conservan.</li>
                    <li>Con qué servicios se comparten (VenderCRM, hosting, analítica).</li>
                    <li>Cómo se pide la baja o la eliminación de los datos.</li>
                    <li>Uso de cookies y de herramientas de medición, si las hubiera.</li>
                </ul>
            </div>
        </section>
    </main>

<?php require __DIR__ . '/includes/footer.php';
