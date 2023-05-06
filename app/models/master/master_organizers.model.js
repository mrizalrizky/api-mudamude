'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_organizers extends Model {
    static associate(models) {

    }
  }
  master_organizers.init({
    id_organizer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'master_organizers',
  });
  return master_organizers;
};