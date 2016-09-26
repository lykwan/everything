'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Subfeeds', [{
      feedId: 1,
      name: 'testname',
      params: 'testparams',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Subfeeds', [
      { feedId: 1 }
    ]);
  }
};
