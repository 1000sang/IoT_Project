const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcypt = require('bcryptjs');
const { User } = require('../../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                return done(null, false, { reason: '아이디 혹은 비밀번호가 틀렸습니다.' });
            }

            const result = await bcypt.compare(password, user.password);
            if (result) {
                return done(null, user);
            }
            return done(null, false, { reason: '아이디 혹은 비밀번호가 틀렸습니다.' });
        } catch (err) {
            console.log(err);
            return done(err);
        }
    }));
};