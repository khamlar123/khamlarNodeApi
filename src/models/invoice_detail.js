'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice_detail extends Model { }
  invoice_detail.init({
    invocieId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty:DataTypes.INTEGER,
    price:DataTypes.DOUBLE,
    productName:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'invoice_details',
  });
  return invoice_detail;
};