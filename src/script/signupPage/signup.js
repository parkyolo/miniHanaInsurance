const axios = require('axios');
const CryptoJS = require('crypto-js');
// import axios from "axios";
require("dotenv").config();



//난수 생성
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  }

  console.log("hellop");

//주민번호 앞자리 6자리 채우면 자동 커서 이동
function moveCursor(pidFront)
{
    if(pidFront.value.length==6)
    {
        document.getElementById("input-pid-back").focus();
    }
}

//휴대폰 인증약관 동의 전체 선택
function selectAll(all)
{
    const checkboxes 
    = document.getElementsByName('agree');

checkboxes.forEach((checkbox) => {
 checkbox.checked = all.checked;
})
}


//휴대폰 앞번호 가져오기
function ChangeValue(){
  let value_str=document.getElementById('pnofront');
  // if(typeof document!== "undefined")
  // {
  //   value_str=document.getElementById('pnofront');
  // }
    let frontNo=value_str.options[value_str.selectedIndex].text;
    return frontNo;
    }


//휴대폰 번호를 문자열로 만들기
function pNoToString()
{
    let frontno=ChangeValue();
    let pno=frontno+document.getElementById('pNo-back').value;
    alert(pno);
    return pno;
}

// 네이버 open api 요청하기



const access_key=process.env.NEXT_PUBLIC_ACCESS_KEY;
const secrete_key=process.env.NEXT_PUBLIC_SECRETE_KEY;
const service_id=process.env.NEXT_PUBLIC_SERVICE_ID;
console.log(access_key);
console.log(secrete_key);
console.log(service_id);


// API 호출 axios
function onLoggin() 
{

  const phoneNum="01063685605";
  console.log(phoneNum);

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

module.exports = onLoggin;

console.log(onLoggin());


