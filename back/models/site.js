module.exports = (sequelize, DataTypes) => {
    const Site = sequelize.define('Site', {
        siteCode: {
            type: DataTypes.STRING(30),
            aloowNull: false,
            unique: true
        },
        siteName: {
            type: DataTypes.STRING(30),
            aloowNull: false
        },
    }, {
        charset: 'utf8',
        callate: 'utf8_general_ci',
    });
    Site.associate = (db) => { };
    return Site;
}