'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {}
  category.init({
    parenId: DataTypes.INTEGER,
    cateName: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categories',
  });
  return category;
};