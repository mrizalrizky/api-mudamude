'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_ratings extends Model {
    static associate(models) {
      post_ratings.belongsTo(models.masterRatingType, {
        foreignKey: 'id_master_rating_type'
      })

      post_ratings.belongsTo(models.postsDB, {
        foreignKey: 'id_post'
      })
    }
  }
  post_ratings.init({
    id_post_rating: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_master_rating_type: {
      type: DataTypes.INTEGER
    },
    id_post: {
      type: DataTypes.BIGINT
    },
    id_user: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'post_ratings',
  });
  return post_ratings;
};