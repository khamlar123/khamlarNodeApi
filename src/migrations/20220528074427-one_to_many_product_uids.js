'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await  queryInterface.addConstraint('uids', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'product_associate_one_to_mayny_uids',
      references: {
        table: 'Products',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await  queryInterface.removeConstraint('uids', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'product_associate_one_to_mayny_uids',
      references: {
        table: 'Products',
        field: 'id'
      }
    })
  }
};
