const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const users = {}; // 데이터 저장용(DB)

http.createServer(async (req, res) => {
    try {
        /* console.log(req) */
        if (req.method === 'GET') { // 요청의 method 확인
            if(req.url === '/') { // localhost:8082 = localhost:8082/와 동일 생략된거임.
                /* console.log(req.method, req.url) */
                const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data); // .end()에 청크도 가능.
            } else if (req.url === '/about') {
                const data = await fs.readFile(path.join(__dirname, 'about.html'));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users') {
                // 일반적인 문자열은 'text/plain'을 사용한다.
                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users)); // JSON 문자열로 바꿔 반환.
            }

            // /도 /about도 /users도 아니면 주소 '기타'라고 했음.
            try { //restFront.css와 restFront.js 또한 GET 가져오는것임!
                const data = await fs.readFile(path.join(__dirname, req.url));
                return res.end(data);
            } catch (err) {
                // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생.
            }
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';

                req.on('data', (data) => { // 청크들을 모아
                    body += data;
                })
            
                // 요청의 body를 다 받은뒤 end 이벤트 실행됨.
                return req.on('end', () => {
                    console.log('POST 본문(body):', body); // {"name": "홍길동"} 요청과 응답은 JSON 형태로 자동 변경해줌.
                    const { name } = JSON.parse(body); // JSON 문자열을 자바스크립트 객체로 변환
                    const id = Date.now(); // id 생성
                    users[id] = name; // users 객체에 id 속성과 name 값을 추가해줌.
                    res.writeHead(201, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('등록 성공');
                })
            }
        } else if (req.method === 'PUT') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2]; // /user/사용자id 형태
                let body = '';

                req.on('data', (data) => {
                    body += data;
                });

                return req.on('end', () => {
                    console.log('PUT 본문(body):', body);
                    users[key] = JSON.parse(body).name; // 해당key의 속성값 수정
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    return res.end(JSON.stringify(users));
                })
            }
        } else if (req.method === 'DELETE') {
            if (req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key]; // users 객체에 key를 가진 속성과 속성값 삭제
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err);
    }
})
    .listen(8082, () => {
        console.log('8082번 포트에서 서버 대기중.');
    });