const axios = require('axios');


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
    let value_str = document.getElementById('selCertCellPhone1');
    let frontNo=value_str.options[value_str.selectedIndex].text;
    alert("value:" + value_str.options[value_str.selectedIndex].value + 
	" text:" + value_str.options[value_str.selectedIndex].text);
    return frontNo;
    }


// 휴대폰 번호를 문자열로 만들기
function pNoToString()
{
    let frontno=ChangeValue();
    let pno=frontno+document.getElementById('txtCertCellPhone2').value;
    alert(pno);
}

//네이버 open api 요청하기

axios({
   url:" https://sens.apigw.ntruss.com/sms/v2/services/{serviceId}/messages";
   

})

console.log("jello0");
