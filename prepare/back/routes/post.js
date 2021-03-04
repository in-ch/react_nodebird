const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/', async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,   //desezrizer 때문에 접근 가능 
        });
        res.status(201).json(post);
    } catch(error) {
        console.error(error);
        next(error);  
    }
});

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
    try{
        const post = await Post.findOne({
            where: {id: req.params.postId}
        });        // 그 게시글이 진짜 존재하는 지 확인해야함.

        if(!post){
            return res.status(403).send('존재하지 않는 게시글입니다.');
        }
        const comment = await Comment.create({
            content: req.body.content,
            PostId: req.params.postId,
            UserId: req.user.id, 
        });
        res.status(201).json(comment);
    } catch(error) {
        console.error(error);
        next(error);  
    }
});

router.delete('/', (req, res) => {
    
});

module.exports = router;