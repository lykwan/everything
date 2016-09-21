module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    fbAccessToken: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    img: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Collection);
      }
    }
  });

  return User;
};
