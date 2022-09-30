const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = require('../config/bd');

const Producto = sequelize.define('Producto', {
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.TEXT
    },
    precio: {
      type: DataTypes.REAL
    },
    categoria: {
      type: DataTypes.TEXT
    },
    descripcion: {
      type: DataTypes.TEXT
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  module.exports = Producto;