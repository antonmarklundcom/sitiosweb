import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/(?:[A-Za-z]:)/, (value) => value.slice(1));
const port = Number(process.env.PORT || 8088);

const examples = [
  ['Salud', 'Clínica dental', 'dental', 'Agendar consulta'],
  ['Hogar', 'Arquitectura', 'architecture', 'Ver proyectos'],
  ['Gastronomía', 'Cocina paraguaya', 'restaurant', 'Reservar mesa'],
  ['Servicios', 'Estudio contable', 'accounting', 'Hacer una consulta'],
  ['Construcción', 'Obras & reformas', 'construction', 'Pedir presupuesto'],
  ['Belleza', 'Estudio de belleza', 'beauty', 'Reservar turno'],
];

const included = [
  ['01', 'Sitio', 'Sitio web propio', 'Una página hecha para tu negocio, no una plantilla genérica. Carga rápido en celulares de gama baja y se adapta a cualquier pantalla.', 'feature-wide'],
  ['02', 'Dominio', 'Dominio .com.py', 'Registramos y renovamos tu dominio. Queda a tu nombre. El hosting está incluido.', ''],
  ['03', 'WhatsApp', 'Respuesta por WhatsApp', 'Cada botón del sitio abre un chat con tu número y el mensaje ya escrito.', ''],
  ['04', 'CRM', 'VenderCRM incluido', 'Los mensajes del sitio quedan ordenados en un solo lugar: quién escribió, qué pidió y en qué quedó la conversación.', 'feature-wide'],
];

const faqs = [
  ['¿El dominio es mío?', 'Sí. Se registra a nombre de tu empresa o al tuyo. Si un día te vas, lo transferimos a donde nos digas sin costo.'],
  ['¿Qué pasa si cancelo?', 'El servicio sigue activo hasta terminar el año pagado. Después bajamos el sitio y te entregamos el dominio y los textos. No se devuelve la parte del año ya facturada.'],
  ['¿Puedo cambiar el contenido después?', 'Sí. Nos mandás el cambio por WhatsApp y lo hacemos. No hay panel de edición: los cambios los hacemos nosotros.'],
  ['¿Necesito RUC?', 'Para el sitio, no. Para el dominio .com.py y para emitir factura, conviene tenerlo. Si todavía no tenés, consultanos antes de empezar.'],
  ['¿Cuánto demora?', 'La referencia es siete días hábiles desde que tenemos tu información y tus fotos. Si la entrega de materiales se demora, el plazo se corre.'],
  ['¿Por qué el pago es anual?', 'El dominio y el hosting se pagan por año, y el trabajo fuerte está al principio. Cobrar anual permite mantener una cuota mensual equivalente sin pedir un anticipo grande.'],
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);

async function renderHomepage() {
  let html = await readFile(join(root, 'index.php'), 'utf8');
  html = html.slice(html.indexOf('<!doctype html>'));

  const exampleMarkup = examples.map(([category, title, cardClass, cta], index) => `
    <article class="site-card ${cardClass}" data-card aria-label="${escapeHtml(title)}">
      <div class="mobile-shot" aria-hidden="true"></div>
      <div class="site-card-caption">
        <span>Concepto ${String(index + 1).padStart(2, '0')} / ${escapeHtml(category)}</span>
        <strong>${escapeHtml(title)}</strong>
      </div>
    </article>`).join('');

  const includedMarkup = included.map(([number, label, title, copy, cardClass]) => `
    <article class="feature-card ${cardClass}" data-reveal>
      <span class="meta">${number} / ${escapeHtml(label)}</span>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(copy)}</p>
    </article>`).join('');

  const faqMarkup = faqs.map(([title, answer], index) => `
    <details data-reveal ${index === 0 ? 'open' : ''}>
      <summary>${escapeHtml(title)}<span aria-hidden="true"></span></summary>
      <p>${escapeHtml(answer)}</p>
    </details>`).join('');

  html = html
    .replace(/<\?php foreach \(\$examples[\s\S]*?<\?php endforeach; \?>/, exampleMarkup)
    .replace(/<\?php foreach \(\$included[\s\S]*?<\?php endforeach; \?>/, includedMarkup)
    .replace(/<\?php foreach \(\$faqs[\s\S]*?<\?php endforeach; \?>/, faqMarkup)
    .replace(/<\?php if \(\$hasWhatsapp\): \?>[\s\S]*?<\?php else: \?>/, '')
    .replace(/<\?php endif; \?>/, '')
    .replaceAll('<?= htmlspecialchars($generalWhatsapp) ?>', '#empezar')
    .replaceAll('<?= htmlspecialchars($pricingWhatsapp) ?>', '#empezar')
    .replaceAll(`<?= $hasWhatsapp ? 'target="_blank" rel="noopener"' : '' ?>`, '')
    .replace(/<\?=([\s\S]*?)\?>/g, '')
    .replace(/<\?php([\s\S]*?)\?>/g, '');
  return html;
}

const mime = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

const server = createServer(async (request, response) => {
  try {
    if (request.url === '/' || request.url === '/index.php') {
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(await renderHomepage());
      return;
    }
    const relative = decodeURIComponent(request.url.split('?')[0]).replace(/^\/+/, '');
    const path = normalize(join(root, relative));
    if (!path.startsWith(normalize(root))) throw new Error('Invalid path');
    const body = await readFile(path);
    response.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
});

if (process.argv.includes('--export')) {
  const output = join(root, 'homepage-preview.html');
  await writeFile(output, await renderHomepage(), 'utf8');
  console.log(`Static preview: ${output}`);
} else {
  server.listen(port, '127.0.0.1', () => {
    console.log(`Preview: http://127.0.0.1:${port}`);
  });
}
