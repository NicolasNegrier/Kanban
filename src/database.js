const { Sequelize } = require('sequelize');

// const database = new Sequelize(process.env.database, process.env.username, process.env.password, {
//   host: 'localhost',
//   dialect: 'mysql',
// });

const database = new Sequelize(process.env.database);

module.exports = database;
