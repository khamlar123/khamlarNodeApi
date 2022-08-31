'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('userMenus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'set_userMenus_association',
      references: {
        table: 'users',
        field: 'id'
      }
    });

    await queryInterface.addConstraint('userMenus', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'set_roles_association',
      references: {
        table: 'roles',
        field: 'id'
      }
    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('userMenus', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'set_userMenus_association',
      references: {
        table: 'users',
        field: 'id'
      }
    });

    await queryInterface.removeConstraint('userMenus', {
      fields: ['roleId'],
      type: 'foreign key',
      name: 'set_roles_association',
      references: {
        table: 'roles',
        field: 'id'
      }
    });

  }
};
