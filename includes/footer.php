<?php
/** Pie común. Cierra el documento abierto en head.php. */

declare(strict_types=1);

$currentPath = $page['path'] ?? '/';
?>
    <footer class="site-footer">
        <a class="wordmark" href="<?= $currentPath === '/' ? '#inicio' : '/' ?>"><?= e(SITE_NAME) ?></a>
        <p>Servicio de sitios web para negocios locales en Paraguay.</p>
        <nav class="footer-links" aria-label="Enlaces legales">
            <a href="/privacidad/">Privacidad</a>
            <a href="/terminos/">Términos</a>
        </nav>
        <p>Datos legales y políticas pendientes de confirmación antes de publicar.</p>
    </footer>
</body>
</html>
