'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dogname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      subdogsname: {
          type: Sequelize.STRING,
          allowNull: true
        },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tops');
  }
};
