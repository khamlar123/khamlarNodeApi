'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await  queryInterface.addConstraint('invoices', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'invoices_user_association',
      references: {
        table: 'Users',
        field: 'id'
      }
    })

  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeConstraint('invoices', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'invoices_user_association',
      references: {
        table: 'Users',
        field: 'id'
      }
    })
  }
};
