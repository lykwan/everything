'use strict';
module.exports = function(sequelize, DataTypes) {
  var Feed = sequelize.define('Feed', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return Feed;
};
