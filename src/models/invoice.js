'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  invoice.init({
    invocieNo: DataTypes.STRING,
    total: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    invoiceType: DataTypes.INTEGER,
    bankName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    discount: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'invoices',
  });
  return invoice;
};