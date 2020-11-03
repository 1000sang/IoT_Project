module.exports = (sequelize, DataTypes) => {
    const UserDevice = sequelize.define('UserDevice', {
        deviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
    }, {
        charset: 'utf8',
        callate: 'utf8_general_ci',
    });
    UserDevice.associate = (db) => {
        db.UserDevice.belongsTo(db.User, { foreignKey: 'userId' });
        db.UserDevice.belongsTo(db.Device, { foreignKey: 'deviceId' });
    };
    return UserDevice;
}