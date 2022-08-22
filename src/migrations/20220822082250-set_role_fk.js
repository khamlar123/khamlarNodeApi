'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('roles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'set_role_association',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('roles', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'set_role_association',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  }
};
