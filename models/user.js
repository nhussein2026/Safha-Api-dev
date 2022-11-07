'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.UserType);
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
      })
      User.hasMany(models.Review, {
        foreignKey: 'userId',
      })
      User.hasOne(models.UserInfo, {
        foreignKey: 'userId',
      })
      User.belongsToMany(models.Book, {
        foreignKey: 'userId',
        through: 'favorites'
      })
      User.hasMany(models.Like, {
        foreignKey: 'userId',
      })
      User.belongsTo(models.Rate, {
        foreignKey: 'userId'
      })
      // User.hasMany(models.Like, {
      //   foreignKey: 'id',
      // })
      // User.belongsToMany(models.Review, {
      //   foreignKey: 'reviewId',
      //   through: 'likes'
      // })
      
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userTypeId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};