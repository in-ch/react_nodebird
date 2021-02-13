const express = require('express');

const app = express(); 

app.get('/', (req, res) => {
    res.send('hello express');
});

app.get('/api', (req, res) => {
    res.send('hello api');
});

app.get('/api/posts', (req, res) => {
    res.send('hello posts');
});

app.post('/api/post', (req, res) => {
    res.json([
        {id : 1, content: 'hello'},
        {id : 2, content: 'hello2'},
        {id : 3, content: 'hello3'},
    ])
});

app.delete('/api/post', (req, res) => {    //delete는 포스트 맨이 필요하다. 

});

// app.get -> 가져오다.
// app.post -> 생성하다.
// app.put -> 전체수정
// app.delete -> 제거
// app.patch -> 부분 수정
// app.options -> 찔러 보기
// app.head -> 헤더만 가져오기(헤더/바디)
// 이게 restAPI 라고 하는데, 사실 잘 안 지킨다. 애매한 건 그냥 post로 하고 팀원들끼리 서로 합의하는 게 대부분이긴 하다. 

app.listen(3065, () => {
    console.log('서버 실행 중');
});