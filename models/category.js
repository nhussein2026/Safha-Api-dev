'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // category.hasMany(models.Book, {
      //   foreignKey: 'categoryId',
      // })
      category.belongsToMany(models.Book, {
        foreignKey: 'categoryId',
        through: 'bookTypes'
      })
    }
  }
  category.init({
    name: DataTypes.STRING,
    des: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};