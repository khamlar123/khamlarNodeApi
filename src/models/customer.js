'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model { }
  Customer.init({
    fristName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customers',
  });
  return Customer;
};