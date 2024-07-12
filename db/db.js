const mysql = require("mysql2");

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123',
    port: 3306,
});

/* Prueba de conexion */

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
        INSERT INTO Destinos (Nombre, Descripcion, Ubicacion, Imagen) VALUES
        ('Bariloche', 'Destino turístico en la Patagonia', 'Río Negro, Argentina', 'img/card4Bariloche1.webp'),
        ('Jujuy', 'Destino con paisajes de montaña', 'Jujuy, Argentina', 'img/card5Jujuy1.webp'),
        ('Merlo, San Luis', 'Destino conocido por su microclima', 'San Luis, Argentina', 'img/card6Sanluis1.jpg'),
        ('Las Cataratas del Iguazú', 'Una de las maravillas naturales del mundo', 'Misiones, Argentina', 'img/card1cataratas.webp'),
        ('Córdoba', 'Ciudad histórica con gran vida nocturna', 'Córdoba, Argentina', 'img/card3Cordoba.jpg'),
        ('San Rafael, Mendoza', 'Destino famoso por sus bodegas y paisajes', 'Mendoza, Argentina', 'img/card2sanrafael.jpg');`;

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
            INSERT INTO Alojamientos (Nombre, Direccion, Tipo, PrecioPorNoche, Descripcion, DestinoID) VALUES
            ('Hotel Llao Llao', 'Av. Bustillo Km. 25, Bariloche', 'hotel', 3000.00, 'Lujoso hotel con vistas impresionantes del lago y montañas. Disfruta de habitaciones elegantes, servicio de primera clase y una variedad de actividades recreativas al aire libre, incluyendo golf, senderismo y deportes acuáticos.', 1),

            ('Hotel Huacalera', 'Ruta 9 Km. 1790, Jujuy', 'hotel', 1000.00, 'Hotel boutique en la Quebrada de Humahuaca. Combina el encanto de la arquitectura colonial con instalaciones modernas, proporcionando una experiencia única en un entorno histórico y cultural.', 2),

            ('Hotel Colonial', 'Av. del Sol 123, Merlo', 'hotel', 8000.00, 'Hotel elegante con piscina y jardines. Ofrece habitaciones espaciosas y un servicio de calidad, perfecto para una escapada relajante en la naturaleza.', 3),

            ('Gran Hotel Cataratas', 'Av. Victoria Aguirre 150, Iguazú', 'hotel', 2000.00, 'Hotel de lujo con vistas a las cataratas. Ofrece instalaciones de primer nivel, incluyendo spa, restaurantes gourmet y acceso directo a las cataratas del Iguazú.', 4),

            ('Hotel Azur Real', 'San Jerónimo 243, Córdoba', 'hotel', 1100.00, 'Hotel moderno en el centro histórico de Córdoba. Combina el encanto de la arquitectura clásica con comodidades modernas, ideal para viajeros de negocios y turistas.', 5),

            ('Hotel Tower Inn', 'Hipólito Yrigoyen 774, San Rafael', 'hotel', 1200.00, 'Hotel de negocios con todas las comodidades. Ofrece habitaciones modernas, salas de conferencias y un restaurante de alta calidad, ideal para viajes de negocios y eventos.', 6)
        `;

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


        console.log("Base de datos creada");

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
                    Ubicacion VARCHAR(255) NOT NULL,
                    Imagen VARCHAR(255) -- Ajusta la longitud según necesites
                );`;
            
            const queryCrearTablaAlojamientos = `
                CREATE TABLE IF NOT EXISTS Alojamientos (
                    AlojamientoID INT AUTO_INCREMENT PRIMARY KEY,
                    Nombre VARCHAR(100) NOT NULL,
                    Direccion VARCHAR(200),
                    Tipo ENUM('hotel', 'hostal', 'apartamento') NOT NULL,
                    PrecioPorNoche DECIMAL(10, 2) NOT NULL,
                    Descripcion TEXT,
                    DestinoID INT,
                FOREIGN KEY (DestinoID) REFERENCES Destinos(DestinoID) ON DELETE SET NULL
                ); `;
            
            
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

                const queryCrearTablaContacto =`
                CREATE TABLE IF NOT EXISTS Contacto(
                    ContactoID INT AUTO_INCREMENT PRIMARY KEY,
                    nombre_apellido VARCHAR(250) NOT NULL,
                    correo_electronico VARCHAR(250) NOT NULL,
                    telefono VARCHAR(20) NOT NULL,
                    consulta TEXT NOT NULL 
                    );`;
            
            crearTabla(queryCrearTablaUsuarios);
            crearTabla(queryCrearTablaDestinos);
            crearTabla(queryCrearTablaAlojamientos);
            crearTabla(queryCrearTablaReservas);
            crearTabla(queryCrearTablaContacto);

            AgregarDestinos();
            AgregarAlojamientos();
        });
    });
});


module.exports = connection;
