module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        id: {
            type: DataTypes.STRING(30),
            aloowNull: false,
            unique: true
        }
    }, {
        charset: 'utf8',
        callate: 'utf8_general_ci',
    });
    User.associate = (db) => { };
    return User;
}