const db = require('../db/db');

const verificarUsuarioExistente = (correoElectronico, callback) => {
    const queryBuscarUsuario = 'SELECT * FROM Usuarios WHERE CorreoElectronico = ?';
    db.query(queryBuscarUsuario, [correoElectronico], (error, results) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, results.length > 0);
      }
    });
  };

const CrearUsuario = (req, res) =>{
    const {nombre,apellido,correoElectronico,contra} = req.body;
    if (!nombre || !apellido || !correoElectronico || !contra) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }
    
    verificarUsuarioExistente(correoElectronico, async (error, usuarioExistente) => {
        if (error) {
            console.error('Error al verificar usuario:', error);
            return res.status(500).send('Error en el servidor');
        }
    
        if (usuarioExistente) {
        return res.status(409).send('El correo electrónico ya está registrado');
        }

        const sql = `INSERT INTO 
        Usuarios (Nombre,Apellido,CorreoElectronico,Contra) 
        VALUES (?,?,?,?)`;

        db.query(sql,[nombre,apellido,correoElectronico,contra], (err,result) =>
        {
            if(err) throw err;

            res.json({
                mensaje : 'Usuario Creado',
                idUsuario: result.insertId
                });
        });
    })
    
};

const ObtenerUsuarioPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM Usuarios WHERE UsuarioID = ?';
    db.query(sql,[id], (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};

const BorrarUsuario = (req, res) =>{
    const {id} = req.params;
    const sql  = 'DELETE FROM Usuarios WHERE UsuarioID = ?';
    db.query(sql,[id],(err,result) =>
    {
        if(err) throw err;
        res.json(
            {
                message: 'Usuario eliminado'
            });
    });
};
/* Obtener todos los usuarios */
const ObtenerTodoslosUsuarios = (req, res) =>{
    const sql = 'SELECT * FROM Usuarios';
    db.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.json(result);
    });
};
/* Actualizacion de Usuarios */
const ActualizarUsuarios = (req, res) =>{
    const {id} = req.params;
    const{nombre,apellido,correoElectronico,contra} = req.body;
    
    const sql = 'UPDATE Usuarios SET Nombre = ?, Apellido = ?, CorreoElectronico= ?, Contra = ? WHERE UsuarioID = ?';
        db.query(sql, [nombre, apellido, correoElectronico, contra, id], (err,result)=>{
        if(err) throw err;
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
    verificarUsuarioExistente

}