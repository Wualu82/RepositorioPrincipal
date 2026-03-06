<?php
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// AÑADIR
if ($_POST['action'] === 'add') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $qty = $_POST['qty'];

    if (!isset($_SESSION['cart'][$id])) {
        $_SESSION['cart'][$id] = [
            "name" => $name,
            "price" => $price,
            "qty" => 0
        ];
    }

    $_SESSION['cart'][$id]['qty'] += $qty;
}

// ELIMINAR
if ($_POST['action'] === 'remove') {
    $id = $_POST['id'];
    unset($_SESSION['cart'][$id]);
}

header("Location: index.php");
exit;