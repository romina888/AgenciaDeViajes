/*const enviarConsulta = document.getElementById('contacto');

enviarConsulta.addEventListener('submit', async (event) => {

    event.preventDefault();
    const formData = new FormData(enviarConsulta)

    const data = {
        nombreApellido: formData.get("nombreapellido"),
        correoElectronico: formData.get("correoelectronico"),
        telefono: formData.get("telefono"),
        consulta: formData.get("mensaje")
    };

    const response = await fetch('/contacto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        alert(`Error al enviar consulta: ${errorMessage}`);
    } else {
        alert("Mensaje enviado con exito");
        enviarConsulta.reset();
    }

});
*/