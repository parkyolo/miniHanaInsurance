
//사고접수번호용 난수 생성
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

//step1 사용자 정보 저장하기
function submitAll(){
    const name = document
        .getElementById('name')
        .value;

        console.log(name);

        let value_str = document.getElementById('contact-front');
        // if(typeof document!== "undefined") {
        // value_str=document.getElementById('pnofront'); }
        let frontNo = value_str
            .options[value_str.selectedIndex]
            .text;

    // const phoneNum_front = ChangeValue();
    const phoneNum_middle = document
        .getElementById('pnoMiddle')
        .value;
    const phoneNum_back = document
        .getElementById('pnoBack')
        .value;

        const accident_date = document
        .getElementById('date')
        .value;

    const carNum=document.getElementById('carnum').value;


    const userInfo={
        'name':name,
        'pnoFront':frontNo,
        'pnoMiddle':phoneNum_middle,
        'pnoBack':phoneNum_back,
        "date":accident_date,
        'carnum':carNum

    }

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    location.href = 'step4.html';
}

//step2 사용자 정보 불러오기
function step2load()
{

    console.log("hello");
    const address = window.localStorage.getItem('address');

    console.log(address);

    
    const realaddress = document.getElementById('mapAddr');
    realaddress.value=address;

}

//step4 접수 정보 불러오기
function step4load()
{


    /*json으로 리팩토링 하기*/

    var obj=JSON.parse(localStorage.getItem('userInfo'));
    
    const accident_num=generateRandomCode(7);
    const accident_date=obj.date;
    const carNum=obj.carnum;
    const name=obj.name;
    const pnoFront=obj.pnoFront;
    const pnoMiddle=obj.pnoMiddle;
    const pnoBack=obj.pnoBack;

    const phoneNum=pnoFront+"-"+pnoMiddle+"-"+pnoBack;

    const address=localStorage.getItem('address');
    
    /*코드 중복 줄이기*/
    const location = document.getElementById('location');
    location.innerHTML=address;
    const date = document.getElementById('date');
    date.innerHTML=accident_date;
    const carnum = document.getElementById('carNum');
    carnum.innerHTML=carNum;
    const accidentnum = document.getElementById('accidentNum');
    accidentnum.innerHTML=accident_num;
    console.log(accident_num);
    const drivername = document.getElementById('name');
    drivername.innerHTML=name;
    const pno = document.getElementById('phonenum');
    pno.innerHTML=phoneNum;
    

    console.log(accident_date);
    localStorage.clear();
}

//휴대폰번호 입력 시 자동 커서 이동
function moveCursor(pnoMiddle) {
    if (pnoMiddle.value.length == 4) {
        document
            .getElementById("pnoBack")
            .focus();
    }
}

var reader = new FileReader();
reader.onload = function (e) {
  var img = new Image;
  img.onload = function() {
    var thumbFile = getThumbFile(img); //여기서 이미지 객체 img를 활용하여 썸네일 처리를 할 수 있음
  };
  img.onerror = function() {
    //에러가 나는 경우 처리를 할 수 있음
  };
  img.src = reader.result;
};
reader.readAsDataURL(tmpFile); //파일객체를 넣어줌



//지도 열기
function showmap()
{
  var modal = document.getElementById('map-area');
  modal.style.display = 'block';

  map.relayout(); 
  //지도를 담는 div 영역이 바뀔경우 map.relayouot()을 해야 깨지지 않고 정상적으로 로드됨

}