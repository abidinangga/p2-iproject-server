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
        foreignKey: "userId",
      });
      Order.belongsTo(models.Post, {
        foreignKey: "postId",
      });
    }
  }
  Order.init({
    location: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.STRING,
    emailPost: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    hooks:{

    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};