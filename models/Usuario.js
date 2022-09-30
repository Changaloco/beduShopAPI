
const { Sequelize, DataTypes, Op } = require("sequelize");
const crypto = require('node:crypto');                             
//Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken');                          
//Importando módulo jsonwebtoken, pendiente de instalar.                 
// ???? es un misterio que resolveremos en la última sesión
const sequelize = require("../config/bd");
const secret =  require("../config/secret");

const Usuario = sequelize.define(
  "Usuario",
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isLowercase: true,
        is: /^[a-zA-Z0-9]+$/,
      },
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    gender: {
      type: DataTypes.TEXT,
    },
    salt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    direccion: {
      type: DataTypes.TEXT
    },
    tarjeta: {
      type: DataTypes.CHAR(16),
      allowNull: true,
      validate:{
          isCreditCard: true
      }
    },
    tipo: {
      type: DataTypes.TEXT,
      validate:{
          isIn: [['Comprador', 'Vendedor']]
      }
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
Usuario.createPassword = function (password) {
  salt = crypto.randomBytes(16).toString("hex"); // generando una "salt" random para cada usuario
  hash = crypto
  .pbkdf2Sync(password, salt, 10000, 512, "sha512")
  .toString("hex"); // generando un hash utilizando la salt
  return { salt : salt, hash: hash }
}
Usuario.validatePassword = function (password,user_salt,user_hash) {
  const hash = crypto
    .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
    .toString("hex");
  return user_hash === hash;
}
Usuario.generateJWT = function(user) {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60); // 60 días antes de expirar

  return jwt.sign({
    id: user._id,
    username: user.username,
    tarjeta: user.tarjeta,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
}
Usuario.toAuthJSON = function(user){
  return {
      username: user.username,
      email: user.email,
      token: Usuario.generarJWT(user)
  };
}
module.exports = Usuario;
