'use strict';
module.exports = function(sequelize, DataTypes) {
  var Plugin = sequelize.define('Plugin', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Plugin;
};