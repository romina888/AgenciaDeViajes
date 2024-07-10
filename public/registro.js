const crearUsuarioForm = document.getElementById('registro');

crearUsuarioForm.addEventListener('submit', async (event) => {

    event.preventDefault();
    const formData = new FormData(crearUsuarioForm)

    const data = {
        nombre: formData.get("nombre"),
        apellido: formData.get("apellido"),
        correoElectronico: formData.get("correoelectronico"),
        contra: formData.get("contraseña")
    }

    const response = await fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Error al crear usuario: ${errorMessage}`);
    } else {
        alert("Usuario Creado Con Éxito");
        crearUsuarioForm.reset();
    }

})
