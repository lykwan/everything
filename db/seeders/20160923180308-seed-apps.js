'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Apps', [{
      name: 'ABC News',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Youtube Recommendations',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'NY Times',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Another one',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Apps', {
      name: ['ABC News', 'Youtube Recommendations', 'NY Times', 'Another one']
    });
  }
};
