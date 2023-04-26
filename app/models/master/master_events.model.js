'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class master_events extends Model {
    static associate(models) {
      master_events.belongsTo(models.masterEventCategory, {
        foreignKey: 'id_event',
        as: 'category'
      })
    }
  }
  master_events.init({
    id_event: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_category: {
      type: DataTypes.INTEGER,
      references: {
        model: 'master_categories',
        key: 'id_category'
      }
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    organizer_name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'master_events',
  });
  return master_events;
};