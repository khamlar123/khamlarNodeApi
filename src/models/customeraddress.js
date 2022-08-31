'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cutomerAddress extends Model {}
  cutomerAddress.init({
    customerId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'customerAddress',
  });
  return cutomerAddress;
};