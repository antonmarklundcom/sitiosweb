<?php
/**
 * Configuración central del sitio.
 *
 * Precedencia de valores: includes/config.local.php  →  variable de entorno  →  default.
 * En Hostinger lo más simple es copiar config.local.example.php a config.local.php
 * y editar ahí. Ese archivo no se versiona (ver .gitignore).
 */

declare(strict_types=1);

$GLOBALS['SITE_OVERRIDES'] = is_file(__DIR__ . '/config.local.php')
    ? (array) require __DIR__ . '/config.local.php'
    : [];

/** Lee un valor de configuración con la precedencia descrita arriba. */
function cfg(string $key, string $default = ''): string
{
    $overrides = $GLOBALS['SITE_OVERRIDES'];
    if (isset($overrides[$key]) && $overrides[$key] !== '') {
        return (string) $overrides[$key];
    }

    $env = getenv($key);

    return ($env !== false && $env !== '') ? (string) $env : $default;
}

/** Escape para HTML. Se usa en todas las plantillas. */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

// --- Identidad --------------------------------------------------------------

define('SITE_NAME', 'sitiosweb.com.py');
define('SITE_URL', rtrim(cfg('SITE_URL', 'https://sitiosweb.com.py'), '/'));
define('SITE_LANG', 'es-PY');
define('SITE_LOCALE', 'es_PY');

// --- Contacto ---------------------------------------------------------------
// PENDIENTE: número real de WhatsApp. Sin él los botones quedan desactivados
// y la home muestra la nota de "Contacto pendiente". Es intencional.

define('SITE_WHATSAPP', preg_replace('/\D+/', '', cfg('SITE_WHATSAPP')));
define('SITE_HAS_WHATSAPP', strlen(SITE_WHATSAPP) >= 10);

// PENDIENTE: casilla real. Vacío = no se muestra en ningún lado.
define('SITE_EMAIL', cfg('SITE_EMAIL'));

// PENDIENTE antes de publicar: razón social, RUC, dirección, zona de cobertura
// y horario. No inventar ninguno de estos datos.
define('SITE_LEGAL_NAME', cfg('SITE_LEGAL_NAME'));
define('SITE_RUC', cfg('SITE_RUC'));

// --- Entorno ----------------------------------------------------------------

define('SITE_ENV', cfg('SITE_ENV', 'production'));
// En staging conviene bloquear indexación. En producción nunca.
define('SITE_INDEXABLE', SITE_ENV === 'production');

// Cache-busting de assets sin build step: se usa el mtime del archivo.
function asset(string $path): string
{
    $path = '/' . ltrim($path, '/');
    $file = dirname(__DIR__) . $path;
    $version = is_file($file) ? (string) filemtime($file) : '1';

    return $path . '?v=' . $version;
}
