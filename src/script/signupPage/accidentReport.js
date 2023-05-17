window.onload=function infoPage()
{
    console.log("hello");
    const address = window.localStorage.getItem('address');

    const realaddress = document.getElementById('mapAddr');
    realaddress.value=address;
}


function moveCursor(pnoMiddle) {
    if (pnoMiddle.value.length == 4) {
        document
            .getElementById("pnoBack")
            .focus();
    }
}

function saveStep1Info(){
    const name = document
        .getElementById('name')
        .value;

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

    localStorage.setItem('name', name);
    localStorage.setItem('pnoMiddle', phoneNum_middle);
    localStorage.setItem('pnoBack', phoneNum_back);
    localStorage.setItem('date', accident_date);



    console.log(localStorage.getItem('date'));


}


function showImage() {
    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    
    document.getElementById('image-upload').style.visibility = 'hidden';

    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
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