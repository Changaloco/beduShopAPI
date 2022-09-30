const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/bd');
const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Venta = sequelize.define('Venta', {
    id_venta:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cantidad:{
      type: DataTypes.INTEGER
    },
    precio:{
      type: DataTypes.REAL
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
  Producto.hasMany(Venta, {foreignKey: 'fk_producto'});
  Venta.belongsTo(Producto, {foreignKey: 'fk_producto'});
  Usuario.hasMany(Venta, {foreignKey: 'fk_usuario'});
  Venta.belongsTo(Usuario, {foreignKey: 'fk_usuario'});
  module.exports = Venta;