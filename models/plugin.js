module.exports = function(sequelize, DataTypes) {
  var Plugin = sequelize.define('Plugin', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        Plugin.belongsToMany(models.Collection, { through: 'feeds' });
      }
    }
  });
  return Plugin;
};
