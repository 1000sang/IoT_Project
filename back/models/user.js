module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(30),
            aloowNull: false,
            unique: true
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        callate: 'utf8_general_ci',
    });
    User.associate = (db) => {
        // db.User.belongsToMany(db.Device, { through: 'UserDevice', foreignKey: 'userId' });
    };
    return User;
}