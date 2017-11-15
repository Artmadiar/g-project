'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('skippedRequest', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true
    },
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('skippedRequest')
};
