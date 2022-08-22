'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {}
  Product_detail.init({
    dsc: DataTypes.STRING,
    variand: DataTypes.STRING,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'product_details',
  });
  return Product_detail;
};