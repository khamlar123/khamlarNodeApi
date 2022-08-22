'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class adsverti extends Model {

  }
  adsverti.init({
    adsUrl: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'adsverti',
  });
  return adsverti;
};