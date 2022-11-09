'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserType.belongsTo(models.User, {
        foreignKey: 'id',
      })
    }
  }
  UserType.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'userTypes',
    modelName: 'UserType',
  });
  return UserType;
};