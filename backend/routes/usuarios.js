const express = require('express');
const router = express.Router();

const controladorUsuarios = require('../controller/usuariosControlador');

router.post('/', controladorUsuarios.CrearUsuario);
router.get('/:id', controladorUsuarios.ObtenerUsuarioPorId);
router.delete('/:id', controladorUsuarios.BorrarUsuario);

module.exports = router;