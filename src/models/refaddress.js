'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class refAddress extends Model {}
  refAddress.init({
    name: DataTypes.STRING,
    parentId: DataTypes.INTEGER,
    orderIndex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'refAddress',
  });
  return refAddress;
};