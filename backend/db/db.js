const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123'
})

function crearTabla(query) {
    console.log("Ejecutando query " + query);

    connection.query(query, (err, results) => {
        if (err) {
            console.log(`Error creando la tabla`, err);
            return;
        }
        console.log(`Tabla creada con exito`);
    });
}

connection.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos", err);
        return;
    }


    console.log("Conexion exitosa a la base de datos");


    connection.query('CREATE DATABASE IF NOT EXISTS CodoViajeroDB', (err, results) => {
        if (err) {
            console.log("Error creando la base de datos CodoViajeroDB");
            return;
        }


        console.log("Base de datos asegurada");

        connection.changeUser({ database: 'CodoViajeroDB' }, (err) => {
            if (err) {
                console.error("Error seleccionando la base de datos CodoViajeroDB", err);
                connection.end(); // Cerrar conexión si hay un error
                return;
            }

            const queryCrearTablaUsuarios = `
            CREATE TABLE IF NOT EXISTS Usuarios (
                UsuarioID INT AUTO_INCREMENT PRIMARY KEY,
                Nombre VARCHAR(100) NOT NULL,
                Apellido VARCHAR(100) NOT NULL,
                CorreoElectronico VARCHAR(255) NOT NULL,
                Contra VARCHAR(255) NOT NULL
            );`;
        
            const queryCrearTablaDestinos = `
                CREATE TABLE IF NOT EXISTS Destinos (
                    DestinoID INT AUTO_INCREMENT PRIMARY KEY,
                    Nombre VARCHAR(100) NOT NULL,
                    Descripcion TEXT,
                    Ubicacion VARCHAR(255) NOT NULL
                );`;
            
            const queryCrearTablaAlojamientos = `
                CREATE TABLE IF NOT EXISTS Alojamientos (
                    AlojamientoID INT AUTO_INCREMENT PRIMARY KEY,
                    Nombre VARCHAR(100) NOT NULL,
                    Direccion VARCHAR(200),
                    Tipo ENUM('hotel', 'hostal', 'apartamento') NOT NULL,
                    PrecioPorNoche DECIMAL(10, 2) NOT NULL,
                    DestinoID INT,
                    FOREIGN KEY (DestinoID) REFERENCES Destinos(DestinoID) ON DELETE SET NULL
                );`;
            
            const queryCrearTablaReservas = `
                CREATE TABLE IF NOT EXISTS Reservas (
                    ReservaID INT AUTO_INCREMENT PRIMARY KEY,
                    FechaInicio DATE,
                    FechaFin DATE,
                    PrecioTotal DECIMAL(10, 2),
                    UsuarioID INT,
                    AlojamientoID INT,
                    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
                    FOREIGN KEY (AlojamientoID) REFERENCES Alojamientos(AlojamientoID)
                );`;
            
            crearTabla(queryCrearTablaUsuarios);
            crearTabla(queryCrearTablaDestinos);
            crearTabla(queryCrearTablaAlojamientos);
            crearTabla(queryCrearTablaReservas);
        });
    });
});


module.exports = connection;
