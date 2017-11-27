'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('pic', 'productUrl',
      {
        type: Sequelize.STRING,
        allowNull: true
      });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('puc', 'productUrl');
  }
};
