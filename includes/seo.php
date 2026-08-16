<?php
/**
 * Metadatos por página.
 *
 * Cada página define $page antes de incluir head.php:
 *
 *   $page = [
 *       'title'       => 'Título propio | sitiosweb.com.py',
 *       'description' => 'Una sola intención de búsqueda por página.',
 *       'path'        => '/precios/',   // con barra final
 *   ];
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

const PAGE_DEFAULTS = [
    'title' => 'Sitios web para negocios en Paraguay | sitiosweb.com.py',
    'description' => 'Sitios web para negocios paraguayos: presencia en Google, contacto por WhatsApp, dominio y CRM.',
    'path' => '/',
    'robots' => '',
    'og_image' => '/assets/img/og-default.jpg',
    'og_type' => 'website',
    'body_class' => '',
];

function page_meta(array $page): array
{
    return array_merge(PAGE_DEFAULTS, array_filter($page, static fn ($v) => $v !== null && $v !== ''));
}

/** URL absoluta canónica a partir de una ruta interna. */
function canonical_url(string $path = '/'): string
{
    return SITE_URL . '/' . ltrim($path, '/');
}

/**
 * Un ancla de la home que también funciona desde otras páginas.
 * En la home devuelve '#precio', en el resto '/#precio'.
 */
function home_anchor(string $anchor, string $currentPath = '/'): string
{
    $anchor = '#' . ltrim($anchor, '#');

    return $currentPath === '/' ? $anchor : '/' . $anchor;
}

/** Directiva robots efectiva: staging siempre noindex. */
function robots_directive(array $page): string
{
    if (!SITE_INDEXABLE) {
        return 'noindex, nofollow';
    }

    return $page['robots'] !== '' ? $page['robots'] : 'index, follow';
}
