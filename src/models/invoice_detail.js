'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice_detail.init({
    invocieId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty:DataTypes.INTEGER,
    price:DataTypes.DOUBLE,
    productName:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'invoice_details',
  });
  return invoice_detail;
};