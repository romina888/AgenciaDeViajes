const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

const usuariosRouter = require('./routes/usuarios');
const destinosRouter = require('./routes/destinos');
const alojamientosRouter = require('./routes/alojamientos');
const reservasRouter = require('./routes/reservas');
const contactoRouter = require('./routes/contacto');
let port = 3000;


app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
    }
}));

app.use(express.json());
app.use('/usuarios',usuariosRouter);
app.use('/destinos',destinosRouter);
app.use('/alojamientos',alojamientosRouter);
app.use('/reservas',reservasRouter);
app.use('/contacto',contactoRouter);

app.use(express.static(path.join(__dirname,'public')));


app.listen(port , () => 
{
    console.log(`Servidor ejecutandose localhost:${port}`)
});



