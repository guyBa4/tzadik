const Sequelize = require('sequelize');
const credentials = require('./credentials');
const sequelize = new Sequelize(credentials);
module.exports = sequelize;
