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
        Feed.hasMany(models.Subfeed, { foreignKey: 'feedId' });
        Feed.belongsTo(models.User);
        Feed.belongsTo(models.Plugin);
      }
    }
  });
  return Feed;
};
