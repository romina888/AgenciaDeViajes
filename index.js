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