'use strict';
// const { Sequelize } = require("sequelize")

// const db = new Sequelize("usuario_db", "root", "", {
//     host: 'localhost',
//     dialect: "mysql"
//   });

//   module.exports = db;


const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: 0,
    logging: true,
    dialectOptions: {
      options: {
        encrypt: false,
      },
    },
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to Database has been established successfuly');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
module.exports = { sequelize, DataTypes };