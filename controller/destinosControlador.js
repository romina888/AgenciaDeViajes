const db = require('../db/db');

const ObtenerDestinos = (req, res) =>{
    const sql = 'SELECT * FROM Destinos';
    db.query(sql, (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


const ObtenerAlojamientosConDestinos = (req, res) =>{
    const sql = `
        SELECT 
            d.DestinoID, 
            d.Nombre AS DestinoNombre, 
            d.Descripcion AS DestinoDescripcion, 
            d.Ubicacion, 
            a.AlojamientoID, 
            a.Nombre AS AlojamientoNombre, 
            a.Direccion, 
            a.Tipo, 
            a.PrecioPorNoche, 
            a.Descripcion AS AlojamientoDescripcion
        FROM 
            Destinos d
        INNER JOIN 
            Alojamientos a ON d.DestinoID = a.DestinoID;
    `;
    db.query(sql, (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


module.exports = {
    ObtenerDestinos,
    ObtenerAlojamientosConDestinos
}