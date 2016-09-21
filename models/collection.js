module.exports = function(sequelize, DataTypes) {
  const Collection = sequelize.define('Collection', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniqueUserFeed'
    },
  }, {
    classMethods: {
      associate: function(models) {
        Collection.belongsTo(models.User, {
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
            unique: 'uniqueUserFeed'
          }
        });
      }
    }
  });

  return Collection;
};
