'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_rating_types extends Model {
    static associate(models) {
    }
  }
  master_rating_types.init({
    id_master_rating_type: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'master_rating_types',
    timestamps: false
  });
  return master_rating_types;
};