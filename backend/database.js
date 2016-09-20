const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://user:pass@localhost/everything');

module.exports = sequelize;
