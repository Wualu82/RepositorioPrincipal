<?php
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

$lang = $_COOKIE['language'] ?? 'es';
$theme = $_COOKIE['theme'] ?? 'light';

// Textos por idioma
$texts = [
    'es' => [
        'title' => 'Floristería Online',
        'catalog' => 'Catálogo de Ramos',
        'add' => 'Añadir al carrito',
        'cart' => 'Carrito',
        'total' => 'Total',
        'empty' => 'Carrito vacío',
        'prefs' => 'Preferencias'
    ],
    'en' => [
        'title' => 'Flower Shop',
        'catalog' => 'Bouquet Catalog',
        'add' => 'Add to cart',
        'cart' => 'Cart',
        'total' => 'Total',
        'empty' => 'Empty cart',
        'prefs' => 'Preferences'
    ]
];

$t = $texts[$lang];
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <title><?= $t['title'] ?></title>
    <link rel="stylesheet" href="styles.css">
</head>
<body data-theme="<?= $theme ?>">

<h2><?= $t['title'] ?></h2>
<a href="index.php">Home</a> |
<a href="preferences.php"><?= $t['prefs'] ?></a>

<hr>

<!-- ===== CARRITO ===== -->
<div id="cart">
    <h3>🛒 <?= $t['cart'] ?></h3>

    <?php if (empty($_SESSION['cart'])): ?>
        <?= $t['empty'] ?>
    <?php else: ?>
        <?php 
        $total = 0;
        foreach ($_SESSION['cart'] as $id => $item): 
            $subtotal = $item['price'] * $item['qty'];
            $total += $subtotal;
        ?>
            <?= $item['name'] ?>  
            (<?= $item['qty'] ?> x <?= $item['price'] ?>€ = <?= $subtotal ?>€)

            <form action="cart.php" method="POST" style="display:inline">
                <input type="hidden" name="action" value="remove">
                <input type="hidden" name="id" value="<?= $id ?>">
                <button type="submit">❌</button>
            </form>
            <br>
        <?php endforeach; ?>

        <strong><?= $t['total'] ?>: <?= $total ?> €</strong>
    <?php endif; ?>
</div>

<hr>

<script>
    // Copia en cliente (no fuente de verdad)
    window.phpCart = <?= json_encode($_SESSION['cart']) ?>;
    localStorage.setItem("theme", "<?= $theme ?>");
    localStorage.setItem("language", "<?= $lang ?>");
</script>

<script src="assets/app.js"></script>