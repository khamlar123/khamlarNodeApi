'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model { }
  Product.init({
    prodName: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    qty: DataTypes.INTEGER,
    image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'products',
  });
  return Product;
};