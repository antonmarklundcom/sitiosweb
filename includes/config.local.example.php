<?php
/**
 * Copiá este archivo a includes/config.local.php y completá los valores reales.
 * config.local.php NO se versiona.
 *
 * Alternativa: definir las mismas claves como variables de entorno.
 */

declare(strict_types=1);

return [
    // Solo dígitos, con código de país. Ej: '595991234567'
    'SITE_WHATSAPP' => '',

    'SITE_URL' => 'https://sitiosweb.com.py',
    'SITE_EMAIL' => '',

    // Datos legales — completar antes de publicar.
    'SITE_LEGAL_NAME' => '',
    'SITE_RUC' => '',

    // 'production' | 'staging'. En staging el sitio se marca noindex.
    'SITE_ENV' => 'production',
];
