<?php
/**
 * JSON-LD. Todo sale de includes/content.php y includes/config.php, nunca
 * escrito a mano en la plantilla, para que el marcado no se desincronice de lo
 * que la página realmente dice.
 *
 * Solo se declara lo que está confirmado: sin dirección, sin RUC, sin teléfono
 * y sin precio hasta que el dueño los confirme.
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/content.php';

function schema_organization(): array
{
    $node = [
        '@type' => 'ProfessionalService',
        '@id' => SITE_URL . '/#organization',
        'name' => SITE_NAME,
        'url' => SITE_URL . '/',
        'description' => 'Sitios web para negocios locales en Paraguay, con dominio, hosting y contacto por WhatsApp.',
        'areaServed' => ['@type' => 'Country', 'name' => 'Paraguay'],
        'inLanguage' => 'es-PY',
    ];

    if (SITE_LEGAL_NAME !== '') {
        $node['legalName'] = SITE_LEGAL_NAME;
    }

    if (SITE_HAS_WHATSAPP) {
        $node['telephone'] = '+' . SITE_WHATSAPP;
    }

    if (SITE_EMAIL !== '') {
        $node['email'] = SITE_EMAIL;
    }

    return $node;
}

function schema_service(): array
{
    $node = [
        '@type' => 'Service',
        '@id' => SITE_URL . '/#servicio',
        'name' => 'Sitio web para negocios en Paraguay',
        'serviceType' => 'Diseño y publicación de sitios web',
        'provider' => ['@id' => SITE_URL . '/#organization'],
        'areaServed' => ['@type' => 'Country', 'name' => 'Paraguay'],
    ];

    // El importe solo se declara cuando el precio está cerrado.
    if (SITE_PRICE['confirmed']) {
        $node['offers'] = [
            '@type' => 'Offer',
            'price' => (string) SITE_PRICE['value'],
            'priceCurrency' => SITE_PRICE['currency'],
            'url' => SITE_URL . '/#precio',
        ];
    }

    return $node;
}

/** FAQPage a partir del mismo arreglo que renderiza la sección Preguntas. */
function schema_faq(array $faqs): array
{
    return [
        '@type' => 'FAQPage',
        '@id' => SITE_URL . '/#preguntas',
        'mainEntity' => array_map(static fn (array $faq) => [
            '@type' => 'Question',
            'name' => $faq[0],
            'acceptedAnswer' => ['@type' => 'Answer', 'text' => $faq[1]],
        ], $faqs),
    ];
}

/** $trail: [['name' => 'Inicio', 'path' => '/'], ...] */
function schema_breadcrumbs(array $trail): array
{
    $items = [];
    foreach ($trail as $i => $crumb) {
        $items[] = [
            '@type' => 'ListItem',
            'position' => $i + 1,
            'name' => $crumb['name'],
            'item' => SITE_URL . '/' . ltrim($crumb['path'], '/'),
        ];
    }

    return ['@type' => 'BreadcrumbList', 'itemListElement' => $items];
}

/** Imprime todos los nodos en un solo bloque @graph. */
function render_schema(array $nodes): void
{
    if ($nodes === []) {
        return;
    }

    $graph = ['@context' => 'https://schema.org', '@graph' => array_values($nodes)];

    echo '<script type="application/ld+json">',
        json_encode($graph, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE),
        '</script>', PHP_EOL;
}
