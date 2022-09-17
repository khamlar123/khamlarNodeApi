'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refImgs extends Model {}
  refImgs.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'refImgs',
  });
  return refImgs;
};