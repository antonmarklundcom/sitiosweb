<?php
/**
 * Enlaces de WhatsApp con mensaje prellenado por intención.
 *
 * Regla: si no hay número configurado, los botones no llevan a wa.me — apuntan
 * a #empezar, donde la home explica que el contacto está pendiente.
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';

/** Mensajes prellenados por intención. La clave se pasa desde cada página. */
const WHATSAPP_INTENTS = [
    'general' => 'Hola, quiero mi sitio web.',
    'precio' => 'Hola, quiero mi sitio web por Gs. 89.000 al mes. ¿Cómo empezamos?',
    'ejemplos' => 'Hola, vi los ejemplos en el sitio y quiero uno para mi negocio.',
    'preguntas' => 'Hola, tengo una consulta antes de empezar.',
];

function whatsapp_url(string $intent = 'general'): string
{
    if (!SITE_HAS_WHATSAPP) {
        return '#empezar';
    }

    $message = WHATSAPP_INTENTS[$intent] ?? WHATSAPP_INTENTS['general'];

    return 'https://wa.me/' . rawurlencode(SITE_WHATSAPP) . '?text=' . rawurlencode($message);
}

/**
 * Atributos extra del enlace. Solo abrimos pestaña nueva cuando el destino es
 * realmente wa.me; para el ancla interno sería un salto raro.
 */
function whatsapp_attrs(): string
{
    return SITE_HAS_WHATSAPP ? ' target="_blank" rel="noopener"' : '';
}
