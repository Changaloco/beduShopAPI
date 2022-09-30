const router = require('express').Router();
const {
    signUp,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    logIn
} = require('../controllers/usuarios')

router.post('/signUp', signUp)
router.post('/logIn', logIn)
router.get('/', obtenerUsuarios)
router.put('/:id', modificarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router;