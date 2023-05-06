'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    static associate(models) {
      posts.belongsTo(models.mudamudeUser, {
        foreignKey: 'id_user'
      })

      posts.hasMany(models.postComments, {
        foreignKey: 'id_post'
      })

      posts.hasMany(models.postRatings, {
        foreignKey: 'id_post'
      })
    }
  }
  posts.init({
    id_post: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.STRING
    },
    slug: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};