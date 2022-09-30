const { Sequelize, DataTypes, Op } = require('sequelize');
const Usuario = require('../models/Usuario');

async function signUp(req, res) {
  const body = req.body;
  try { 
      const user = await Usuario.create(body);
      const {salt, hash} = Usuario.createPassword(body['password']);
      user.salt = salt;
      user.hash = hash;
      await user.save();
      res.status(201).json(user);
  } catch (err) {
      if (["SequelizeValidationError", "SequelizeUniqueConstraintError"].includes(err.name) ) {
          return res.status(400).json({
              error: err.errors.map(e => e.message)
          })
      }
      else {
          throw err;
      }
  }
}

async function logIn(req, res) {
  const body = req.body;
  const user = await Usuario.findOne({where: {username: body['username']}});
  if (!user) {
      return res.status(404).json({error: "User not found"});
  }
  if (Usuario.validatePassword(body['password'], user.salt, user.hash)) {
      return res.status(200).json({
        usuario: user.username,
        email: user.email,
        token: Usuario.generateJWT(user)
      });
  } else {
      return res.status(400).json({mensaje: "Password Incorrecto"});
  }
}

function obtenerUsuarios(req, res) {
   Usuario.findAll()
  .then(usuarios =>
    res.status(201).send(usuarios)
  )
}

function modificarUsuario(req, res) {
   var body = req.body;
   var id = req.params.id;
   Usuario.update( body , {
     where: {
       id_usuario: id
     }
   })
   .then(usuario =>
      res.status(201).send(usuario)
   )
}

function eliminarUsuario(req, res) {
  var id = req.params.id;
   Usuario.destroy({
     where: {
       id_usuario: id
     }
   })
   .then(r =>
      res.status(201).send("Se elimino el usuario:", id)
   )
}

module.exports = {
    signUp,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    logIn
}