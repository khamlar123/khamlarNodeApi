'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.addConstraint('invoice_details', {
      fields: ['invocieId'],
      type: 'foreign key',
      name: 'invoice_details_association',
      references: {
        table: 'invoices',
        field: 'id'
      }
    })

    await  queryInterface.addConstraint('invoice_details', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'invoice_details_product_association',
      references: {
        table: 'products',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeConstraint('invoice_details', {
      fields: ['invocieId'],
      type: 'foreign key',
      name: 'invoice_details_association',
      references: {
        table: 'invoices',
        field: 'id'
      }
    })

    await  queryInterface.removeConstraint('invoice_details', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'invoice_details_product_association',
      references: {
        table: 'products',
        field: 'id'
      }
    })
  }
};
