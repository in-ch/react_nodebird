const express = require('express');
const cors = require('cors');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const app = express(); 
const db = require('./models');
const passportConfig = require('./passport');
const dotenv = require('dotenv');
const router = require('./routes/user');
const { isLoggedIn } = require('./routes/middlewares');
dotenv.config();

db.sequelize.sync()
    .then(()=>{
        console.log('db연결 성공');
    })
    .catch(()=>{
        console.log('db연결 실패');
    })

passportConfig();

app.use(express.json());   
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('inchsecretisbest'));  // 로그인 설정
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session()); // 로그인 설정 끝

app.get('/', (req, res) => {
    res.send('hello express');
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,  // 쿠키 같이 전달하고 싶으면 true로 하면 된다. 
}));

app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/posts', postsRouter);

// app.get -> 가져오다.
// app.post -> 생성하다.
// app.put -> 전체수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러 보기
// app.head -> 헤더만 가져오기(헤더/바디)
// 이게 restAPI 라고 하는데, 사실 잘 안 지킨다. 애매한 건 그냥 post로 하고 팀원들끼리 서로 합의하는 게 대부분이긴 하다. 

app.use((err, req, res, next) => {
    
});   // 에러 처리를 커스터마이징 할 수 있다. 

app.listen(3065, () => {
    console.log('서버 실행 중');
}); 


// sequelize는 database를 자바스크립트로 조작할 수 있게 하는 라이브러리이다. 