

window.onload=function infoPage()
{
   
    const name = window.localStorage.getItem('name');
    const birthday=window.localStorage.getItem('bday');
    const pnoFront=window.localStorage.getItem('phoneNum_front');
    const pnoBack=window.localStorage.getItem('phoneNum_back');


    const back1=pnoBack.substring(0,4);
    const back2=pnoBack.substring(4,8);
    const byear=birthday.substring(0,2);
    const bmonth=birthday.substring(2,4);
    const bd=birthday.substring(4,6);


    console.log(pnoFront.text); //현재 undefined로 출력됨

    const infoname = document.getElementById('txtJoinMemberName');
    infoname.value=name; //이름
    const infopno1 = document.getElementById('selJoinMemberTel1');
    infopno1.innerHTML=pnoFront; //휴대폰 앞번호

    const infopno2 = document.getElementById('txtJoinMemberTel2');
    infopno2.value=back1; //휴대폰 중간번호
    const infopno3 = document.getElementById('txtJoinMemberTel3');
    infopno3.value=back2; //휴대폰 뒷번호

    let newyear;
    let newbirthday;

    if(byear.startsWith('9'))
    {
        newyear='19'+byear;
    }
    else{
        newyear='20'+byear;
    }

    newbirthday=newyear+"."+bmonth+"."+bd;
    const birthdayform = document.getElementById('txtJoinMemberBirth');
    birthdayform.value=newbirthday;

}

//이메일 선택하면 input에 자동입력
function emailReturn(emailValue)
{
    let value_str = document.getElementById('selJoinMemberEmail2')
    const email=document.getElementById('txtJoinMemberEmail2');
    email.value=value_str.value;
}



