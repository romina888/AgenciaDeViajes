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

function AgregarDestinos(){
    const queryInsertarDestinos = `
        INSERT INTO Destinos (Nombre, Descripcion, Ubicacion) VALUES
        ('Bariloche', 'Destino turístico en la Patagonia', 'Río Negro, Argentina'),
        ('Jujuy', 'Destino con paisajes de montaña', 'Jujuy, Argentina'),
        ('Merlo, San Luis', 'Destino conocido por su microclima', 'San Luis, Argentina'),
        ('Las Cataratas del Iguazú', 'Una de las maravillas naturales del mundo', 'Misiones, Argentina'),
        ('Córdoba', 'Ciudad histórica con gran vida nocturna', 'Córdoba, Argentina'),
        ('San Rafael, Mendoza', 'Destino famoso por sus bodegas y paisajes', 'Mendoza, Argentina');`;

        connection.query('SELECT COUNT(*) AS count FROM Destinos', (error, results) => {
            if (error) throw error;

            if (results[0].count === 0) {
                connection.query(queryInsertarDestinos, (error, results) => {
                    if (error) throw error;
                    console.log('Datos de destinos insertados.');
                });
            } else {
                console.log('La tabla de destinos ya contiene datos.');
            }
        });
}
function AgregarAlojamientos(){
    const queryInsertarAlojamientos = `
        INSERT INTO Alojamientos (Nombre, Direccion, Tipo, PrecioPorNoche, DestinoID) VALUES
        ('Hotel Llao Llao', 'Av. Bustillo Km. 25, Bariloche', 'hotel', 300.00, 1),
        ('Hostal del Lago', 'Calle 24, Bariloche', 'hostal', 50.00, 1),
        ('Apartamentos Catedral', 'Catedral Alta Patagonia, Bariloche', 'apartamento', 120.00, 1),

        ('Hotel Huacalera', 'Ruta 9 Km. 1790, Jujuy', 'hotel', 100.00, 2),
        ('Hostal Purmamarca', 'Calle Belgrano 123, Jujuy', 'hostal', 40.00, 2),
        ('Apartamentos Tilcara', 'Av. Costanera 567, Jujuy', 'apartamento', 90.00, 2),

        ('Hotel Colonial', 'Av. del Sol 123, Merlo', 'hotel', 80.00, 3),
        ('Hostal El Mirador', 'Calle de los Almendros 456, Merlo', 'hostal', 35.00, 3),
        ('Apartamentos Las Sierras', 'Calle de la Sierra 789, Merlo', 'apartamento', 70.00, 3),

        ('Gran Hotel Cataratas', 'Av. Victoria Aguirre 150, Iguazú', 'hotel', 200.00, 4),
        ('Hostal Cataratas', 'Calle Fray Luis Beltrán 789, Iguazú', 'hostal', 60.00, 4),
        ('Apartamentos Iguazú', 'Av. Tres Fronteras 123, Iguazú', 'apartamento', 150.00, 4),

        ('Hotel Azur Real', 'San Jerónimo 243, Córdoba', 'hotel', 110.00, 5),
        ('Hostal Córdoba', 'Calle Alvear 456, Córdoba', 'hostal', 45.00, 5),
        ('Apartamentos Nueva Córdoba', 'Obispo Trejo 1100, Córdoba', 'apartamento', 95.00, 5),

        ('Hotel Tower Inn', 'Hipólito Yrigoyen 774, San Rafael', 'hotel', 120.00, 6),
        ('Hostal San Rafael', 'Av. Mitre 383, San Rafael', 'hostal', 50.00, 6),
        ('Apartamentos Los Funes', 'Calle General Paz 123, San Rafael', 'apartamento', 80.00, 6);`;

        connection.query('SELECT COUNT(*) AS count FROM Alojamientos', (error, results) => {
            if (error) throw error;
    
            if (results[0].count === 0) {
                connection.query(queryInsertarAlojamientos, (error, results) => {
                    if (error) throw error;
                    console.log('Datos de alojamientos insertados.');
                });
            } else {
                console.log('La tabla de alojamientos ya contiene datos.');
            }
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

            AgregarDestinos();
            AgregarAlojamientos();
        });
    });
});


module.exports = connection;
