const http = require('http');       // http 불러오기
const fs = require('fs').promises;  // file system 불러오기, 비동기 사용

const users = {}; // 데이터 저장용

// http module : http 서버를 쉽게 만들 수 있게 지원해줌.
// req(request) : 클라이언트로 부터 받은 요청 (서버가 수신)
// res(response) : (요청에 대한)서버가 클라이언트에게 보내는 응답 (클라이언트가 수신)
// * async : fs 모듈을 통해 파일(html)을 읽어올 떄, 파일을 다 불러온 다음 진행이 되어야 하기 때문에 사용한다. async-await (비동기),
//  async-await을 사용하는 경우 반드시 try-catch로 에러 처리를 해주자.
http.createServer(async (req, res) => {
  // [1] try
  try {
    // GET 요청이 온 경우
    // GET : 클라이언트가 서버에 정보를 요청하기 위해 사용되는 메서드
    if (req.method === 'GET') {
      // url이 '/'인 경우 (url : localhost:8080 or localhost:8080/)
      // 맨 마지막 '/'은 생략이 가능하다.
      if (req.url === '/') {
        // './main.html' 파일을 불러온다.
        // await 비동기, 'main.html'을 불러오는 동안 코드가 멈춰 있지 않기 위해 필요하다. 
        // 불러오지 않았다고 계속 멈춰있다면 프로그램이 정상적으로 작동하지 않기 때문에...
        const data = await fs.readFile('./main.html');
        // 헤더 작성, (200 code : 요청 성공, 해당 파일이 html임을 명시, 그리고 한글이 사용 되므로 utf-8 사용)
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // return data(파일 시스템으로 불러온 html 문서를 클라이언트에게 응답)
        return res.end(data);
      }
      // url이 '/about'인 경우 (url : localhost:8080/about)
      else if (req.url === '/about') {
        // 이하 동일...
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      }

      // ************************
      // ** 3장 추가 내용 1 : 시작 **
      /**
       * [ flow : 등록 버튼 클릭 -> 클릭 이벤트 발생 -> POST 요청(await) -> getUser() 실행 -> GET 요청(await) ]
       * [GET 요청]
       * application/json : JSON 형식으로 보내겠다.
       */
      else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        console.log("GET ('/users') 요청 확인 : ", JSON.stringify(users));
        // JSON.stringify() 메서드는 JavaScript 값이나 객체를 JSON 문자열로 변환한다.
        // users 를 JSON 형식으로 return
        return res.end(JSON.stringify(users));
      }
      // ** 3장 추가 내용 1 : 끝 **
      // ************************

      // /도 /about도 /users도 아니면
      // 기타 css, js 등 처리...
      // src="..." << 해당 부분도 결국 서버에 GET 요청을 보내기 때문에 css, js 등이 여기에 걸린다.
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    }

    // ************************
    // ** 3장 추가 내용 2 : 시작 **

    /**
     * POST 요청을 받은 경우
     * POST : POST는 클라이언트에서 서버로 리소스를 생성하거나 업데이트하기 위해 데이터를 보낼 때 사용하는 메서드
     */
    else if (req.method === 'POST') {
      // 요청받은 url이 '/user' 인 경우
      if (req.url === '/user') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        // 요청받은 데이터를 body에 저장
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          // [JSON 형식을 변환]
          // JSON.parse() : JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성합니다.
          const { name } = JSON.parse(body);
          console.log("name :", name);
          /**
           * 구별 코드를 Date.now()로 이용 (id)
           * users에 이름 저장
           */
          const id = Date.now();
          users[id] = name;
          /**
           * http state code (201) : 200을 써도 되지만 201은 생성됨을 의미.
           *                          요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었습니다. 이 응답은 일반적으로 POST 요청 또는 일부 PUT 요청 이후에 따라옵니다.
           * plain : 일반 문자열을 사용하겠다.
           */
          res.writeHead(201, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end('ok');
        });
      }
    }
    /**
     * PUT 요청을 받는 경우
     * PUT : PUT 메서드는 기존 리소스를 업데이트하는 데 가장 자주 사용된다.
     * 'user'가 'key'인 대상의 이름을 name로 수정하겠다...
     */
    else if (req.method === 'PUT') {
      /**
       * startsWith() 메소드는 어떤 문자열이 특정 문자로 시작하는지 확인하여 결과를 true 혹은 false로 반환합니다.
       * request의 url이 '/user/'로 시작하는 경우...
       */
      if (req.url.startsWith('/user/')) {
        // '/'로 split하고 2번(배열의 3번째) 값 (key 값)
        const key = req.url.split('/')[2];
        // 수신한 data를 body에 저장
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          // 데이터 저장이 끝나면
          console.log('PUT 본문(Body):', body);
          // users[key]의 값을 수신한 값으로 수정
          users[key] = JSON.parse(body).name;
          // 완료되었다고 response.
          res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('ok');
        });
      }
    }
    /**
     * DELETE 요청을 받는 경우
     * DELETE : HTTP DELETE요청 메서드 는 지정된 리소스를 삭제함.
     * 'user'가 'key'인 대상을 제거
     */
    else if (req.method === 'DELETE') {
      // request의 url 시작이 '/user/' 로 시작하는 경우
      if (req.url.startsWith('/user/')) {
        // split 후 2번(3번째) 배열 요소 (key 값)
        const key = req.url.split('/')[2];
        // 제거
        delete users[key];
        // Okay response
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('ok');
      }
    }
    // ** 3장 추가 내용 2 : 끝 **
    // ************************

    // 그 외 나머지 요청에 대하여...
    res.writeHead(404);
    return res.end('NOT FOUND');

    // [1] catch
  } catch (err) {
    console.error(err);
    // plain : 일반 문자열을 사용하겠다.
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(err.message);
  }
})
  .listen(8080, () => {
    console.log('8080 PORT WAITING...');
  });