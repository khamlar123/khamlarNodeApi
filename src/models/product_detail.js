'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_detail.init({
    dsc: DataTypes.STRING,
    variand: DataTypes.STRING,
    productId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product_details',
  });
  return Product_detail;
};