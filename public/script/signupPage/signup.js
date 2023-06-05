const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const axios = require("axios");
const CryptoJS = require("crypto-js");
require("dotenv").config();

//난수 생성
function generateRandomCode(n) {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
}

console.log("hellop");

//주민번호 앞자리 6자리 채우면 자동 커서 이동
function moveCursor(pidFront) {
  if (pidFront.value.length == 6) {
    console.log("move cursor");
    document.getElementById("input-pid-back").focus();
  }
}

//주민번호 모두 입력했는지 확인
function isPnoNull() {
  const pnoFront = document.getElementById("input-pid-front").value;
  const pnoBack = document.getElementById("input-pid-back").value;

  if (pnoFront.length == 0 || pnoBack.length == 0) {
    alert("주민번호는 모두 입력해야합니다.");
    return false;
  }
  return true;
}

//이름 유효성 검사-15자리
function isName() {
  const naemLength = document.getElementById("pname").value.length;
  console.log(naemLength);
  if (naemLength == 0) {
    return 0;
  }
  if (naemLength > 15) {
    return 1;
  } else return 2;
}

//휴대폰 인증약관 동의 전체 선택
function selectAll(all) {
  console.log("all agree");

  const checkboxes = document.getElementsByName("agree");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = all.checked;
  });
}

//휴대폰 인증약관 전체 동의여부 선택
function isAllChecked() {
  const checkboxLength = document.querySelectorAll(
    'input[name="agree"]:checked'
  ).length;
  console.log(checkboxLength);

  if (checkboxLength < 4) {
    console.log("전체동의 하셔야합니다.");
    return false;
  } else return true;
}

//내국인,외국인 선택 여부 확인
function isForeigner() {
  const radiobox = document.querySelector('input[name="isforeigner"]:checked');
  if (radiobox == null) return false;
  else return true;
}

//성별 선택 여부 확인
function isGenderSelected() {
  const radiobox = document.querySelector('input[name="gender"]:checked');
  if (radiobox == null) return false;
  else return true;
}

//휴대폰 앞번호 가져오기
function ChangeValue() {
  let value_str = document.getElementById("pnofront");

  let index = value_str.options[value_str.selectedIndex];
  let frontNo = index.text;
  localStorage.setItem("selectNumber", value_str.selectedIndex);
  return frontNo;
}

//휴대폰 번호를 문자열로 만들기
function pNoToString() {
  let frontno = ChangeValue();
  let pno = frontno + document.getElementById("pNo-back").value;
  return pno;
}

function sendNumber() {
  if (isName() == 0) {
    alert("이름은 필수 입력 사항입니다.");
    return;
  }
  if (ChangeValue == "선택") {
    alert("휴대폰 앞 번호를 선택해주세요.");
    return;
  }
  if (document.getElementById("pNo-back").value.length == 0) {
    alert("휴대폰 뒷 번호를 입력해주세요.");
    return;
  }
  if (isName() == 1) {
    alert("이름은 15글자 이내로 입력해주세요.");
    return;
  }
  if (isForeigner() == false) {
    alert("내/외국인 여부를 선택해주세요.");
    return;
  }
  if (isGenderSelected() == false) {
    alert("성별을 선택해주세요.");
    return;
  }
  if (isAllChecked() == false) {
    alert("휴대폰 인증약관 전체동의 해주세요.");
  }

  document.getElementById("input_validation").style.display = "block";

  const inputNumber = pNoToString();
  const code = generateRandomCode(6);
  localStorage.setItem("code", code);

  fetch("/increment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ number: inputNumber, code: code }),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Response:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  setTimer();
}

function openModal() {
  if (isPnoNull() == true) {
    const bday = document.getElementById("input-pid-front").value;
    localStorage.setItem("bday", bday);
    console.log(bday);
    document.getElementById("popIntegrateCert").style.display = "block";
    const bdayinput = document.getElementById("bday");
    const realbday = localStorage.getItem("bday");
    bdayinput.value = realbday;
  } else return;
}

function closeModal() {
  console.log("lets close");
  document.getElementById("popIntegrateCert").style.display = "none";
}

function isSuccess() {
  const code = window.localStorage.getItem("code");
  const sendedCode = document.getElementById("no").value;

  if (sendedCode == code) {
    returnPinfo();

    alert("인증성공! 정보입력 페이지로 넘어갑니다.");
    location.href = "../../../html/signupPage/info.html";
  } else {
    console.log("인증번호가 틀렸습니다");
    return;
  }
  localStorage.removeItem("code"); //코드 발급 후 반드시 삭제

  console.log(localStorage.getItem("code")); //삭제 여부 확인
}

//입력받은 개인정보 localStorage에 저장
function returnPinfo() {
  const name = document.getElementById("pname").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phoneNum_front = ChangeValue();
  const phoneNum_back = document.getElementById("pNo-back").value;
  const pidFront = document.getElementById("input-pid-front").value;
  const pidBack = document.getElementById("input-pid-back").value;
  const userInfo = {
    name: name,
    pnoFront: phoneNum_front,
    pnoBack: phoneNum_back,
    pidFront: pidFront,
    pidBack: pidBack,
    gender: gender,
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

function setTimer() {
  var time = 180;
  var min = "";
  var sec = "";

  //특정 부분을 주기적으로 업데이트해줘야 하거나
  // 어떤 API로 부터 변경된 데이터를 주기적으로 받아와야 하는 경우
  var x = setInterval(function () {
    min = parseInt(time / 60);
    sec = time % 60;

    document.getElementById("timer").innerHTML = min + ":" + sec;
    time--;

    if (time < 0) {
      clearInterval(x);
      alert("시간초과");
    }
  }, 1000);
}
