'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {

  }
  menus.init({
    menuName: DataTypes.STRING,
    status: DataTypes.INTEGER,
    orderIndex: DataTypes.INTEGER,
    icon: DataTypes.STRING,
    parentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menus',
  });
  return menus;
};