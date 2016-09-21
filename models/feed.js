module.exports = function(sequelize, DataTypes) {
  var Feed = sequelize.define('Feed', {
  }, {
    classMethods: {
      associate: function(models) {
        Feed.belongsTo(models.Model, {
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
            unique: 'uniquePluginCollection'
          }
        });

        Feed.belongsTo(models.Plugin, {
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
            unique: 'uniquePluginCollection'
          }
        });
      }
    }
  });
  return Feed;
};
