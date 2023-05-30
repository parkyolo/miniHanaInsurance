const express = require('express');
const app = express();
const path = require('path');
const port = 3001;
const axios = require('axios');
const CryptoJS = require('crypto-js');
require("dotenv").config();

const publicPath = path.join(__dirname, '../../../public');

app.use(express.static(publicPath));
app.use(express.json());

// 루트 엔드포인트 처리
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'html/signupPage/signup.html'));
});
  
app.get('/info', (req, res) => {
    res.sendFile(path.join(publicPath, 'html/signupPage/info.html'));
  });


  app.post('/increment', (req, res) => {
    const number = req.body.number;
    const inputCode=req.body.code;
    console.log("서버로 넘어온 넘버 : ",number);
    if (isNaN(number)) {
        res.status(400).send('Invalid number');
    } else {
      const result = onLoggin(number,inputCode);
      res.send(result.toString());
    }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
console.log('hello');



function generateRandomCode(n) {
  let str = ''
  for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
  }
  return str
}


function onLoggin(number,inputCode) 
  {
    const access_key=process.env.NEXT_PUBLIC_ACCESS_KEY;
const secrete_key=process.env.NEXT_PUBLIC_SECRETE_KEY;
const service_id=process.env.NEXT_PUBLIC_SERVICE_ID;
    const phoneNum=number;
    const code=inputCode;

    // console.log("onLoggin 접속완료! : "+phoneNum);
  
    console.log(access_key);
    const method = "POST";
      const space = " ";
      const newLine = "\n";
      const url = `https://sens.apigw.ntruss.com/sms/v2/services/${service_id}/messages`;
      const url2 = `/sms/v2/services/${service_id}/messages`;
  
  
      const finErrCode = 404;
      const axios = require('axios');
      const CryptoJS = require('crypto-js');
      const date = Date.now().toString();
  
  
      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secrete_key);
      hmac.update(method);
      hmac.update(space);
      hmac.update(url2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(access_key);
      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);
  
  
  
      axios({
        method: method,
        // request는 uri였지만 axios는 url이다
        url: url,
        headers: {
            "Contenc-type": "application/json; charset=utf-8",
            "x-ncp-iam-access-key": access_key,
            "x-ncp-apigw-timestamp": date,
            "x-ncp-apigw-signature-v2": signature,
        },
        // request는 body였지만 axios는 data다
        data: {
            type: "SMS",
            countryCode: "82",
            from: "01063685605",
            // 원하는 메세지 내용
            content: `하나손해보험 인증번호입니다.`,
            messages: [
            // 신청자의 전화번호
                { to:  `${phoneNum}`,
  
                 content:'하나손해보험 인증번호는 '+ code +'입니다.'
                },],
        },
    }).then(res => {
        console.log(res.data);
    })
        .catch(err => {
            console.log(err);
        })
    return finErrCode;
  
  
  
  }