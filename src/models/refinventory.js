'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refInventory extends Model {}
  refInventory.init({
    name: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'refInventory',
  });
  return refInventory;
};