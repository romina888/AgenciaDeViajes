const express = require('express');
const router = express.Router();

const controladorUsuarios = require('../controller/usuariosControlador');

router.post('/', controladorUsuarios.CrearUsuario);
router.get('/:id', controladorUsuarios.ObtenerUsuarioPorId);
router.delete('/:id', controladorUsuarios.BorrarUsuario);
/* Probando obtener todos los usuarios */
router.get('/', controladorUsuarios.ObtenerTodoslosUsuarios);
router.put('/:id', controladorUsuarios.ActualizarUsuarios);
module.exports = router;