const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

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


module.exports = router;