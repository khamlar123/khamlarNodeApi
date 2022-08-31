'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('items', {
      fields: ['itemSizeId'],
      type: 'foreign key',
      name: 'set_ref_sizessssss_association',
      references: {
        table: 'refSizes',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('items', {
      fields: ['trypeId'],
      type: 'foreign key',
      name: 'set_ref_type_association',
      references: {
        table: 'refTypes',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('items', {
      fields: ['cutomerId'],
      type: 'foreign key',
      name: 'set_customer_association',
      references: {
        table: 'customers',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('items', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'set_user_association',
      references: {
        table: 'users',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('items', {
      fields: ['inventoryId'],
      type: 'foreign key',
      name: 'set_inventory_association',
      references: {
        table: 'refInventories',
        field: 'id'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('items', {
      fields: ['itemSizeId'],
      type: 'foreign key',
      name: 'set_ref_sizessssss_association',
      references: {
        table: 'refSizes',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('items', {
      fields: ['trypeId'],
      type: 'foreign key',
      name: 'set_ref_type_association',
      references: {
        table: 'refTypes',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('items', {
      fields: ['cutomerId'],
      type: 'foreign key',
      name: 'set_customer_association',
      references: {
        table: 'customers',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('items', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'set_user_association',
      references: {
        table: 'users',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('items', {
      fields: ['inventoryId'],
      type: 'foreign key',
      name: 'set_inventory_association',
      references: {
        table: 'refInventories',
        field: 'id'
      }
    });
  }
};
