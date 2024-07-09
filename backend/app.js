const express = require('express');
// const path = require('path');
const app = express();
const usuariosRouter = require('./routes/usuarios');
let port = 3000;



app.use(express.json());
app.use('/usuarios',usuariosRouter);


// app.use(express.static(path.join(__dirname,'public')));


app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puert ${port}`)
});



