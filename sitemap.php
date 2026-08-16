<?php
/**
 * Sitemap XML generado desde una lista única de rutas públicas.
 * Se sirve en /sitemap.xml vía rewrite (ver .htaccess).
 *
 * Regla: solo entran páginas indexables. Las legales están en noindex mientras
 * sean placeholders, así que quedan fuera hasta tener texto real.
 */

declare(strict_types=1);

require_once __DIR__ . '/includes/config.php';

/** ruta => archivo del que se toma la fecha de última modificación */
const SITEMAP_ROUTES = [
    '/' => 'index.php',
];

header('Content-Type: application/xml; charset=utf-8');

echo '<?xml version="1.0" encoding="UTF-8"?>', PHP_EOL;
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">', PHP_EOL;

foreach (SITEMAP_ROUTES as $path => $file) {
    $fullPath = __DIR__ . '/' . $file;
    $lastmod = is_file($fullPath) ? date('Y-m-d', (int) filemtime($fullPath)) : date('Y-m-d');

    echo '  <url>', PHP_EOL;
    echo '    <loc>', e(SITE_URL . $path), '</loc>', PHP_EOL;
    echo '    <lastmod>', $lastmod, '</lastmod>', PHP_EOL;
    echo '  </url>', PHP_EOL;
}

echo '</urlset>', PHP_EOL;
