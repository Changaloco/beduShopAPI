const router = require('express').Router();
const auth = require('../config/auth');
const {
  crearProducto,
  obtenerProductos,
  modificarProducto,
  eliminarProducto
} = require('../controllers/productos')

router.get('/', auth.required  ,obtenerProductos)
router.post('/', auth.required,crearProducto)
router.put('/:id', auth.required,modificarProducto)
router.delete('/:id', auth.required,eliminarProducto)

module.exports = router;