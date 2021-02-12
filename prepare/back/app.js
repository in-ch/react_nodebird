const http = require('http');

const server = http.createServer((req, res)=> {
    console.log(req.url, req.method);
    if(req.method === 'GET'){
        if(req.url === '/api/posts'){

        }
    } else if(req.method === 'POST'){
        if(req.url === '/api/post') {

        }
    } else if(req.method === 'DELETE'){
        if(req.url === '/api/post'){
            
        }
    }
    res.write('<h1>hello node1</h1>');
    res.write('<h2>hello node1</h2>');
    res.write('<h3>hello node1</h3>');
    res.write('<h4>hello node1</h4>');
    res.end('<h5>hello node</h5>');
});

server.listen(3065, () => {
    console.log('서버 실행 중');
});