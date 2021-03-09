const express = require('express');
const router = express.Router();
const { Post, User, Image, Comment } = require('../models');

router.get('/',async (req,res,next)=> {
    try {
        const posts = await Post.findAll({
            // where: { id: lastId },
            limit: 10,
            order: [
                ['createdAt','DESC']
                [Comment, 'createdAt','DESC'],
            ],
            incldue: [{
                model: User,
                attributes: ['id','nickname'],
            },{
                model: Image,
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id','nickname'],
                }]
            },{
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
            }]
        });
        res.status(200).json(posts);
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;