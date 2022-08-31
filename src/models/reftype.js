'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refType extends Model {}
  refType.init({
    name: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'refType',
  });
  return refType;
};