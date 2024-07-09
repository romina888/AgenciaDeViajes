const db = require('../db/db');

const crearUsuario = (req, res) =>{
    const {nombre,apellido,correoElectronico,contra} = req.body;
   
    const sql = `INSERT INTO 
            Usuarios (Nombre,Apellido,CorreoElectronico,Contra) 
            VALUES (?,?,?,?)`;

    if (!nombre || !apellido || !correoElectronico || !contra) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    db.query(sql,[nombre,apellido,correoElectronico,contra], (err,result) =>
    {
        // console.log(sql)
        if(err) throw err;


        res.json({
            mensaje : 'Usuario Creado',
            idUsuario: result.insertId
            });
    });
};

module.exports = 
{
    crearUsuario,
}