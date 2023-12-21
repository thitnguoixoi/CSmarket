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
        defaultValue: 1,
        type: Sequelize.INTEGER,
        references: {
          model: 'Group_Users',
          key: 'id'
        }
      },
      TradeURL: {
        allowNull: true,
        type: Sequelize.STRING
      },
      Wallet: {
        defaultValue: 0.00,
        type: Sequelize.STRING
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