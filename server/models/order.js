'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "customerId",
        as: "customer",
      });
      Order.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
      });
    }
  }
  Order.init({
    location: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};