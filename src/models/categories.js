'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {

  }
  categories.init({
    cateName: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER,
    parentId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};