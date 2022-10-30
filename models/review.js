'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      Review.belongsTo(models.Book, {
        foreignKey: 'id',
      })
      Review.hasMany(models.comment, {
        foreignKey: 'id',
      })
      // Review.hasMany(models.like, {
      //   foreignKey: 'id',
      // })
      // Review.belongsToMany(models.User, {
      //   foreignKey: 'reviewId',
      //   through: 'likes'
      // })
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'reviews',
    modelName: 'Review',
  });
  return Review;
};