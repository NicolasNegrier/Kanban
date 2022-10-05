const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.database, process.env.username, process.env.password, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = database;
