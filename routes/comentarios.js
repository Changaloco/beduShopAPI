const router = require('express').Router();
const {
  createComentario,
  obtenerComentarios,
  modificarComentario,
  eliminarComentario
} = require('../controllers/comentarios')

router.get('/', obtenerComentarios)
router.post('/', createComentario)
router.put('/:id', modificarComentario)
router.delete('/:id', eliminarComentario)

module.exports = router;