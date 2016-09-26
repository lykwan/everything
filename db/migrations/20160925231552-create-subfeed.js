'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Subfeeds', {
      id: {
        allownull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allownull: false,
        type: Sequelize.STRING
      },
      params: {
        allownull: false,
        type: Sequelize.STRING
      },
      feedId: {
        allownull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'feeds',
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
      return queryInterface.addIndex('Subfeeds', ['feedId']);
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Subfeeds');
  }
};
