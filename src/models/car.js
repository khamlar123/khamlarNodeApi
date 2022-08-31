'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car extends Model {}
  car.init({
    carNumber: DataTypes.STRING,
    status: DataTypes.INTEGER,
    orderIndex: DataTypes.INTEGER,
    remarks: DataTypes.STRING,
    star: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'car',
  });
  return car;
};