'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models?.Review, {
        foreignKey: 'id',
      })
      // Book.belongsTo(models.category, {
      //   foreignKey: 'id',
      // })
      Book.belongsTo(models?.Publisher, {
        foreignKey: 'id',
      })
      Book.belongsToMany(models?.User, {
        foreignKey: 'bookId',
        through: 'favorites'
      })
      Book.belongsToMany(models?.category, {
        foreignKey: 'bookId',
        through: 'bookTypes'
      })
      // Book.hasOne(models?.Photo, {
			// 	foreignKey: 'photoableId',
			// 	constraints: false,
			// 	scope: {
			// 		photoableType: 'book'
			// 	}
			// });
    }
  }
  Book.init({
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    pagesCount: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    des: DataTypes.TEXT,
    cover: DataTypes.STRING,
    publish: DataTypes.DATE,
    lang: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'books',
    modelName: 'Book',
  });
  return Book;
};