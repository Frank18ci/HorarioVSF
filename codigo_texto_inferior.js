// Obtener referencia al botón y al elemento que se va a ocultar
var btnIniciar = document.getElementById("iniciarTexto");
var valorCambio = false; // Cambié "valoCambio" a "valorCambio" para corregir la ortografía

btnIniciar.addEventListener('click', () => {
    var estiloTextoInferior;
    if (valorCambio) {
        estiloTextoInferior = "display: block";
        valorCambio = false; // Cambiar el valor de la variable de estado
    } else {
        estiloTextoInferior = "display: none"; // Estilo para ocultar el elemento
        valorCambio = true; // Cambiar el valor de la variable de estado
    }
    localStorage.setItem("estiloTextoInferior", estiloTextoInferior);
});
