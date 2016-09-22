module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('App', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        App.belongsToMany(models.User, { through: 'UserApp' });
      }
    }
  });
  return App;
};
