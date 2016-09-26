'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Feeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pluginId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'plugin',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(function() {
      return queryInterface.addIndex('Feeds',
        ['userId', 'pluginId'], {
        indexName: 'uniqueUserPlugin',
        indicesType: 'UNIQUE'
      });
    }).then(function() {
      return queryInterface.addIndex('Feeds', ['pluginId']);
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Feeds');
  }
};
