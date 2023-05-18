


function generateRandomCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

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

    localStorage.setItem('name', name);
    localStorage.setItem('pnoMiddle', phoneNum_middle);
    localStorage.setItem('pnoBack', phoneNum_back);
    localStorage.setItem('date', accident_date);
    localStorage.setItem('carnum', carNum);

    localStorage.setItem('pnoFront',frontNo);




    console.log(localStorage.getItem('date'));
    console.log(localStorage.getItem('pnoFront'));

}


function step2load()
{
    console.log("hello");
    const address = window.localStorage.getItem('address');

    console.log(address);

    
    const realaddress = document.getElementById('mapAddr');
    realaddress.value=address;

}

function step4load()
{

    /*json으로 리팩토링 하기*/
    const accident_num=generateRandomCode(7);
    const accident_date=window.localStorage.getItem('date')
    const address = window.localStorage.getItem('address');
    const carNum=window.localStorage.getItem('carnum');
    const name=window.localStorage.getItem('name');
    const pnoFront=localStorage.getItem('pnoFront');
    const pnoMiddle=localStorage.getItem('pnoMiddle');
    const pnoBack=localStorage.getItem('pnoBack');

    const phoneNum=pnoFront+"-"+pnoMiddle+"-"+pnoBack;

    console.log(address);
    console.log(phoneNum);
    if(phoneNum==null)
        console.log("null임");
    else
        console.log("null 아님");
    
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

function moveCursor(pnoMiddle) {
    if (pnoMiddle.value.length == 4) {
        document
            .getElementById("pnoBack")
            .focus();
    }
}



function showImage() {
    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    
    document.getElementById('image-upload').style.visibility = 'hidden';

    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}

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

  function createElement(e, file) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.setAttribute('src', e.target.result);
    img.setAttribute('data-file', file.name);
    li.appendChild(img);

    return li;
  }


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