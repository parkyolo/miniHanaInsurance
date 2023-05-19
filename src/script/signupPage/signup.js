const CryptoJS = require('crypto-js'); 
const axios=require('axios');


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

//이름 유효성 검사-15자리
function isName(e)
{
    const naemLength=documet.getElementById('name').length;
    if(e.keyCode==13)
    {
        if(naemLength>15)
        {
            alert("이름은 15글자 이하로 입력해주세요");
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
function isAllChecked() {
    const checkboxLength = document
        .querySelectorAll('input[name="agree"]:checked')
        .length;

    if (checkboxLength != 4) {
        console.log("전체동의 하셔야합니다.");
        return false;
    } else 
        return true;

    }

//휴대폰 앞번호 가져오기
function ChangeValue() {
    let value_str = document.getElementById('pnofront');
    // if(typeof document!== "undefined") {
    // value_str=document.getElementById('pnofront'); }
    let frontNo = value_str
        .options[value_str.selectedIndex]
        .text;
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

// 네이버 open api 요청하기 
const access_key=process.env.NEXT_PUBLIC_ACCESS_KEY; 
const secrete_key=process.env.NEXT_PUBLIC_SECRETE_KEY; 
const service_id=process.env.NEXT_PUBLIC_SERVICE_ID; 
function onLoggin() {

    if (isAllChecked() == false) 
        return;
    
    const code = generateRandomCode(6);
    console.log(code);
    localStorage.setItem('code', code);
}



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
            location.href = 'info.html';

        } else {

            console.log("인증번호가 틀렸습니다")
        }
        localStorage.removeItem('code'); //코드 발급 후 반드시 삭제

    }
    console.log(localStorage.getItem('code')); //삭제 여부 확인

}

//입력받은 개인정보 localStorage에 저장
function returnPinfo() {
    const name = document
        .getElementById('name')
        .value;
    const bday = document
        .getElementById('bday')
        .value;
    const phoneNum_front = ChangeValue();
    const phoneNum_back = document
        .getElementById('pNo-back')
        .value;

    const userInfo={
        'name':name,
        'bday':bday,
        'pnoFront':phoneNum_front,
        'pnoBack':phoneNum_back
    }
    localStorage.setItem('userInfo',JSON.stringify(userInfo));

}

