'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('customerAddresses', {
      fields: ['customerId'],
      type: 'foreign key',
      name: 'set_customer_addresses_association',
      references: {
        table: 'customers',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('customerAddresses', {
      fields: ['addressId'],
      type: 'foreign key',
      name: 'set_ref_sizes_association',
      references: {
        table: 'refAddresses',
        field: 'id'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('customerAddresses', {
      fields: ['customerId'],
      type: 'foreign key',
      name: 'set_customer_addresses_association',
      references: {
        table: 'customers',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('customerAddresses', {
      fields: ['addressId'],
      type: 'foreign key',
      name: 'set_ref_sizes_association',
      references: {
        table: 'refAddresses',
        field: 'id'
      }
    });
  }
};
