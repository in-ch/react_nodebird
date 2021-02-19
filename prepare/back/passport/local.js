const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },async (email, password, done ) => {    // done은 콜백같은 것이다. 
        try{
            const user = await User.findOne({
                where: { email }
            });
            if(!user){
                return done(null, false, {reason: '존재하지 않는 사용자입니다!'})
            }
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user);
            }
            return done(null, false, {reason: '비밀번호가 틀렸습니다.'});
        } catch(e){
            console.error(error);
            return done(error);
        }
    }));
};