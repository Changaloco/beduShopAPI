const router = require('express').Router();
const {
    createVenta,
    obtenerVentas,
    modificarVenta,
    eliminarVenta
} = require('../controllers/ventas')
const auth = require('../config/auth');
router.post('/',auth.hasPaymentMethod, createVenta)
router.get('/',obtenerVentas)
router.put('/:id',auth.hasPaymentMethod, modificarVenta)
router.delete('/:id', auth.hasPaymentMethod,eliminarVenta)

module.exports = router;