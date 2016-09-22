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
          model: 'pluginId',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      collectionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'collectionId',
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
        ['pluginId', 'collectionId'], {
        indexName: 'uniquePluginCollection',
        indicesType: 'UNIQUE'
      });
    }).then(function() {
      return queryInterface.addIndex('Feeds', ['collectionId']);
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Feeds');
  }
};
