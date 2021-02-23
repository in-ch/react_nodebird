const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error,user,info)=>{
        if(err){
            console.error(error);
            return next(err);
        }
        if(info) {
            return res.status(401).send(info.reason);  // 403은 금지이고 401은 허가되지 않음이다.
        } 
        return req.login(user, async(loginErr) => {  // passport 로그인이다. 
            if(loginErr) {
                return next(loginErr);
            }
            return res.status(200).json(user);   
        });
    })(req, res, next); // 이게 미들웨이 확장이라고 한다.
}); 

router.post('/', async (req, res, next) => { 
    // 구조분해 했기 때문에 db.User라고 안 쓰고 User라고 쓸 수 있다.
    try {
        const exUser = await User.findOne({
            where : { // 조건
                email: req.body.email,
            }
        });
        if(exUser) {
            return res.status(403).send('이미 사용 중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(201).send('ok');  // 201은 사용자가 잘 생성됐다
    } catch(error){
        console.log(error);
        next(error);  // status (500)
    }
});

router.post('user/logout', (req, res, next)=> {
    console.log(req.user);
    req.logout();
    req.session.destroy();
    res.send('ok');  // 로그인 성공
});


module.exports = router;