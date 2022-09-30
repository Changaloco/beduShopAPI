const { Sequelize, DataTypes, Op } = require('sequelize');
const Comentario = require('../models/Comentario');

function createComentario(req, res) {
   var body = req.body;
   Comentario.create(body)
   .then(comentario => 
      res.status(201).send(comentario)
   )
}

function obtenerComentarios(req, res) {
   Comentario.findAll()
  .then(comentario =>
    res.status(201).send(comentario)
  )
}

function modificarComentario(req, res) {
   var body = req.body;
   var id = req.params.id;
   Comentario.update( body , {
     where: {
       id_comentario: id
     }
   })
   .then(comentario =>
      res.status(201).send(comentario)
   )
}

function eliminarComentario(req, res) {
  var id = req.params.id;
   Comentario.destroy({
     where: {
       id_comentario: id
     }
   })
   .then(r =>
      res.status(201).send("Se elimino el comentario:", id)
   )
}

module.exports = {
    createComentario,
    obtenerComentarios,
    modificarComentario,
    eliminarComentario
}