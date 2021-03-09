const express = require('express');
const router = express.Router();
const { Post, User, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/', async (req, res, next) => {
    try{
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,   //desezrizer 때문에 접근 가능 
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
                model: Image,
            },{
                model: Comment,
                include: [{
                    model: user,  // 댓글 작성자
                    attributes: ['id','nickname'],
                }]
            },{
                model: User, // 게시글 작성자 
                attributes: ['id','nickname'],
            },{
                model: User, // 좋아요 누른 사람.
            }]
        })
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
            PostId: parseInt(req.params.postId,10),
            UserId: req.user.id, 
        });
        const fullComment = await Comment.findOne({
            where: { id: comment.id},
            include: [{
                model: User,
                attributes: ['id','nickname'],
            }]
        });

        res.status(201).json(fullComment);
    } catch(error) {
        console.error(error);
        next(error);  
    }
});

router.delete('/', (req, res) => {
    
});

router.patch('/:postId/like', async (req,res,next)=> {
    try{
        const post = await Post.findOne({
            where: {id: req.params.postId}
        });
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.addLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id});

    } catch(error){
        console.error(error);
        next(error);
    }
});

router.delete('/:postId/unlike', async (req,res,next)=> {
    try{
        const post = await Post.findOne({
            where: {id: req.params.postId}
        });
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        await post.removeLikers(req.user.id);
        res.json({PostId: post.id, UserId: req.user.id});

    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;