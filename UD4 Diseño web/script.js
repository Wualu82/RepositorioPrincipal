const video = document.getElementById("videoCurso");
const quiz = document.getElementById("quiz");
const resultado = document.getElementById("resultado");

// Mostrar quiz cuando termina el video
video.addEventListener("ended", () => {
    quiz.classList.remove("oculto");
});

// Ir a capítulo
function irAlMinuto(segundos) {
    video.currentTime = segundos;
    video.play();
}

// Verificar respuesta
function verificarRespuesta(opcion) {
    if (opcion === "a") {
        resultado.textContent = "✅ Correcto!";
    } else {
        resultado.textContent = "❌ Incorrecto. Intenta nuevamente.";
    }
}

// Comentarios simples
function agregarComentario() {
    const input = document.getElementById("comentarioInput");
    const lista = document.getElementById("listaComentarios");

    if (input.value.trim() !== "") {
        const nuevoComentario = document.createElement("p");
        nuevoComentario.textContent = input.value;
        lista.appendChild(nuevoComentario);
        input.value = "";
    }
}