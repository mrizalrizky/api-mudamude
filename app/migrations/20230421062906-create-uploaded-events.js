'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('uploaded_events', {
      id_uploaded_event: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      id_event: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_events',
          key: 'id_event'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'mudamude_users',
          key: 'id_user'
        }
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
    await queryInterface.dropTable('uploaded_events');
  }
};