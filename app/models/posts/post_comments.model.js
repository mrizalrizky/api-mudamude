'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_comments extends Model {
    static associate(models) {
      post_comments.belongsTo(models.mudamudeUser, {
        foreignKey: 'id_user'
      })
    }
  }
  post_comments.init({
    id_post_comment: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_post: {
      type: DataTypes.BIGINT
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    comment: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'post_comments',
  });
  return post_comments;
};