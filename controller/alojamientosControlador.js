const db = require('../db/db');

const ObtenerAlojamientos = (req, res) =>{
    const sql = 'SELECT * FROM Alojamientos';
    db.query(sql, (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};


module.exports = {
    ObtenerAlojamientos
}