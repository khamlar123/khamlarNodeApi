'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('imgItems', {
      fields: ['refImgId'],
      type: 'foreign key',
      name: 'set_ref_img_item_association',
      references: {
        table: 'refImgs',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('imgItems', {
      fields: ['refImgId'],
      type: 'foreign key',
      name: 'set_ref_img_item_association',
      references: {
        table: 'refImgs',
        field: 'id'
      }
    });
  }
};
