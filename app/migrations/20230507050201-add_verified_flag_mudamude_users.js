'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('mudamude_users', 'verified_flag', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('mudamude_users', 'verified_flag')
  }
};
