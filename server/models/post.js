'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsToMany(models.User,{
        through: models.Order,
        foreignKey:"postId"
      })
    }
  }
  Post.init({
    location: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Please enter an location'
        },
        notNull:{
          args:true,
          msg:'Please enter an location'
        },
      }
    },
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    payment: DataTypes.INTEGER,
    emailPost: DataTypes.STRING,
    category: DataTypes.STRING,
  }, {
    hooks:{
      beforeCreate: (post) => {
        post.payment = 50000
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};