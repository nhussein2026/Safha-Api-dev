'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // like.belongsTo(models.Review, {
      //   foreignKey: 'reviewId',
      // })
      // like.belongsTo(models.User, {
      //   foreignKey: 'userId',
      // })
      // like.hasMany(models.User, {
			// 	foreignKey: 'likeableId',
			// 	constraints: false,
			// });
    }
  }
  like.init({
    userId: DataTypes.INTEGER,
    likeableId: DataTypes.INTEGER,
    likeableType: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};