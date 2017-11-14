'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('picHashtag', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    picId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pic',
        key: 'id'
      }
    },
    hashtagId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'hashtag',
        key: 'id'
      }
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('picHashtag')
};
