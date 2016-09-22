'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserApps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      appId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'app',
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
      return queryInterface.addIndex('UserApps',
        ['userId', 'appId'], {
        indexName: 'uniqueUserApp',
        indicesType: 'UNIQUE'
      });
    }).then(function() {
      return queryInterface.addIndex('UserApps', ['appId']);
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserApps');
  }
};
