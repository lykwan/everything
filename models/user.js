'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    fbId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Feed, { foreignKey: 'userId' });
        User.belongsToMany(models.Plugin, { through: models.Feed });
      },
    },

    instanceMethods: {
    //   getSubfeeds: function(models) {
    //     this.getFeeds()
    //     .then(feeds => {
    //       return models.Subfeed.findPluginsFromFeeds(
    //         feeds, models.Feed, models.Plugin
    //       );
    //     });
    //   }
    }
  });
  return User;
};
