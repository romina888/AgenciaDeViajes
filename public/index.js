function validateForm(event)
{
  event.preventDefault();

  //inputs
  let nombreapellido = document.getElementById("nombreapellido").value;
  let correoelectronico = document.getElementById("correoelectronico").value;

  if(nombreapellido.trim() === "")
  {
    alert("Por favor ingresa tu nombre completo");
    return false; // EVITA QUE SE ENVIE EL FORMULARIo
  }

  if(correoelectronico.trim() === "")
  {
    alert("Por favor ingresa tu mail");
    return false;
  }

  if(!isValidEmail(correoelectronico))
  {
    alert("Por favor ingresa un MAIL VALIDO");
    return true;
  }

  if(fileInput.trim() === "")
    {
    alert("Por favor valida con una imagen");
    return false; 
  }
  
  if (!fileselector(fileInput)) {
    alert= ("Por favor, selecciona una imagen");
    return true;
  } 

function isValidEmail(correoelectronico)
{
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(correoelectronico);
}
  alert("Formulario enviado correctamente");
  return true;

}  
document.getElementById("myForm").addEventListener("submit", validateForm);

//------------------------------INTEGRACION CON FRONT----------------------------------------------//

const enviarConsulta = document.getElementById('contacto');

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
