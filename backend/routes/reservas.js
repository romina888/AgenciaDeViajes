
const express = require('express');
const router = express.Router();

const controladorReservas= require('../controller/reservasControlador');

router.post('/', controladorReservas.CrearReserva);
router.delete('/:id', controladorReservas.BorrarReservaPorId);
router.put('/:id', controladorReservas.ModificarReservaPorID);

module.exports = router;