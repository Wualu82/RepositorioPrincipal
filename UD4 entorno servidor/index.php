<?php include 'header.php'; ?>

<h1>Catálogo de Ramos</h1>

<?php
$flowers = [
    1 => ["name" => "Ramo de Rosas Rojas", "price" => 50],
    2 => ["name" => "Ramo de Tulipanes", "price" => 40],
    3 => ["name" => "Ramo de Margaritas", "price" => 30],
    4 => ["name" => "Ramo de Lirios", "price" => 45],
    5 => ["name" => "Ramo Primavera", "price" => 35],
];
?>

<?php foreach ($flowers as $id => $flower): ?>
    <div class="product">
        <h3><?= $flower['name'] ?></h3>
        <p>Precio: <?= $flower['price'] ?> €</p>

        <form action="cart.php" method="POST">
            <input type="hidden" name="action" value="add">
            <input type="hidden" name="id" value="<?= $id ?>">
            <input type="hidden" name="name" value="<?= $flower['name'] ?>">
            <input type="hidden" name="price" value="<?= $flower['price'] ?>">
            <input type="number" name="qty" value="1" min="1">
            <button type="submit">Añadir al carrito</button>
        </form>
    </div>
<?php endforeach; ?>

<?php include 'footer.php'; ?>