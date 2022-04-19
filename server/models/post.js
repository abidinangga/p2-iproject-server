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
        foreignKey:"postId",
        as: "post"
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
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    hooks:{
      beforeCreate: (post) => {
        post.payment = 0
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};