'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'skippedRequest',
        'externalUserId',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'skippedRequest',
        'firstName',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'skippedRequest',
        'lastName',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'skippedRequest',
        'username',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'skippedRequest',
        'typeOfChat',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('skippedRequest', 'externalUserId'),
      queryInterface.removeColumn('skippedRequest', 'firstName'),
      queryInterface.removeColumn('skippedRequest', 'lastName'),
      queryInterface.removeColumn('skippedRequest', 'username'),
      queryInterface.removeColumn('skippedRequest', 'typeOfChat')
    ];
  }
};
