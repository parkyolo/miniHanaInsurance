// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 3000;
// const axios = require('axios');
// const CryptoJS = require('crypto-js');
// require("dotenv").config();


const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const axios = require('axios');
const CryptoJS = require('crypto-js');
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
function moveCursor(pidFront) {
    if (pidFront.value.length == 6) {
        console.log("move cursor");
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
function isName()
{
    const naemLength=document.getElementById('name').length;
   
        if(naemLength>15)
        {
            return false;
        }
        else return true;
    
}


//휴대폰 인증약관 동의 전체 선택
function selectAll(all) {
    console.log('all agree');

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
    console.log(checkboxLength);

    if (checkboxLength <4) {
        console.log("전체동의 하셔야합니다.");
        return false;
    } else 
        return true;

    }


//내국인,외국인 선택 여부 확인
function isForeigner(){
    const radiobox=document.querySelector('input[name="isforeigner"]:checked');
    if(radiobox==null)
        return false;
    else return true;

}

//성별 선택 여부 확인
function isGenderSelected(){
    const radiobox=document.querySelector('input[name="gender"]:checked');
    if(radiobox==null)
        return false;
    else return true;

}


//휴대폰 앞번호 가져오기
function ChangeValue() {
    let value_str = document.getElementById('pnofront');

    let frontNo = value_str
        .options[value_str.selectedIndex]
        .text;
    localStorage.setItem('selectNumber',value_str.selectedIndex);
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

function sendNumber() {
    if(isName()==false)
    {
        alert("이름은 15글자 이하로 입력해주세요");
        return;
    }
    if(isForeigner()==false)
    {
        alert("내/외국인 여부를 선택해주세요.");
        return;
    }
    if(isGenderSelected()==false)
    {
        alert("성별을 선택해주세요.");
        return;
    }
    if (isAllChecked() == false) 
    {
        alert("휴대폰 인증약관 전체동의 해주세요.");
    }


    document.getElementById('input_validation').style.display='block';


    const inputNumber=pNoToString();
    const code=generateRandomCode(6);
    localStorage.setItem('code',code);

    fetch('/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ number: inputNumber, code:code })
    })
        .then(response => response.text())
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function onLogginsample() {

   if (isAllChecked() == false) 
        return; 
    
    const code = generateRandomCode(6);
    console.log(code);
    localStorage.setItem('code', code);

    document.getElementById('fdSMSVldNo').style.display='block';
}




function openModal(){
   
    const bday=document.getElementById('input-pid-front').value;
    localStorage.setItem('bday',bday);
    console.log(bday);
    document.getElementById('popIntegrateCert').style.display='block';
    const bdayinput=document.getElementById('bday');
    const realbday=localStorage.getItem('bday');
    bdayinput.value=realbday;
}


function closeModal(){
    console.log('lets close');
    document.getElementById('popIntegrateCert').style.display='none';

}


function isSuccess() {

    const code = window
        .localStorage
        .getItem('code');
    const sendedCode = document
        .getElementById('no')
        .value;
    
        if (sendedCode == code) {
            returnPinfo();

            alert("인증성공! 정보입력 페이지로 넘어갑니다.");
            location.href = '../../../html/signupPage/info.html';

        } else {

            console.log("인증번호가 틀렸습니다")
        }
        localStorage.removeItem('code'); //코드 발급 후 반드시 삭제

    
    console.log(localStorage.getItem('code')); //삭제 여부 확인


}

//입력받은 개인정보 localStorage에 저장
function returnPinfo() {
    const name = document
        .getElementById('name')
        .value;

    const phoneNum_front = ChangeValue();
    const phoneNum_back = document
        .getElementById('pNo-back')
        .value;
    const pidFront = document
        .getElementById('input-pid-front')
        .value;
    const pidBack = document
        .getElementById('input-pid-back')
        .value;
    const userInfo={
        'name':name,
        'pnoFront':phoneNum_front,
        'pnoBack':phoneNum_back,
        'pidFront':pidFront,
        'pidBack':pidBack
    }
    localStorage.setItem('userInfo',JSON.stringify(userInfo));

}


//로그인
//똑같이 인증받고, 이름,생년월일,주민번호가 localstorage 정보와 일치하고 
//폰인증도 성공했으면 성공 처리
function isSuccess_signin() {

    const code = window
        .localStorage
        .getItem('code');
    const sendedCode = document
        .getElementById('no')
        .value;
    
        if (sendedCode == code) {
            // returnPinfo();

            alert("인증성공! 정보입력 페이지로 넘어갑니다.");
            location.href = '../../../html/mainPage/mainPage.html';

        } else {

            console.log("인증번호가 틀렸습니다")
        }
        localStorage.removeItem('code'); //코드 발급 후 반드시 삭제

    
    console.log(localStorage.getItem('code')); //삭제 여부 확인


}
