<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    setcookie("language", $_POST['language'], time() + 31536000, "/");
    setcookie("theme", $_POST['theme'], time() + 31536000, "/");
    header("Location: index.php");
    exit;
}
?>

<h2>Preferencias</h2>

<form method="POST">
    <label>
        Idioma:
        <select name="language">
            <option value="es">Español</option>
            <option value="en">English</option>
        </select>
    </label><br><br>

    <label>
        Tema:
        <select name="theme">
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
        </select>
    </label><br><br>

    <button type="submit">Guardar preferencias</button>
</form>

<a href="index.php">Volver</a>