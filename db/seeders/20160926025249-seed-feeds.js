'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Feeds', [{
      userId: 2,
      pluginId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Feeds', [
      { userId: 2, pluginId: 1}
    ]);
  }
};
