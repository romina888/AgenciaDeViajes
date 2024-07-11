
const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', async (event) => {

    event.preventDefault();
    const formData = new FormData(loginForm)

    const data = {
        correoElectronico: formData.get("correoelectronico"),
        contra: formData.get("contraseña"),
    }
    
    const response = await fetch('/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Error al iniciar sesion ${errorMessage}`);
    } else {
        alert("inicio de sesion con exito");
        loginForm.reset();
    }
})