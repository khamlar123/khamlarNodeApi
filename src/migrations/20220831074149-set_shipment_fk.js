'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('shipments', {
      fields: ['carId'],
      type: 'foreign key',
      name: 'set_car_association',
      references: {
        table: 'cars',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('shipments', {
      fields: ['carId'],
      type: 'foreign key',
      name: 'set_car_association',
      references: {
        table: 'cars',
        field: 'id'
      }
    });
  }
};
