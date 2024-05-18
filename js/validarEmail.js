function validarEmail() {
    var email = document.getElementById("emailInput").value;

    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
    }else{
        alert("Gracias por suscribirte")
    }
}