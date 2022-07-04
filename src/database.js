const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.MYSQL_URL)