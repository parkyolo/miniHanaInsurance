let intBirthDate = "";  // 사용자 입력 생년월일
let birthErrMsg = "";   // 생년월일 안내문
let birthValid = false; // 생년월일이 검증되었는지
let sexClicked = false; // 성별이 선택되었는지
let rdoSex = document.getElementsByName("rdosSex"); // 성별 라디오 버튼

// 생년월일 포맷을 변경하는 함수
function convertDateFormat(dateString) {
    var year = dateString.substring(0, 2);
    var month = dateString.substring(2, 4);
    var day = dateString.substring(4, 6);

    // 2000년 이전과 이후 구분
    var prefix = (parseInt(year, 10) >= 30) ? '19' : '20';

    var formattedDate = prefix + year + '-' + month + '-' + day;
    return formattedDate;
}

// 만 나이를 계산하는 함수
function getAge(inputBirthDate) {
    var today = new Date();
    var birthDate = new Date(inputBirthDate);

    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();
    var dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age >= 19 && age <= 70;
}

// 생년월일이 형식에 맞게 입력되었는지 검사하는 함수
function validTxtBirth(inputBirthDate) {
    let regEx = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/;
    if (!regEx.test(inputBirthDate)) return false
    return true;
}

// 생년월일이 정상적으로 입력되었는지 확인하는 함수
function checkBirthInputValid(strBirthDate) {
    intBirthDate = convertDateFormat(strBirthDate);
    birthValid = false;
    birthErrMsg = "";
    
    // 입력값이 없을 때
    if (strBirthDate.length === 0) { 
        birthErrMsg = "생년월일을 입력하십시오.";
    }
    
    // 생년월일 형식이 알맞지 않을 때
    else if (!validTxtBirth(strBirthDate)) { 
        birthErrMsg = "생년월일을 정확히 입력하십시오.";
    }
    
    // 나이가 알맞지 않을 때
    else if (!getAge(intBirthDate)) { 
        birthErrMsg = "보험가입할 수 없는 나이입니다. 보험나이 만 19 ~ 70세 고객에 한해 보험료 확인이 가능합니다.";
    }

    // 생년월일이 정상적으로 입력되었을 때
    if (birthErrMsg.length === 0) { 
        document.getElementById('txtBirthError').style.display = 'none';
        birthValid = true;
        return true;
    }

    // 생년월일이 정상적으로 입력되지 않았을 때
    document.getElementById('txtBirthError').innerText = birthErrMsg;
    document.getElementById('txtBirthError').style.display = 'block';
    return false;
}

// 성별이 선택되었는지 확인하는 함수
function checkSexClick() {
    // 모든 라디오 버튼을 반복하면서 선택된 값이 있는지 찾는다.
    for (var i = 0; i < rdoSex.length; i++) {
        if (rdoSex[i].checked) {
        sexClicked = true;
        document.getElementById('rdosSexError').style.display = "none";
        return true;
        }
    }
    return false;
}

function init(){

    // 생년월일 입력란을 focusout하면 생년월일이 정확히 입력되었는지 검증 후 알맞는 안내문 출력
    let txtBirth = document.getElementById('txtBirth');
    txtBirth.addEventListener('focusout', () => {
        let strBirthDate = txtBirth.value;
        checkBirthInputValid(strBirthDate);
    });

    // 성별을 클릭하면 sexClicked 변수를 true로 변경
    for (var i = 0; i < rdoSex.length; i++) {
        rdoSex[i].addEventListener("click", checkSexClick);
    }

    // '보험료 계산하기' 버튼 클릭 이벤트
    let alert_box = document.querySelector('.alert_box');
    let alert_body = document.querySelector('.alert_body');

    // '보험료 계산하기' 버튼을 클릭하면 생년월일과 성별이 잘 입력되었는지 확인 후 모달창 띄우기
    document.getElementById('btnCalcInsurance').addEventListener('click', (event) => {
        // 생년월일과 성별이 잘 입력됨
        if (birthValid && sexClicked) { 
            return true;
        }

        // 생년월일이 입력되지 않음
        if (!birthValid) {
            event.preventDefault();
            alert_box.style.display = "block";
            if (birthErrMsg.length === 0) alert_body.innerHTML = `<p>생년월일을 입력하십시오.</p>`;
            else alert_body.innerHTML = `<p>${birthErrMsg}</p>`;
        }

        // 성별이 선택되지 않음
        else if (!sexClicked) {
            event.preventDefault();
            alert_box.style.display = "block";
            alert_body.innerHTML = `<p>성별을 선택하십시오.</p>`;
        }
    })

    // 닫는 버튼 클릭시 모달창 끄기
    document.querySelector('.alert_close_btn').addEventListener('click', () => {
        alert_box.style.display = "none";
    })

    // 확인 버튼 클릭시 모달창 끄고 성별이 선택되지 않았을 시 안내문 출력
    document.querySelector('.alert_btn_ok').addEventListener('click', () => {
        alert_box.style.display = "none";
        if (!birthValid && birthErrMsg.length === 0) {
            document.getElementById('txtBirthError').innerText = "생년월일을 입력하십시오.";
            document.getElementById('txtBirthError').style.display = 'block';
        }
        if (!sexClicked) document.getElementById('rdosSexError').style.display = "block";
    })
}

init();