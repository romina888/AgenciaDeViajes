const express = require('express');
const router = express.Router();

const controladorAlojamientos = require('../controller/alojamientosControlador');

router.get('/', controladorAlojamientos.ObtenerAlojamientos)

module.exports = router;