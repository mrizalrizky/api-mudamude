'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registered_events extends Model {
    static associate(models) {
      registered_events.belongsTo(models.masterEvent, {
        foreignKey: 'id_event'
      })
    }
  }
  registered_events.init({
    id_registered_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_event: {
      type: DataTypes.INTEGER,
    },
    id_user: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'registered_events',
  });
  return registered_events;
};