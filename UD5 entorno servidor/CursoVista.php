<!DOCTYPE html>
<html>
<head>
    <title>Sistema de Cursos</title>
</head>
<body>

<h1>Gestión de Cursos Online</h1>

<h2>Resultados de Inscripción</h2>
<p><?php echo $mensaje1; ?></p>
<p><?php echo $mensaje2; ?></p>
<p><?php echo $mensaje3; ?></p>

<h2>Información del Curso</h2>
<p><?php echo $curso->mostrarCurso(); ?></p>

</body>
</html>