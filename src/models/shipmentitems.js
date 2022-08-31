'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipmentItems extends Model {}
  shipmentItems.init({
    itemId: DataTypes.INTEGER,
    shipmentId: DataTypes.INTEGER,
    remarks: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shipmentItems',
  });
  return shipmentItems;
};