'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('master_events', {
      id_event: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_category: {
        type: Sequelize.INTEGER,
        references: {
          model: 'master_categories',
          key: 'id_category'
        }
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING
      },
      id_organizer: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      event_date: {
        type: Sequelize.DATE
      },
      
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('master_events');
  }
};