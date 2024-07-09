# CodoViajero-backend

## Requisitos

- Node.js
- MySQL 

## Instala las dependencias:

    ```sh
    npm install
    ```
### Credenciales de la Base de Datos

Abre el archivo `db.js` (o el nombre del archivo correspondiente) y asegúrate de modificar las siguientes líneas con tus credenciales de MySQL:

```javascript
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TU_CONTRASEÑA',
});

