const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const CryptoJS = require('crypto-js');
require("dotenv").config();

app.use(express.json());

// 루트 엔드포인트 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

app.post('/increment', (req, res) => {
    const number = parseInt(req.body.number);
    if (isNaN(number)) {
        res.status(400).send('Invalid number');
    } else {
        const result = onLoggin(number);
        res.send(result.toString());
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


const access_key=process.env.NEXT_PUBLIC_ACCESS_KEY;
const secrete_key=process.env.NEXT_PUBLIC_SECRETE_KEY;
const service_id=process.env.NEXT_PUBLIC_SERVICE_ID;
console.log(access_key);
console.log(secrete_key);
console.log(service_id);


function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}


// API 호출 axios
function onLoggin(number) 
{

  const phoneNum="0"+number;
  console.log("onLoggin 접속완료! : "+phoneNum);

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

    const code=generateRandomCode(6);

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