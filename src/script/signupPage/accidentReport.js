
//사고접수번호용 난수 생성
function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

//step1 사용자 정보 저장하기
function saveStep1Info(){
    const name = document
        .getElementById('name')
        .value;


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
    const address = obj.address;
    const carNum=obj.carnum;
    const name=obj.name;
    const pnoFront=obj.pnoFront;
    const pnoMiddle=obj.pnoMiddle;
    const pnoBack=obj.pnoBack;

    const phoneNum=pnoFront+"-"+pnoMiddle+"-"+pnoBack;

   
    
    /*코드 중복 줄이기*/
    const location = document.getElementById('location');
    location.innerHTML=address;
    const date = document.getElementById('date');
    date.innerHTML=accident_date;
    const carnum = document.getElementById('carNum');
    carnum.innerHTML=carNum;
    const accidentnum = document.getElementById('accidentNum');
    accidentnum.innerHTML=accident_num;
    const drivername = document.getElementById('name');
    drivername.innerHTML=name;
    const pno = document.getElementById('phonenum');
    pno.innerHTML=phoneNum;
    

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


//step2 업로드한 이미지 미리보기
function showImage() {
    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    
    document.getElementById('image-upload').style.visibility = 'hidden';

    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}

//step2 이미지 업로드하기
function getImageFiles(e) {
    const uploadFiles = [];
    const files = e.currentTarget.files;
    const imagePreview = document.querySelector('.images');
    const docFrag = new DocumentFragment();

    if ([...files].length >= 2) {
      alert('이미지는 최대 2개 까지 업로드가 가능합니다.');
      return;
    }

    // 파일 타입 검사
    [...files].forEach(file => {
      if (!file.type.match("image/.*")) {
        alert('이미지 파일만 업로드가 가능합니다.');
        return
      }

      // 파일 갯수 검사
      if ([...files].length < 2) {
        uploadFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = createElement(e, file);
          imagePreview.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }


//step2 이미지 생성하기
  function createElement(e, file) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('src', e.target.result);
    img.setAttribute('data-file', file.name);
    li.appendChild(img);

    return li;
  }


//step2 파일 업로드하기
function loadFile(input) {
    var file = input.files[0];

    var name = document.getElementById('fileName');
    name.textContent = file.name;

    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    newImage.src = URL.createObjectURL(file);   

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지 숨기기
    newImage.style.objectFit = "contain";

    var container = document.getElementById('image-show');
    container.appendChild(newImage);
};