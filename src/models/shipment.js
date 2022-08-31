'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipment extends Model {}
  shipment.init({
    carId: DataTypes.INTEGER,
    trackingNo: DataTypes.STRING,
    status: DataTypes.INTEGER,
    shipCost: DataTypes.DOUBLE,
    remkars: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'shipment',
  });
  return shipment;
};