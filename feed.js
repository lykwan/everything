module.exports = function(sequelize, DataTypes) {
  const Feed = sequelize.define('Feed', {

  }, {
    classMethods: {
      associate: function(models) {
        // Feed.belongsTo
      }
    }
  });

  return Feed;
};
