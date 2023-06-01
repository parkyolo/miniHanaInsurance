/* 탭 선택*/
$(document).ready(function(){   

  // 초기에 첫 번째 탭을 선택된 상태로 설정
  $('ul.tabs li:first-child').addClass('current');
  $('.tab-content:first-child').addClass('current');
  
  $('ul.tabs li').click(function(){
    var tab_id = $(this).attr('data-tab');
  
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
  
    $(this).addClass('current');
    $("#"+tab_id).addClass('current');

    // 다른 li 클릭 시 '건강보험' li 클릭 상태 해제
    if ($(this).index() !== 1) {
      $('ul.processing_contents li:nth-child(2)').removeClass('clicked'); // '건강보험' li의 클릭 상태 해제
    }
  });
});

/* 보험처리 목록 선택 */
var lis = document.querySelectorAll('ul.processing_contents li');
var previousLi = lis[0];

// text 가져오기
var previousText = previousLi.textContent;

// 첫번째 click되어 있도록
lis[0].classList.add('clicked');

// 각각 클릭하면 event 실행
for(var i=0; i < lis.length; i++){

  lis[i].addEventListener('click', function(){

    if (this.classList.contains('clicked')) {
      // 이미 선택된 항목은 선택 해제되지 않도록 종료
      return; 
    }

    // 이전에 선택되었던 것 해제
    if(previousLi !== null){
      previousLi.classList.remove('clicked');
    }
        
    // checkbox 전체 선택 해제
    var checkboxes = document.querySelectorAll('label input.demageCheckbox');
    var checkboxImages = document.querySelectorAll('label .checkboxImage');

    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
      checkboxImages.forEach(function (image) {
        image.src = "../../images/claimImg/form_checkOff.png";
        image.alt = "Unchecked";
      });
    })

    // 기존 행 초기화
    var selectTable = document.getElementById("selectTable");

    while (selectTable.rows.length > 1) {
      selectTable.deleteRow(1);
    }  
    
    this.classList.add('clicked');
    previousLi = this;

    // 선택한 탭의 텍스트 가져오기
    var currentText = this.textContent;

    // 선택한 탭의 텍스트를 newCell에 설정
    document.querySelector('#selectTable tr:first-child td:first-child').textContent = currentText;
  })
}

/* checkbox */
checkboxes = document.querySelectorAll('label input.demageCheckbox');
checkboxImages = document.querySelectorAll('label .checkboxImage');

/* 체크박스 선택<->해제 */
checkboxes.forEach(function(checkbox, index) {
  checkbox.addEventListener('change', function() {
    
    if (this.checked) {
      checkbox.checked = true;
      checkboxImages[index].src = "../../images/claimImg/form_checkOn.png";
      checkboxImages[index].alt = "Checked";
    } 
    else{
      checkbox.checked = false;
      checkboxImages[index].src = "../../images/claimImg/form_checkOff.png"; // 체크되지 않은 상태 이미지 경로
      checkboxImages[index].alt = "Unchecked"; // 체크되지 않은 상태 이미지 대체 텍스트
    }
  })
})

/* 체크박스 선택 여부 */
var checkboxData = {
  deathCheckbox: '사망',
  aftereffectCheckbox: '후유장해',
  fractureCheckbox: '골절',
  operationCheckbox: '수술',
  hospitalizationCheckbox: '입원'
}

function handleCheckbox(checkbox){
  selectTable = document.getElementById("selectTable");
  var checkboxes = document.getElementsByClassName("demageCheckbox");
  var selectedCheckboxes = [];
  
  // 선택된 체크박스 찾기
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      selectedCheckboxes.push(checkboxes[i]);
    }
  }

  // 기존 행 초기화
  while (selectTable.rows.length > 1) {
    selectTable.deleteRow(1);
  }  

  // 선택된 체크박스 없음
  if (selectedCheckboxes.length === 0) {    
    var newRow = selectTable.insertRow();
    
    var newCell = newRow.insertCell();
    newCell.colSpan = 4;
    newCell.innerHTML = "선택된 항목이 없습니다.";
  }

  // 선택된 체크박스가 있음
  else {    
    for (var j = 0; j < selectedCheckboxes.length; j++) {
      var checkbox = selectedCheckboxes[j];
      var content2 = checkboxData[checkbox.value];
          
      var content3;
      var content4;

      var newRow = selectTable.insertRow();
      
      // 처음에만 '보험처리' 행 추가하기
      if (j === 0) {
        var newCell = newRow.insertCell();
        newCell.rowSpan = selectedCheckboxes.length;
        newCell.innerHTML = previousLi.textContent;
      }      
      
      switch (content2) {   
        case "사망":
          content3 = "사망진단서 또는 사체검안서(사본 제출시 원본대조필 포함)";
          content4 = "의료기관";
          break;
        case "후유장해":
          content3 = "후유장해진단서(보상담당자와 상의 요) 일반진단서로 대체 가능한 경우 - 만성신부전 : 혈액투석(최초투석일, 환자상태 기재) - 사지절단(절단부위 명시) : X-RAY 결과지 - 인공관절치환술(치환일자, 부위 명시) : 수술기록지 - 비장・신장・안구적출(적출일자, 부위 명시) : 수술기록지 - 장기전절제(젤제일자, 부위 명시) : 수술기록지";
          content4 = "의료기관";
          break;
        case "골절":
          content3 = "진단명(질병분류코드 포함)이 포함된 서류 (예시) 진단서, 의사소견서, 입퇴원확인서, 치료확인서, 진료기록지 등";
          content4 = "의료기관";
          break;
        case "수술":
          content3 = "수술명, 진단명(질병분류코드 포함)이 포함된 서류 (예시) 수술확인서, 수술기록지, 진료기록지 등";
          content4 = "의료기관";
          break;
        case "입원":
          content3 = "진단명(질병분류코드 포함), 입원기간이 포함된 서류 (예시) 입퇴원확인서, 치료확인서, 진료기록지 등";
          content4 = "의료기관";
          break;
      }

      var newCell2 = newRow.insertCell();
      newCell2.innerHTML = content2;
      var newCell3 = newRow.insertCell();
      newCell3.innerHTML = content3;
      newCell3.style.textAlign = "left";
      var newCell4 = newRow.insertCell();
      newCell4.innerHTML = content4;
      newCell4.style.textAlign = "left";
      newCell4.style.borderRight = "none";
    
      checkbox.dataset.rowId = newRow.rowIndex;   
    }
  }
}

window.onload = function() {
  var checkboxes = document.getElementsByClassName("demageCheckbox");
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("change", function() {
      handleCheckbox(this);
    });
  }
}
