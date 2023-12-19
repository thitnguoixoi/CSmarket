'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Skins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Type: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Float: {
        type: Sequelize.STRING
      },
      Price: {
        type: Sequelize.FLOAT
      },
      Rating: {
        type: Sequelize.STRING
      },
      Image: {
        type: Sequelize.STRING
      },
      Count: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Skins');
  }
};