var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('welcome to bedushop api');
});
router.use('/productos', require('./productos'));
router.use('/usuarios', require('./usuarios'));
router.use('/comentarios', require('./comentarios'));
router.use('/ventas', require('./ventas'));
// exportamos nuestro nuevo router
module.exports = router;