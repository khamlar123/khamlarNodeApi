'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {

  }
  role.init({
    userId: DataTypes.INTEGER,
    roleName: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'role',
  });
  return role;
};