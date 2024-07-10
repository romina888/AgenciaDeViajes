const express = require('express');
const path = require('path');
const app = express();
const usuariosRouter = require('./routes/usuarios');
const destinosRouter = require('./routes/destinos');
const alojamientosRouter = require('./routes/alojamientos');
const reservasRouter = require('./routes/reservas');
let port = 3000;



app.use(express.json());
app.use('/usuarios',usuariosRouter);
app.use('/destinos',destinosRouter);
app.use('/alojamientos',alojamientosRouter);
app.use('/reservas',reservasRouter);

app.use(express.static(path.join(__dirname,'public')));


app.listen(port , () => 
{
    console.log(`Servidor ejecutandose localhost:${port}`)
});


