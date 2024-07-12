const db = require('../db/db');

const IniciarSesion = (req, res) => {
    const { correoElectronico, contra } = req.body;
    if (!correoElectronico || !contra) {
        return res.status(400).json({ mensaje: 'Correo electrónico y contraseña son requeridos' });
    }

    const queryBuscarUsuario = 'SELECT * FROM Usuarios WHERE CorreoElectronico = ? and Contra = ?';
    db.query(queryBuscarUsuario, [correoElectronico, contra], (error, results) => {
        if (error) {
            console.error('Error al verificar usuario:', error);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        const usuario = results[0];

        if (usuario.Contra !== contra) {
            return res.status(401).send('Contraseña incorrecta');
        }

        req.session.usuario = {
            id: usuario['UsuarioID'],
            nombre: usuario['Nombre'],
            correoElectronico: usuario['CorreoElectronico']
        };

        return res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
    });
};

const CrearUsuario = (req, res) => {

    const { nombre, apellido, correoElectronico, contra } = req.body;

    if (!nombre || !apellido || !correoElectronico || !contra) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    const queryBuscarUsuario = 'SELECT * FROM Usuarios WHERE CorreoElectronico = ?';
    const sqlInsertarUsuario = `INSERT INTO Usuarios (Nombre, Apellido, CorreoElectronico, Contra) VALUES (?, ?, ?, ?)`;

    db.query(queryBuscarUsuario, [correoElectronico], (error, results) => {
        if (error) {
            console.error('Error al verificar usuario:', error);
            return res.status(500).send('Error en el servidor');
        }

        if (results.length > 0) {
            return res.status(409).send('El correo electrónico ya está registrado');
        }

        db.query(sqlInsertarUsuario, [nombre, apellido, correoElectronico, contra], (err, result) => {
            if (err) {
                console.error('Error al crear usuario:', err);
                return res.status(500).send('Error en el servidor');
            }

            res.json({
                mensaje: 'Usuario Creado',
                idUsuario: result.insertId
            });
        });
    });
};

const ObtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Usuarios WHERE UsuarioID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};

const BorrarUsuario = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Usuarios WHERE UsuarioID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.json(
            {
                message: 'Usuario eliminado'
            });
    });
};

/* Obtener todos los usuarios */
const ObtenerTodoslosUsuarios = (req, res) => {
    const sql = 'SELECT * FROM Usuarios';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};
/* Actualizacion de Usuarios */
const ActualizarUsuarios = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correoElectronico, contra } = req.body;

    const sql = 'UPDATE Usuarios SET Nombre = ?, Apellido = ?, CorreoElectronico= ?, Contra = ? WHERE UsuarioID = ?';
    db.query(sql, [nombre, apellido, correoElectronico, contra, id], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Usuario Modificado con EXITO'
        });
    });
};

module.exports =
{
    CrearUsuario,
    ObtenerUsuarioPorId,
    BorrarUsuario,
    ObtenerTodoslosUsuarios,
    ActualizarUsuarios,
    IniciarSesion
}