const { Sequelize, DataTypes, Op } = require('sequelize');
const Venta = require('../models/Venta');

function createVenta(req, res) {
   var body = req.body;
   Venta.create(body)
   .then(venta => 
      res.status(201).send(venta)
   )
}

function obtenerVentas(req, res) {
   Venta.findAll()
  .then(ventas =>
    res.status(201).send(ventas)
  )
}

function modificarVenta(req, res) {
   var body = req.body;
   var id = req.params.id;
   Venta.update( body , {
     where: {
       id_venta: id
     }
   })
   .then(venta =>
      res.status(201).send(venta)
   )
}

function eliminarVenta(req, res) {
  var id = req.params.id;
   Venta.destroy({
     where: {
       id_venta: id
     }
   })
   .then(r =>
      res.status(201).send("Se elimino la venta:", id)
   )
}

module.exports = {
    createVenta,
    obtenerVentas,
    modificarVenta,
    eliminarVenta
}