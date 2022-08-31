'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items extends Model { }
  items.init({
    itemSizeId: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    trypeId: DataTypes.INTEGER,
    cutomerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    status: DataTypes.INTEGER, // 0 instock 1 shipping 2 hasProblem 3 compled
    remarks: DataTypes.STRING,
    inventoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};