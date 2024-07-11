const express = require('express');
const router = express.Router();

const controladorDestinos = require('../controller/destinosControlador');

router.get('/', controladorDestinos.ObtenerDestinos)
router.get('/alojamientos', controladorDestinos.ObtenerAlojamientosConDestinos)

module.exports = router;