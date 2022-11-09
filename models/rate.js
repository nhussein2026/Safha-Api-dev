'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rate.belongsTo(models.Book, {
        foreignKey: 'bookId'
      })
      Rate.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Rate.init({
    bookId: DataTypes.INTEGER,
    rate: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: "rates",
    modelName: 'Rate',
  });
  return Rate;
};