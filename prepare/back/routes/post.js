const express = require('express');
const path= require('path');
const fs= require('fs');
const router = express.Router();
const multer = require('multer');

const { Post, User, Image, Hashtag } = require('../models');
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

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try{
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,   //desezrizer 때문에 접근 가능 
        });
        if(hashtags){
            await Promis.all(hashtags.map((tag)=> Hashtag.findOrCreate({ 
                where : {
                            name: tag.slice(1).toLowerCase()
                        },
            })));
            await post.addHashtags(result.map((v)=> v[0]));  // findOrCreate때문에 값이 [#노드, true] , [#노드, true] 이런 식으로 나오기 떄문에 저런 식으로 저장해 주는 것이다.
        }
        if(req.body.image){
            if(Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image)=> Image.create({src: image})));
                await post.addImages(images);
            } else {
                const image = await Image.create({src:req.body.image});
                await post.addImages(image);
            }
        }

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

router.post('/:postId/retweet',isLoggedIn, async (req,res,next)=> {
    try{
        const post = await Post.findOne({
            where: {id: req.params.postId},
            include: [{
                model: Post,
                as: 'Retweet',
            }],
        });
        if(!post){
            return res.status(403).send('게시글이 존재하지 않습니다.');
        }
        if(req.user.id === post.UserId || (post.Retweet && post.Retweet.UserId === req.user.id)){
            return res.status(403).send('자기 글은 리트윗할 수 없습니다.');
        }
        const retweetTargetId = post.RetweetId || post.id; 
        const exPost = await Post.findOne({
            where: {
                Userid: req.user.id,
                RetweetId: retweetTargetId,
            },
        });
        if(exPost){
            return res.status(403).send('이미 리트윗했습니다.');
        }
        const retweet = await Post.create({
            UserId: req.user.id,
            RetweetId: retweetTargetId,
            content: 'retweet',
        });
        const retweetWithPrevPost = await Post.findOne({
            where: {id: retweet.id},
            include: [{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id','nickname'],
                }], 
            },{
                model: User,
                attributes: ['id','nickname'],
            },{
                model: Image,
            },{
                model: User,
                as: 'Likers',
                attributes: ['id'],
            },{
                model: Comment,
                include: [{
                    model: User,
                    attributes: ['id','nickname'],
                }]
            },{
                model: Post,
                as: 'Retweet',
                include: [{
                    model: User,
                    attributes: ['id','nickname'],
                }],     
            }], 
        });
        
        res.status(201).json(retweetWithPrevPost);
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