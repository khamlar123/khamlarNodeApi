'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class imgItems extends Model {}
  imgItems.init({
    imgUrl: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER,
    refImgId: DataTypes.INTEGER,
    link:DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'imgItems',
  });
  return imgItems;
};