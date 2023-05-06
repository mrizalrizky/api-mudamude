'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('master_events', 'benefit', {
      type: Sequelize.STRING
    })

    await queryInterface.addColumn('master_events', 'eligibility', {
      type: Sequelize.STRING
    })

    await queryInterface.addColumn('master_events', 'ticket_price', {
      type: Sequelize.INTEGER
    })

    await queryInterface.addColumn('master_events', 'event_time', {
      type: Sequelize.TIME
    })

    await queryInterface.addColumn('master_events', 'duration', {
      type: Sequelize.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('master_events', 'benefit'),
    await queryInterface.removeColumn('master_events', 'eligibility')
    await queryInterface.removeColumn('master_events', 'ticket_price')
    await queryInterface.removeColumn('master_events', 'event_time')
    await queryInterface.removeColumn('master_events', 'duration')
  }
};
