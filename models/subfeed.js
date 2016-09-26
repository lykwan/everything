'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subfeed = sequelize.define('Subfeed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    params: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Subfeed;
};
