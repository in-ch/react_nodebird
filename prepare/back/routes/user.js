const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.get('/', async (req, res, next) => {    // 로그인 유지를 위한 코드 
  try{
    if(req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch(error){
    console.error(error);
    next(error);
  }
})
router.post('/login',isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        } 
        const fullUserWithoutPassword = await User.findOne({
          where: { id: user.id },
          attributes: {
            exclude: ['password']
          },
          include: [{
            model: Post,
            attributes: ['id'],
          }, {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          }, {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          }]
        })
        return res.status(200).json(fullUserWithoutPassword);
      });
      
    })(req, res, next);
  });

router.post('/', isNotLoggedIn, async (req, res, next) => { 
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

router.post('/logout', isLoggedIn, (req, res, next)=> {
    req.logout();
    req.session.destroy();
    res.send('ok');  // 로그인 성공
});

router.patch('/nickname', isLoggedIn, async (req, res, next) => { 
  try {
    await User.update({
      nickname: req.body.nickname,
    },{
      where: {id:req.user.id},
    });
    res.status(200).json({nickname: req.body.nickname});
  } catch(error){
      console.log(error);
      next(error);  // status (500)
  }
});

module.exports = router;