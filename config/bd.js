const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
{
    host: process.env.DB_HOST,
    dialect: 'postgres',
    ssl:true,
    native: true,dialectOptions: {
        "ssl": {"require":true }
      }
});

module.exports = sequelize;