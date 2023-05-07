'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class files extends Model {
    static associate(models) {
      // define association here
    }
  }
  files.init({
    id_file: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER
    },
    id_event: {
      type: DataTypes.INTEGER
    },
    filename: {
      type: DataTypes.STRING
    },
    folderpath: {
      type: DataTypes.STRING,
    },
    filetype: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'files',
  });
  return files;
};