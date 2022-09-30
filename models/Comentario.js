const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/bd');
const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Comentario = sequelize.define('Comentario', {
    id_comentario:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    rating:{
      type: DataTypes.INTEGER
    },
    comentario:{
      type: DataTypes.TEXT
    },
    fk_usuario:{
      field:'id_usuario',
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuario',
        key: 'id_usuario'
      }
    },
    fk_producto:{
      field:'id_producto',
      type: DataTypes.INTEGER,
      references:{
        model: 'Producto',
        key: 'id_producto'
      }
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });
  Usuario.hasMany(Comentario, {foreignKey: 'fk_usuario'});
  Comentario.belongsTo(Usuario, {foreignKey: 'fk_usuario'});
  Producto.hasMany(Comentario, {foreignKey: 'fk_producto'});
  Comentario.belongsTo(Producto, {foreignKey: 'fk_producto'});
  module.exports = Comentario;