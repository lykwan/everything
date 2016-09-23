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
        User.belongsToMany(models.App, { through: 'UserApp' });
      }
    }
  });

  return User;
};
