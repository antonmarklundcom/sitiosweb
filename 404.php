<?php
/** Página 404. Se sirve vía ErrorDocument en .htaccess con status 404 real. */

declare(strict_types=1);

require_once __DIR__ . '/includes/config.php';

http_response_code(404);

$page = [
    'title' => 'Página no encontrada | sitiosweb.com.py',
    'description' => 'La página que buscabas no existe o cambió de dirección.',
    'path' => '/404/',
    'robots' => 'noindex, nofollow',
];

require __DIR__ . '/includes/head.php';
require __DIR__ . '/includes/header.php';
?>

    <main id="contenido" class="legal-page">
        <section class="section-paper">
            <div class="section-inner legal-inner">
                <p class="kicker">Error 404</p>
                <h1>Esta página no existe</h1>
                <p>Puede que el enlace esté mal escrito o que la página haya cambiado de dirección.</p>
                <p><a class="button button-primary" href="/">Volver al inicio <span aria-hidden="true">↗</span></a></p>
            </div>
        </section>
    </main>

<?php require __DIR__ . '/includes/footer.php';
