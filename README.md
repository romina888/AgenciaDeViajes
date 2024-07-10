# CodoViajero-backend

## Requisitos

- Node.js
- MySQL 

## Instala las dependencias:

    ```sh
    npm install
    ```
## Ejecutar:

    ```sh
    npm start
    ```

### Credenciales de la Base de Datos

Abre el archivo `db.js` en el directorio `db` y asegurate de modificar las siguientes líneas con tus credenciales de MySQL:

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TU_CONTRASEÑA',
});
```

# CodoViajero-frontend

## Trabajo Práctico Desarrollo Web HTML, CSS y JavaScript

## Criterios de evaluación

||||
| ------------- |:-------------:|:-------------:|
|El sitio web debe poseer al menos 4 páginas HTML o 4 secciones si se trata de un sitio One Page.      | 10 | |
|El sitio web debe incluir un formulario de contacto, con al menos 5 campos que incluya (un checkbox o radiobutton), un select y una imagen, con validación realizada mediante JavaScript para que los campos sean obligatorios.|15| |
|Tener al menos una páginaCSS.|15| |
|Utilizar al menos una animación, transformación o una transición. |10| |
|Poseer una estructura HTML maquetada con Flexbox y/o Grid.|10| |
|Se considerará la presentación general del proyecto, la legibilidad del mismo, la navegación sin llegar a puntos de no retorno, la optimización de imagenes para la web y el uso de favicon|10|
|El trabajo práctico deberá subirse a un servidor online y compartirse mediante un repositorio de Git. (Mandatorio) |10 | |
|La página deberá subirse a un servidor on-line para poder ser navegada por el Docente. Ejemplo: Netlify o similar. (Mandatorio)|10| |
|El sitio web debe estar estructurado utilizando etiquetas semánticas HTML correctamente. Debe pasar la validación de https://validator.w3.org/ sin errores. (Mandatorio)|5| |
|Utilizar iframes y/o íconos de FontAwesome y/o fuentes locales o bien de Google Fonts.Es optativo incluir algún elemento de Bootstrap.|5| |

### Condiciones de aprobación

* 60% del trabajo práctico correcto.
* El trabajo se cargará en la plataforma especificada por el instructor.
* Entregar el enlace a la versión navegable del sitio web.
* Entregar el enlace al repositorio utilizado
* Entregar la lista de integrantes y cualquier comentario adicional que consideren necesario.