const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require('passport');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const user = require('../models/user');


router.get('/', async (req, res, next) => {    // 로그인 유지를 위한 코드 
  console.log(req.headers);
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

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => { 
  try {
    await User.findOne({where: {id: req.params.userId}});
    if(!user){
      res.status(403).send('유령을 팔로우하실려는 군요.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({id: parseInt(req.params.userId,10)});
  } catch(error){
      console.log(error);
      next(error);  // status (500)
  }
});

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => { 
  try {
    await User.findOne({where: {UserId: req.params.userId}});
    if(!user){
      res.status(403).send('유령을 언팔로우하실려는 군요.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({UserId: parseInt(req.params.userId,10)});
  } catch(error){
      console.log(error);
      next(error);  // status (500)
  }
});

router.get('/followers', isLoggedIn, async (req, res, next) => { 
  try {
    await User.findOne({where: {UserId: req.user.id}});
    if(!user){
      res.status(403).send('아이디가 없으신데');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch(error){
      console.log(error);
      next(error);  // status (500)
  }
});


router.get('/followings', isLoggedIn, async (req, res, next) => { 
  try {
    await User.findOne({where: {UserId: req.user.id}});
    if(!user){
      res.status(403).send('ㅇㅏ이디가 없으신데');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch(error){
      console.log(error);
      next(error);  // status (500)
  }
});

module.exports = router;