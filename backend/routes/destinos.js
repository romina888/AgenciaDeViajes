const express = require('express');
const router = express.Router();

const controladorDestinos = require('../controller/destinosControlador');

router.get('/', controladorDestinos.ObtenerDestinos)

module.exports = router;