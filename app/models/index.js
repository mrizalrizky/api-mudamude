const Sequelize = require('sequelize');
const config = require('../config/db.config')[process.env.NODE_ENV || 'development']
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.mudamudeUser = require('./user/mudamude_user.model')(sequelize, Sequelize)
db.roles = require('./master/master_roles.model')(sequelize, Sequelize)
db.masterEvent = require('./master/master_events.model')(sequelize, Sequelize)
db.uploadedEvents = require('./event/uploaded_events.model')(sequelize, Sequelize)
// db.registeredEvents = require('./events/registered_events.model')(sequelize, Sequelize)
db.masterEventCategory = require("./master/master_categories.model")(sequelize, Sequelize)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.mudamudeUser.belongsTo(db.uploadedEvents, {
  foreignKey: 'id_user',
  as: 'event'
})

// db.masterEvent.belongsTo(db.masterEventCategory, {
//   foreignKey: 'id_event',
//   as: 'category'
// })

module.exports = db;
