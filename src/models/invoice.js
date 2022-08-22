'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model { }
  invoice.init({
    invocieNo: DataTypes.STRING,
    total: DataTypes.DOUBLE,
    status: DataTypes.INTEGER, //0 cancel //1 normal
    invoiceType: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    discount: DataTypes.DOUBLE,
    cutomerId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'invoices',
  });
  return invoice;
};