'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refSize extends Model {}
  refSize.init({
    height: DataTypes.DOUBLE,
    width: DataTypes.DOUBLE,
    weight: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'refSize',
  });
  return refSize;
};