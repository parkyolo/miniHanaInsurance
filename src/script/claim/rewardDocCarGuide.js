$(document).ready(function(){
  
    $('ul.tabs li').click(function(){
      var tab_id = $(this).attr('data-tab');
  
      $('ul.tabs li').removeClass('current');
      $('.tab-content').removeClass('current');
  
      $(this).addClass('current');
      $("#"+tab_id).addClass('current');
    })
  
  })

var lis = document.querySelectorAll('ul.processing li');
var previousLi = lis[[0]];

lis[0].classList.add('clicked');

for(var i=0; i<lis.length; i++){
  lis[i].addEventListener('click', function(){
    
  console.log("click");
  
  if (this.classList.contains('clicked')) {
    return; // 이미 선택된 항목은 선택 해제되지 않도록 종료
  }

  if(previousLi !== null){
    previousLi.classList.remove('clicked');
  }
  
  this.classList.add('clicked');
  previousLi = this;
});
};

var checkboxes = document.querySelectorAll('label input.demageCheckbox');
var checkboxImages = document.querySelectorAll('label .checkboxImage');

checkboxes.forEach(function(checkbox, index) {
  checkbox.addEventListener('change', function() {
    
    if (this.checked) {
      console.log("체크박스가 선택되었습니다.");
      checkboxImages[index].src = "../../images/claimImg/form_checkOn.png";
      checkboxImages[index].alt = "Checked";
    } 
    else {
      console.log("체크박스가 선택 해제되었습니다.");
      checkboxImages[index].src = "../../images/claimImg/form_checkOff.png"; // 체크되지 않은 상태 이미지 경로
      checkboxImages[index].alt = "Unchecked"; // 체크되지 않은 상태 이미지 대체 텍스트
    }
  });
});