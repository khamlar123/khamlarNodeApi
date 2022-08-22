'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Uid extends Model { }
  Uid.init({
    uidType: DataTypes.INTEGER,
    value: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'uids',
  });
  return Uid;
};