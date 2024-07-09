const db = require('../db/db');

const ObtenerDestinos = (req, res) =>{
    const sql = 'SELECT * FROM Destinos';
    db.query(sql, (err,result) =>
    {
        if(err) throw err;        
        res.json(result);
    });
};

module.exports = {
     ObtenerDestinos
}