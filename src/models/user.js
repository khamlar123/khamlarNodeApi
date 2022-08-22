'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telegramToken: DataTypes.STRING,
    chat_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return User;
};