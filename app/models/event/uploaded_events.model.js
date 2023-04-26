'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class uploaded_events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  uploaded_events.init({
    id_uploaded_event: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_event: {
      type: DataTypes.INTEGER,
      references: {
        model: 'master_events',
        key: 'id_event'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'mudamude_users',
        key: 'id_user'
      }
    }
  }, {
    sequelize,
    modelName: 'uploaded_events',
  });
  return uploaded_events;
};