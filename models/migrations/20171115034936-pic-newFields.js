'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('pic', 'externalId', { type: Sequelize.STRING, allowNull: true })
    .then(() => queryInterface.addColumn('pic', 'thumbnailUrl', { type: Sequelize.STRING, allowNull: true }));
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('pic', 'externalId')
    .then(() => queryInterface.removeColumn('pic', 'thumbnailUrl'));
  }
};
