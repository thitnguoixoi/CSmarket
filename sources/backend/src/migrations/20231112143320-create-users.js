'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SteamID: {
        type: Sequelize.STRING
      },
      GroupID: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      TradeURL: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Wallet: {
        defaultValue: 0,
        type: Sequelize.FLOAT
      },
      CountOpen: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      CountUpgrade: {
        defaultValue: 0,
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
    await queryInterface.dropTable('Users');
  }
};