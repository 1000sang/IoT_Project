const Sequelize = require('sequelize');
const env = process.env.NODE_DEV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.User = require('./user')(sequelize, Sequelize);
db.Device = require('./device')(sequelize, Sequelize);
db.Site = require('./site')(sequelize, Sequelize);

db.User.belongsToMany(db.Device, { through: 'UserDevice' });
db.Device.belongsToMany(db.User, { through: 'UserDevice' });

db.Site.hasMany(db.Device, { foreignKey: 'siteCode', sourceKey: 'id' });
db.Device.belongsTo(db.Site, { foreignKey: 'siteCode', sourceKey: 'id' });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
