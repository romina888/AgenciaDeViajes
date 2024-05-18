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

function isValidEmail(correoelectronico)
{
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(correoelectronico);
}
  alert("Formulario enviado correctamente");
  return true;

}  
document.getElementById("myForm").addEventListener("submit", validateForm);