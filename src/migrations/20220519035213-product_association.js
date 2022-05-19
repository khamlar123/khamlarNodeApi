'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await  queryInterface.addConstraint('Product_details', {
        fields: ['productId'],
        type: 'foreign key',
        name: 'product_store_association',
        references: {
          table: 'Products',
          field: 'id'
        }
      })
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeConstraint('Product_details', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'product_store_association',
      references: {
        table: 'Products',
        field: 'id'
      }
    })
  }
};
