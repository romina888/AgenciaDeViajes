const express = require('express');
const router = express.Router();

const userController = require('../controller/CodoViajeControlador');

router.post('/', userController.crearUsuario);

module.exports = router;