<?php
/**
 * Cabecera común. Los links de navegación son anclas de la home y funcionan
 * igual desde las páginas internas (ver home_anchor()).
 */

declare(strict_types=1);

$currentPath = $page['path'] ?? '/';
?>
    <header class="site-header" data-header>
        <a class="wordmark" href="<?= $currentPath === '/' ? '#inicio' : '/' ?>" aria-label="<?= e(SITE_NAME) ?>, inicio"><?= e(SITE_NAME) ?></a>
        <nav class="desktop-nav" aria-label="Navegación principal">
<?php foreach (SITE_NAV as $item): ?>
            <a href="<?= e(home_anchor($item['anchor'], $currentPath)) ?>"><?= e($item['label']) ?></a>
<?php endforeach; ?>
        </nav>
        <div class="header-actions">
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>Menú</button>
            <a class="header-cta" href="<?= e(whatsapp_url('general')) ?>"<?= whatsapp_attrs() ?>>WhatsApp</a>
        </div>
        <nav class="mobile-nav" id="mobile-menu" aria-label="Navegación móvil" data-mobile-menu hidden>
<?php foreach (SITE_NAV as $item): ?>
            <a href="<?= e(home_anchor($item['anchor'], $currentPath)) ?>"><?= e($item['label']) ?></a>
<?php endforeach; ?>
        </nav>
    </header>
