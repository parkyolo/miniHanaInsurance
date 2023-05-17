// const axios = require('axios');
// const CryptoJS = require('crypto-js');

//난수 생성
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

function print()
{
    console.log("I'm from singup.js");
}
console.log("hellop");

//주민번호 앞자리 6자리 채우면 자동 커서 이동
function moveCursor(pidFront) {
    if (pidFront.value.length == 6) {
        document
            .getElementById("input-pid-back")
            .focus();
    }
}

//주민번호 모두 입력했는지 확인
function isPnoNull(e) {

    const pnoFront = document
        .getElementById('input-pid-front')
        .value;
    const pnoBack = document
        .getElementById('input-pid-back')
        .value;

    if (e.keyCode == 13) {
        console.log(pnoFront);
        console.log(pnoBack);
        if (pnoFront.length == 0 || pnoBack.length == 0) {
            console.log('주민번호는 모두 입력해야합니다.');
        }
    }
}

//휴대폰 인증약관 동의 전체 선택
function selectAll(all) {
    const checkboxes = document.getElementsByName('agree');

    checkboxes.forEach((checkbox) => {
        checkbox.checked = all.checked;
    })
}

//휴대폰 인증약관 전체 동의여부 선택
function isAllChecked()
{
    const checkboxLength = document.querySelectorAll('input[name="agree"]:checked').length;
    
    
        if(checkboxLength!=4)
        {
            console.log("전체동의 하셔야합니다.");
            return false;
        }
        else return true;
        
}



//휴대폰 앞번호 가져오기
function ChangeValue() {
    let value_str = document.getElementById('pnofront');
    // if(typeof document!== "undefined") {
    // value_str=document.getElementById('pnofront'); }
    let frontNo = value_str
        .options[value_str.selectedIndex].text;
    return frontNo;
}

//휴대폰 번호를 문자열로 만들기
function pNoToString() {
    let frontno = ChangeValue();
    let pno = frontno + document
        .getElementById('pNo-back')
        .value;
    alert(pno);
    return pno;
}

// 네이버 open api 요청하기 const access_key=process.env.NEXT_PUBLIC_ACCESS_KEY; const
// secrete_key=process.env.NEXT_PUBLIC_SECRETE_KEY; const
// service_id=process.env.NEXT_PUBLIC_SERVICE_ID; console.log(access_key);
// console.log(secrete_key); console.log(service_id);

function onLoggin() {
    
    if(isAllChecked()==false)
        return;

    const code = generateRandomCode(6);
    console.log(code);
    localStorage.setItem('code', code);
}

// API 호출 axios function onLoggin() {   const access_key="9DEXTFVR8GfDIjwK4Gmj";
// const secrete_key="FxJSD89P2ySc3xpT3dvrHaW5CjDGmEDfUxtdwx2o";   const
// service_id="ncp:sms:kr:307678834843:minihanasonbo";   const
// phoneNum="01063685605";   console.log(phoneNum);   console.log(access_key);
// const method = "POST";     const space = " ";     const newLine = "\n";
// const url =
// `https://sens.apigw.ntruss.com/sms/v2/services/${service_id}/messages`;
// const url2 = `/sms/v2/services/${service_id}/messages`;     const date =
// Date.now().toString();     const hmac =
// CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secrete_key);
// hmac.update(method);     hmac.update(space);     hmac.update(url2);
// hmac.update(newLine);     hmac.update(date);     hmac.update(newLine);
// hmac.update(access_key);     const hash = hmac.finalize();     const
// signature = hash.toString(CryptoJS.enc.Base64);     console.log(signature);
// axios({       method: method,        request는 uri였지만 axios는 url이다       url:
// url,       headers: {           "Contenc-type": "application/json;
// charset=utf-8",           "x-ncp-iam-access-key": access_key,
// "x-ncp-apigw-timestamp": date,           "x-ncp-apigw-signature-v2":
// signature,       },        request는 body였지만 axios는 data다       data: {
// type: "SMS",           countryCode: "82",           from: "01063685605",
// 원하는 메세지 내용           content: `하나손해보험 인증번호입니다.`,           messages: [
// 신청자의 전화번호               { to:  `${phoneNum}`,                content:'하나손해보험
// 인증번호는 '+ code +'입니다.'               },],       },   }).then(res => {
// console.log(res.data);   })       .catch(err => {           console.log(err);
// }) } module.exports = onLoggin; console.log(onLoggin());

function isSuccess(e) {

    const code = window
        .localStorage
        .getItem('code');
    const sendedCode = document
        .getElementById('no')
        .value;
    if (e.keyCode == 13) {
        if (sendedCode == code) {
            alert("인증성공! 정보입력 페이지로 넘어갑니다.");
            location.href='info.html';

        } else {

            console.log("인증번호가 틀렸습니다")
        }
        localStorage.removeItem('code'); //코드 발급 후 반드시 삭제

    }
    console.log(localStorage.getItem('code')); //삭제 여부 확인

}

function returnPinfo()
{
    const name=document.getElementById('name').value;
    const bday=document.getElementById('bday').value;
    const phoneNum_front=ChangeValue();
    const phoneNum_back=document
    .getElementById('pNo-back')
    .value;

    localStorage.setItem('name',name);
    localStorage.setItem('bday',bday);
    localStorage.setItem('phoneNum_front',phoneNum_front);
    localStorage.setItem('phoneNum_back',phoneNum_back);


}






