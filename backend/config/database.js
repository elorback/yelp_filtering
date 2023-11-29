const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10, // Adjust the maximum number of connections
      min: 0,
      acquire: 300000, // Adjust the maximum time (in milliseconds) that a connection can be acquired
      idle: 3000000,
    },
  }
);

module.exports = sequelize;
