const express = require('express');
const router = express.Router();
const contactocontroller = require('../controller/contactocontrolador');

router.get(`/`,contactocontroller.buscarContactos);
router.get(`/:id`,contactocontroller.buscarContactoPorId);
router.post(`/`,contactocontroller.crearContacto);
router.put(`/:id`,contactocontroller.modificarContacto);
router.delete(`/:id`,contactocontroller.eliminarContacto);


module.exports = router;