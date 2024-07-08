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
                            nombre VARCHAR(100) NOT NULL,
                            apellido VARCHAR(100) NOT NULL,
                            CorreoElectronico VARCHAR(255) NOT NULL,
                            Contraseña VARCHAR(255) NOT NULL
                        );`;
        
                    crearTabla(queryCrearTablaUsuarios);

                    const queryCrearTablaAlojamientos = `
                        CREATE TABLE IF NOT EXISTS Alojamientos (
                            AlojamientoID INT AUTO_INCREMENT PRIMARY KEY,
                            Nombre VARCHAR(100) NOT NULL,
                            Direccion VARCHAR(200),
                            Tipo ENUM('hotel', 'hostal', 'apartamento') NOT NULL,
                            PrecioPorNoche DECIMAL(10, 2) NOT NULL
                        );`;
        
                    crearTabla(queryCrearTablaAlojamientos);
        
                    const queryCrearTablaReservas = `
                        CREATE TABLE IF NOT EXISTS Reservas (
                            ReservaID INT AUTO_INCREMENT PRIMARY KEY,
                            FechaInicio DATE,
                            FechaFin DATE,
                            PrecioTotal DECIMAL(10, 2),

                            FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
                            FOREIGN KEY (AlojamientoID) REFERENCES Alojamientos(AlojamientoID)
                        );`;
        
                    crearTabla(queryCrearTablaReservas);
        });
    });
});


module.exports = connection;
