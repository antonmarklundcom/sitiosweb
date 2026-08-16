<?php
/**
 * Contenido de la home en un solo lugar.
 *
 * Las FAQ de acá alimentan tanto el HTML como el JSON-LD de FAQPage, así que no
 * pueden desincronizarse.
 *
 * OJO: precio, facturación anual, plazo de 7 días, VenderCRM y Google Business
 * siguen sin confirmar. Están marcados abajo. No agregar clientes, resultados,
 * reseñas ni credenciales.
 */

declare(strict_types=1);

/** Ejemplos conceptuales. NO son trabajos de clientes y así se rotulan. */
const SITE_EXAMPLES = [
    ['category' => 'Salud', 'title' => 'Clínica dental', 'class' => 'dental', 'cta' => 'Agendar consulta'],
    ['category' => 'Hogar', 'title' => 'Arquitectura', 'class' => 'architecture', 'cta' => 'Ver proyectos'],
    ['category' => 'Gastronomía', 'title' => 'Cocina paraguaya', 'class' => 'restaurant', 'cta' => 'Reservar mesa'],
    ['category' => 'Servicios', 'title' => 'Estudio contable', 'class' => 'accounting', 'cta' => 'Hacer una consulta'],
    ['category' => 'Construcción', 'title' => 'Obras & reformas', 'class' => 'construction', 'cta' => 'Pedir presupuesto'],
    ['category' => 'Belleza', 'title' => 'Estudio de belleza', 'class' => 'beauty', 'cta' => 'Reservar turno'],
];

const SITE_INCLUDED = [
    ['01', 'Sitio', 'Sitio web propio', 'Una página hecha para tu negocio, no una plantilla genérica. Carga rápido en celulares de gama baja y se adapta a cualquier pantalla.', 'feature-wide'],
    ['02', 'Dominio', 'Dominio .com.py', 'Registramos y renovamos tu dominio. Queda a tu nombre. El hosting está incluido.', ''],
    ['03', 'WhatsApp', 'Respuesta por WhatsApp', 'Cada botón del sitio abre un chat con tu número y el mensaje ya escrito.', ''],
    ['04', 'CRM', 'VenderCRM incluido', 'Los mensajes del sitio quedan ordenados en un solo lugar: quién escribió, qué pidió y en qué quedó la conversación.', 'feature-wide'],
];

const SITE_STEPS = [
    ['01', 'Nos contás de tu negocio', 'Una conversación por WhatsApp: qué hacés, dónde estás y qué querés que la gente pida.', ''],
    ['02', 'Lo construimos', 'Escribimos el contenido, armamos el sitio, registramos el dominio y conectamos tu WhatsApp.', ''],
    ['03', 'Empezás a recibir mensajes', 'Publicamos y te entregamos el acceso.', 'Referencia: 7 días hábiles'],
];

/**
 * Precio. `confirmed => false` mantiene el importe fuera del JSON-LD: mostrarlo
 * en la página es una cosa, declarárselo a Google como oferta es otra.
 * Poner en true recién cuando el precio y la facturación anual estén cerrados.
 */
const SITE_PRICE = [
    'confirmed' => false,
    'amount' => 'Gs. 89.000',
    'period' => '/mes',
    'currency' => 'PYG',
    'value' => 89000,
    'note' => 'Facturado anualmente — Gs. 1.068.000 por año.',
    'includes' => [
        'Sitio web hecho a medida',
        'Dominio .com.py a tu nombre',
        'Hosting y certificado SSL',
        'Botones de WhatsApp',
        'VenderCRM para tus conversaciones',
        'Ficha de Google Business configurada',
        'Cambios de contenido solicitados',
    ],
];

const SITE_FIT_YES = [
    'Tenés un comercio o servicio local y vendés por WhatsApp.',
    'No tenés sitio, o el que tenés está desactualizado.',
    'Querés aparecer cuando alguien busca tu rubro en tu ciudad.',
    'Preferís una cuota fija antes que un proyecto grande de una vez.',
];

const SITE_FIT_NO = [
    'Necesitás una tienda online con carrito y pagos.',
    'Necesitás un sistema a medida o integrar tu facturación.',
    'Necesitás el sitio en varios idiomas.',
    'Querés definir cada página fuera de la estructura acordada.',
];

/** Fuente única: HTML de la sección Preguntas + JSON-LD de FAQPage. */
const SITE_FAQS = [
    ['¿El dominio es mío?', 'Sí. Se registra a nombre de tu empresa o al tuyo. Si un día te vas, lo transferimos a donde nos digas sin costo.'],
    ['¿Qué pasa si cancelo?', 'El servicio sigue activo hasta terminar el año pagado. Después bajamos el sitio y te entregamos el dominio y los textos. No se devuelve la parte del año ya facturada.'],
    ['¿Puedo cambiar el contenido después?', 'Sí. Nos mandás el cambio por WhatsApp y lo hacemos. No hay panel de edición: los cambios los hacemos nosotros.'],
    ['¿Necesito RUC?', 'Para el sitio, no. Para el dominio .com.py y para emitir factura, conviene tenerlo. Si todavía no tenés, consultanos antes de empezar.'],
    ['¿Cuánto demora?', 'La referencia es siete días hábiles desde que tenemos tu información y tus fotos. Si la entrega de materiales se demora, el plazo se corre.'],
    ['¿Por qué el pago es anual?', 'El dominio y el hosting se pagan por año, y el trabajo fuerte está al principio. Cobrar anual permite mantener una cuota mensual equivalente sin pedir un anticipo grande.'],
];

/** Navegación principal. Hoy son anclas de la home; se vuelven rutas reales en la fase multipágina. */
const SITE_NAV = [
    ['label' => 'Qué incluye', 'anchor' => 'incluye'],
    ['label' => 'Cómo funciona', 'anchor' => 'como'],
    ['label' => 'Precio', 'anchor' => 'precio'],
    ['label' => 'Preguntas', 'anchor' => 'preguntas'],
];
