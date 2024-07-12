const db = require(`../db/db`);

const buscarContactos = (req,res)=>
{
    const sql = `SELECT * FROM contacto`;
    db.query(sql ,(err,results)=>
    {
        if(err) throw err;
        res.json(results);
    });
};

const buscarContactoPorId = (req, res) =>
{
    const {id} = req.params;
    const sql =`SELECT *FROM contacto WHERE id = ?`

    db.query(sql,[id],(err, results) =>
    {
        if(err) throw err;
        res.json(results);
        });
};

const crearContacto = (req,res)=>
{
    const {nombre_apellido,correo_electronico,telefono,consulta} = req.body;
    const sql =`INSERT INTO contacto (nombre_apellido,correo_electronico,telefono,consulta) VALUES (? ,? , ?, ?)`;

    db.query(sql,[nombre_apellido,correo_electronico,telefono,consulta], (err,result)=>
    {
        if(err) throw err;
        res.json({
            mensaje:"Mensaje enviado con exito",
            idContacto : result.insertId
        });
    });
};

const modificarContacto = (req, res) =>
{
const{id} = req.params;
const {nombre_apellido,correo_electronico,telefono,consulta} = req.body;
    const sql =`UPDATE contacto SET nombre_apellido = ?,correo_electronico = ?,telefono = ?,consulta = ? WHERE id = ?`;

    db.query(sql,[nombre_apellido,correo_electronico,telefono,consulta,id], (err,result)=>
        {
            if(err) throw err;
            res.json({
                mensaje:"Consulta editada",
                idContacto : result.insertId
            });
        });

};

const eliminarContacto = (req, res) =>
{
    const {id} = req.params;

    const sql =` DELETE FROM contacto WHERE id= ?`;

    db.query(sql,[id],(err,result)=>
    {
        if(err) throw err;
        res.json({
            mensaje:"Consulta eliminada"
        });
    });
};

module.exports =
{
    buscarContactos,
    buscarContactoPorId,
    crearContacto,
    modificarContacto,
    eliminarContacto
};