<?php
// simulamos la base de datos con este array
$productos = [
    ["nombre" => "Leche Entera", "categoria" => "Lácteos", "precio" => 1.20],
    ["nombre" => "Pan Integral", "categoria" => "Panadería", "precio" => 1.50],
    ["nombre" => "Arroz Largo", "categoria" => "Cereales", "precio" => 0.95],
    ["nombre" => "Pasta Espagueti", "categoria" => "Cereales", "precio" => 1.10],
    ["nombre" => "Manzanas", "categoria" => "Frutas", "precio" => 2.30],
    ["nombre" => "Plátanos", "categoria" => "Frutas", "precio" => 1.90],
    ["nombre" => "Queso Curado", "categoria" => "Lácteos", "precio" => 3.80],
    ["nombre" => "Yogur Natural", "categoria" => "Lácteos", "precio" => 0.75],
    ["nombre" => "Aceite de Oliva", "categoria" => "Despensa", "precio" => 5.60],
    ["nombre" => "Azúcar Blanco", "categoria" => "Despensa", "precio" => 1.25]
];

//Filtro GET

$busqueda  = $_GET['busqueda'] ?? '';
$categoria = $_GET['categoria'] ?? '';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Buscador de Productos - Supermercado</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }
        .producto {
            border-bottom: 1px solid #ccc;
            margin-bottom: 15px;
            padding-bottom: 10px;
        }
    </style>
</head>
<body>

<h1>Buscador de Productos</h1>

<!--Formulario de busqueda -->
<form method="get">
    <label>Producto:</label>
    <input type="text" name="busqueda" value="<?php echo htmlspecialchars($busqueda); ?>">

    <label>Categoría:</label>
    <select name="categoria">
        <option value="">Todas</option>
        <option value="Lácteos" <?php if ($categoria == "Lácteos") echo "selected"; ?>>Lácteos</option>
        <option value="Panadería" <?php if ($categoria == "Panadería") echo "selected"; ?>>Panadería</option>
        <option value="Cereales" <?php if ($categoria == "Cereales") echo "selected"; ?>>Cereales</option>
        <option value="Frutas" <?php if ($categoria == "Frutas") echo "selected"; ?>>Frutas</option>
        <option value="Despensa" <?php if ($categoria == "Despensa") echo "selected"; ?>>Despensa</option>
    </select>

    <button type="submit">Buscar</button>
</form>

<hr>

<h2>Resultados</h2>

<?php
//Filtrado de la busqueda
$resultados = [];

foreach ($productos as $producto) {

    // Filtro por nombre
    if ($busqueda && stripos($producto['nombre'], $busqueda) === false) {
        continue;
    }

    // Filtro por categoría
    if ($categoria && $producto['categoria'] !== $categoria) {
        continue;
    }

    $resultados[] = $producto;
}

//Resultado de la busqueda
if (count($resultados) > 0) {
    foreach ($resultados as $producto) {
        echo "<div class='producto'>";
        echo "<h3>{$producto['nombre']}</h3>";
        echo "<p><strong>Categoría:</strong> {$producto['categoria']}</p>";
        echo "<p><strong>Precio:</strong> " . number_format($producto['precio'], 2) . " €</p>";
        echo "</div>";
    }
} else {
    echo "<p>No se encontraron productos con los filtros seleccionados.</p>";
}
?>

</body>
</html>
