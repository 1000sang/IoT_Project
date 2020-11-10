const passport = require('passport');
const local = require('./local');
const { User } = require('../../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { userId: id } });
            console.log('deserializeUser', user);
            done(null, user);
        } catch (err) {
            console.log(err);
            done(err);
        }
    });

    local();
}