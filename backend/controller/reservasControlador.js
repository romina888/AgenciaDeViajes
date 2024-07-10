const db = require('../db/db');

const CrearReserva = (req, res) =>{
    const {fechaInicio,fechaFin,precioTotal,usuarioID,AlojamientoID} = req.body;
   
    const sql = `INSERT INTO 
            Reservas (FechaInicio,FechaFin,PrecioTotal,UsuarioID,AlojamientoID) 
            VALUES (?,?,?,?,?)`;

    if (!fechaInicio || !fechaFin || !precioTotal || !usuarioID|| !AlojamientoID) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }

    db.query(sql,[fechaInicio,fechaFin,precioTotal,usuarioID,AlojamientoID], (err,result) =>
    {  
        if(err) throw err;
        
        res.json({
            mensaje : 'Usuario Creado',
            idUsuario: result.insertId
            });
    });
};

const BorrarReservaPorId = (req, res) =>{
    const id = req.params;
    const sql = `DELETE FROM Reservas WHERE ReservaID = ?`;

    db.query(sql,[id], (err,result) =>
    {  
        if(err) throw err;
        
        res.json({
            mensaje : 'Reserva Eliminada',
            idUsuario: result.insertId
            });
    });
};

const ModificarReservaPorID = (req, res) => {
    const {id} = req.params;

    const {fechaInicio,fechaFin,precioTotal,usuarioID,AlojamientoID} = req.body;

    if (!fechaInicio || !fechaFin || !precioTotal || !usuarioID|| !AlojamientoID) {
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }


    const sql = `
        UPDATE Reservas
        SET 
            FechaInicio = ?,
            FechaFin = ?,
            PrecioTotal = ?,
            UsuarioID = ?,
            AlojamientoID = ?
        WHERE
            ReservaID = ?;`;
            
    db.query(sql, [fechaInicio,fechaFin,precioTotal,usuarioID,AlojamientoID,id], (err, result) => {

        if(err) throw err;
        
        res.json({
            mensaje : 'Reserva modificada con exito',
            idReserva: id
            });
    })
}

/* Obtener todos las reservas */
const ObtenerTodasLasReservas = (req, res) =>{
    const sql = 'SELECT * FROM Reservas';
    db.query(sql,(err,result)=>
    {
        if(err) throw err;
        res.json(result);
    });
};

module.exports = {
    CrearReserva,
    BorrarReservaPorId,
    ModificarReservaPorID,
    ObtenerTodasLasReservas
}