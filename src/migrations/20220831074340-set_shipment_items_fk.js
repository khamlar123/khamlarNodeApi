'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('shipmentItems', {
      fields: ['itemId'],
      type: 'foreign key',
      name: 'set_item_association',
      references: {
        table: 'items',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('shipmentItems', {
      fields: ['shipmentId'],
      type: 'foreign key',
      name: 'set_shipment_association',
      references: {
        table: 'shipments',
        field: 'id'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('shipmentItems', {
      fields: ['itemId'],
      type: 'foreign key',
      name: 'set_item_association',
      references: {
        table: 'items',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('shipmentItems', {
      fields: ['shipmentId'],
      type: 'foreign key',
      name: 'set_shipment_association',
      references: {
        table: 'shipments',
        field: 'id'
      }
    });

  }
};
