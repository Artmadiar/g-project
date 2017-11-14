'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('pic', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('pic', 'userId');
  }
};
