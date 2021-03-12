const express = require('express');
const path= require('path');
const fs= require('fs');
const router = express.Router();
const multer = require('multer');

const { Post, User, Image } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

try {
    fs.accessSync('uploads');
} catch(error){
    console.log('업로드 폴더가 없으므로 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    }, 
    filename(req, file, done){
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 파일 이름
      done(null, basename + new Data().getTime() + ext); 
    }
  }),
  limits : { fileSize : 20 * 1024* 1024 }, // 20 MB
});

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

router.delete('/:postId/delete',isLoggedIn, async (req,res,next)=> {
    try{
        await Post.destroy({
            where: {
                id: req.params.postId,
                UserId: req.user.id,
            },
        });
        res.json({PostId: parseInt(req.params.postId,10)});
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post('/images', isLoggedIn, upload.array('image'), async(req,res,next )=> {  // 하나면 array 대신 single 쓰면 됨. fills는 파일 input이 두개 있을 때
    console.log(req.files);
    res.json(req.files.map((v)=> v.filename));
})



module.exports = router;