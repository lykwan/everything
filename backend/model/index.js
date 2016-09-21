const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db =
  new Sequelize(config.database, config.username, config.password, config);
const SequelizeFixtures = require('sequelize-fixtures');
const models = {};

// add models to the db
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.charAt(0) !== '.') && (file !== "index.js");
  })
  .forEach(file => {
    const model = db.import(path.join(__dirname, file));
    models[model.name] = model;
  });

// form associations for each model
Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

module.exports = db;
