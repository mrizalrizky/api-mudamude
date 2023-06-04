"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class master_events extends Model {
    static associate(models) {
      master_events.belongsTo(models.masterEventCategory, {
        foreignKey: "id_category",
      });
    }
  }
  master_events.init(
    {
      id_event: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_category: {
        type: DataTypes.INTEGER,
        references: {
          model: "master_categories",
          key: "id_category",
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      organizer_name: {
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
      },
      event_date: {
        type: DataTypes.DATEONLY,
      },
      event_time: {
        type: DataTypes.TIME,
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      benefit: {
        type: DataTypes.STRING,
      },
      eligibility: {
        type: DataTypes.STRING,
      },
      ticket_price: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "master_events",
    }
  );
  return master_events;
};
