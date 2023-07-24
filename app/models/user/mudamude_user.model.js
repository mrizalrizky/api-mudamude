"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mudamude_user extends Model {
    static associate(models) {
      mudamude_user.belongsTo(models.masterRoles, {
        foreignKey: "id_role",
      }),
        mudamude_user.hasMany(models.uploadedEvents, {
          foreignKey: "id_user",
        });

      mudamude_user.hasMany(models.registeredEvents, {
        foreignKey: "id_user",
      });
    }
  }
  mudamude_user.init(
    {
      id_user: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      id_role: {
        type: DataTypes.INTEGER,
        references: {
          model: "master_roles",
          key: "id_role",
        },
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      institution: DataTypes.STRING,
      major: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "mudamude_user",
    }
  );
  return mudamude_user;
};
