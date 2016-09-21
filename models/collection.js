module.exports = function(sequelize, DataTypes) {
  const Collection = sequelize.define('Collection', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniqueUserCollection'
    },
  }, {
    classMethods: {
      associate: function(models) {
        Collection.belongsTo(models.User, {
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          foreignKey: {
            allowNull: false,
            unique: 'uniqueUserCollection'
          }
        });
      }
    }
  });

  return Collection;
};
