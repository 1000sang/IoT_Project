module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        deviceId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        siteCode: {
            type: DataTypes.STRING(30),
            aloowNull: false
        },
        topic: {
            type: DataTypes.STRING(30),
            aloowNull: false
        }
    }, {
        charset: 'utf8',
        callate: 'utf8_general_ci',
    });
    Device.associate = (db) => {
        // db.Device.belongsToMany(db.User, { through: 'UserDevice', foreignKey: 'deviceId' });
    };
    return Device;
}