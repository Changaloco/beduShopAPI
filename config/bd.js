const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize( process.env.DATABASE_URL,
{
    ssl: {
        sslmode: 'require',
        rejectUnauthorized: false,
    },
    dialect: 'postgres',
    dialectOptions: {
        ssl: { require: true, rejectUnauthorized: false },
      }
});

module.exports = sequelize;