'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.addConstraint('invoices', {
      fields: ['cutomerId'],
      type: 'foreign key',
      name: 'invoices_cutomer_association',
      references: {
        table: 'customers',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeConstraint('invoices', {
      fields: ['cutomerId'],
      type: 'foreign key',
      name: 'invoices_cutomer_association',
      references: {
        table: 'customers',
        field: 'id'
      }
    })
  }
};
