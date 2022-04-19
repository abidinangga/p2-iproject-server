'use strict';
const {
  Model
} = require('sequelize');
const {changePassword} = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Post,{
        through: models.Order,
        foreignKey:"customerId",
        as: "user"
      })
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Please enter an email'
        },
        notNull:{
          args:true,
          msg:'Please enter an email'
        },
        isEmail:{
          args:true,
          msg:'Please enter a valid email'
        }
      }
    }, 
    password:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Please enter a password'
        },
        notNull:{
          args:true,
          msg:'Please enter a password'
        },
        len:{
          args: [5],
          msg:'Please enter a password with at least 5 characters'
        }
      }
    },
    role: DataTypes.STRING,
    name: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args:true,
          msg:'Please enter an name'
        },
        notNull:{
          args:true,
          msg:'Please enter an name'
        },
      }
    },
  }, {
    hooks:{
      beforeCreate:(User)=>{
        User.password = changePassword(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};