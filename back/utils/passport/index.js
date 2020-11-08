const passport = require('passport');
const local = require('./local');
const { User } = require('../../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            console.log(id);
            const user = await User.findOne({ where: { userId: id } });
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    local();
}