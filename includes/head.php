<?php
/**
 * Apertura del documento. Cada página define $page y después incluye este archivo.
 * Espera opcionalmente $schema (arreglo de nodos JSON-LD) y $preloadHero (bool).
 */

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/seo.php';
require_once __DIR__ . '/schema.php';
require_once __DIR__ . '/whatsapp.php';
require_once __DIR__ . '/content.php';

$page = page_meta($page ?? []);
$schema = $schema ?? [];
$preloadHero = $preloadHero ?? false;

$ogImagePath = dirname(__DIR__) . $page['og_image'];
$hasOgImage = is_file($ogImagePath);
?>
<!doctype html>
<html lang="<?= SITE_LANG ?>">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= e($page['title']) ?></title>
    <meta name="description" content="<?= e($page['description']) ?>">
    <meta name="robots" content="<?= e(robots_directive($page)) ?>">
    <link rel="canonical" href="<?= e(canonical_url($page['path'])) ?>">
    <meta name="theme-color" content="#14150f">

    <meta property="og:type" content="<?= e($page['og_type']) ?>">
    <meta property="og:site_name" content="<?= e(SITE_NAME) ?>">
    <meta property="og:locale" content="<?= SITE_LOCALE ?>">
    <meta property="og:title" content="<?= e($page['title']) ?>">
    <meta property="og:description" content="<?= e($page['description']) ?>">
    <meta property="og:url" content="<?= e(canonical_url($page['path'])) ?>">
<?php if ($hasOgImage): ?>
    <meta property="og:image" content="<?= e(SITE_URL . $page['og_image']) ?>">
    <meta name="twitter:card" content="summary_large_image">
<?php else: ?>
    <?php /* PENDIENTE: imagen social real en assets/img/og-default.jpg (1200x630). */ ?>
    <meta name="twitter:card" content="summary">
<?php endif; ?>
    <meta name="twitter:title" content="<?= e($page['title']) ?>">
    <meta name="twitter:description" content="<?= e($page['description']) ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<?php if ($preloadHero): ?>
    <link rel="preload" href="<?= e(asset('assets/img/hero-paraguay-positive-v3.webp')) ?>" as="image" type="image/webp" fetchpriority="high">
<?php endif; ?>
    <link rel="stylesheet" href="<?= e(asset('assets/css/site.css')) ?>">
    <script src="<?= e(asset('assets/js/site.js')) ?>" defer></script>
<?php render_schema($schema); ?>
</head>
<body<?= $page['body_class'] !== '' ? ' class="' . e($page['body_class']) . '"' : '' ?>>
    <a class="skip-link" href="#contenido">Saltar al contenido</a>
