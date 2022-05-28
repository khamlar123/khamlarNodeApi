'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  category.init({
    parenid: DataTypes.INTEGER,
    cateName: DataTypes.STRING,
    orderIndex: DataTypes.INTEGER,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categories',
  });
  return category;
};