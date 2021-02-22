const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
    passport.serializeUser((user, done)=>{
        alert(user.id);
        done(null, user.id);  // 쿠키만 저장할 1번만 저장하는 것 
                              // 첫번쨰는 서버 에러, 두번재 인자가 성공
    });

    passport.deserializeUser(async(id, done)=>{
        try{
            const user = await User.findOne({ where : {id}});
            done(null, user);
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    local();
};