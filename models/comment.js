'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.belongsTo(models.User, {
        foreignKey: 'userId',
      })
      comment.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      })
      comment.hasMany(models.like, {
				foreignKey: 'likeableId',
				constraints: false,
				scope: {
					likeableType: 'comment'
				}
			});
    }
  }
  comment.init({
    userId: DataTypes.INTEGER,
    reviewId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    deletedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};