var currentPage = 1;
var totalPages = 5;

updateProgressBar();

function goToPage(pageNumber) {
  var currentPageElement = document.getElementById("page" + currentPage);
  currentPageElement.style.display = "none";
  var targetPageElement = document.getElementById("page" + pageNumber);
  targetPageElement.style.display = "block";
  currentPage = pageNumber;

  updateProgressBar();
}

function updateProgressBar() {
  var progress = (currentPage / totalPages) * 100;
  var progressBar = document.getElementById("progressBar");
  progressBar.style.width = progress + "%";
}

// 이전 페이지로 이동 함수
function previousPage() {
  if (currentPage > 1) {
    goToPage(currentPage - 1);
  }
}
// 다음 페이지로 이동 함수
function nextPage() {
  if (currentPage < totalPages) {
    goToPage(currentPage + 1);
  }
}

function updateProgressBar() {
  var progress = (currentPage / totalPages) * 100;
  var progressBar = document.getElementById("progressBar");
  progressBar.style.width = progress + "%";
}

// Enter 키 이벤트 핸들러
function handleEnterKey(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    var target = event.target;
    var id = target.id;

    switch (id) {
      case "nameInput":
        validateBirthdate();
        break;
      case "birthdateInput":
        validateBirthdate();
        break;
      case "phoneNumberInput":
        validatePhoneNumber();
        break;
      case "sample6_detailAddress":
        validateAddress();
        break;
      case "emailInput":
        validateEmail();
        break;
      default:
        break;
    }
  }
}

// 생년월일 입력 값  & 이름 검증 함수
function validateBirthdate() {
  var birthdate = document.getElementById("birthdateInput").value;
  var birthdateError = document.getElementById("birthdateError");
  var userName = document.getElementById("userName").value;
  var userNameError = document.getElementById("userNameError");

  var regex = /^\d{4}-\d{2}-\d{2}$/;
  var regex2 = /^[가-힣]{2,4}$/;

  if (regex.test(birthdate) && regex2.test(userName)) {
    birthdateError.innerHTML = "";
    /* userNameError.innerHTML = ""; */
    nextPage();
    if (regex2.test(userName)) {
      userNameError.innerHTML = "";
      nextPage();
    } else {
      userNameError.innerHTML = "올바른 이름 형식(홍길동)으로 입력해주세요.";
    }
  } else {
    birthdateError.innerHTML = "올바른 형식으로 입력해주세요.";
  }
}
//이름

// 핸드폰번호 입력 값 검증 함수
function validatePhoneNumber() {
  var phoneNumber = document.getElementById("phoneNumberInput").value;
  var phoneNumberError = document.getElementById("phoneNumberError");

  var regex = /^\d{3}-\d{4}-\d{4}$/;

  if (regex.test(phoneNumber)) {
    phoneNumberError.innerHTML = "";
    nextPage();
  } else {
    phoneNumberError.innerHTML =
      "올바른 핸드폰번호 형식(010-1234-5678)으로 입력해주세요.";
  }
}

// 주소 입력 값 검증 함수
function validateAddress() {
  var address = document.getElementById("sample6_detailAddress").value;
  var addressError = document.getElementById("addressError");

  if (address !== "") {
    addressError.innerHTML = "";
    nextPage();
  } else {
    addressError.innerHTML = "주소를 입력해주세요.";
  }
}

// 이메일 주소 입력 값 검증 함수
function validateEmail() {
  var email = document.getElementById("emailInput").value;
  var emailError = document.getElementById("emailError");

  var regex = /^\S+@\S+\.\S+$/;

  if (regex.test(email)) {
    emailError.innerHTML = "";
    nextPage();
  } else {
    emailError.innerHTML = "올바른 이메일 주소 형식으로 입력해주세요.";
  }
}

//이전 페이지 가기 버튼
var previousButton = document.getElementById("previousButton");
previousButton.addEventListener("click", function () {
  previousPage();
});

var previousButton = document.getElementById("previousButton2");
previousButton.addEventListener("click", function () {
  previousPage();
});

var previousButton = document.getElementById("previousButton3");
previousButton.addEventListener("click", function () {
  previousPage();
});

//Enter 키 이벤트 핸들러 등록
var birthdateInput = document.getElementById("birthdateInput");
birthdateInput.addEventListener("keydown", handleEnterKey);
var phoneNumberInput = document.getElementById("phoneNumberInput");
phoneNumberInput.addEventListener("keydown", handleEnterKey);
var sample6_detailAddress = document.getElementById("sample6_detailAddress");
sample6_detailAddress.addEventListener("keydown", handleEnterKey);
var emailInput = document.getElementById("emailInput");
emailInput.addEventListener("keydown", handleEnterKey);
var nameInput = document.getElementById("userName");
nameInput.addEventListener("keydown", handleEnterKey);
/* var agreeInput = document.getElementById(".agree_chk");
agreeInput.addEventListener("keydown", handleEnterKey); */

// 첫 번째 페이지가 안보임
var firstPage = document.getElementById("page1");
firstPage.style.display = "block";
var lastPage = document.getElementById("page4");
lastPage.addEventListener("click", function () {
  showSummary();
});

// 마지막 페이지에서 입력한 개인정보 보여주기
function showSummary() {
  var birthdate = document.getElementById("birthdateInput").value;
  var phoneNumber = document.getElementById("phoneNumberInput").value;
  var address = document.getElementById("sample6_detailAddress").value;
  var email = document.getElementById("emailInput").value;
  var name = document.getElementById("userName").value;
  var address2 = document.getElementById("sample6_postcode").value;
  var address3 = document.getElementById("sample6_address").value;

  var summaryElement = document.getElementById("summary");
  summaryElement.innerHTML = `
  <div class="base_box sel_tb">
  <h3>입력하신 정보</h3>
  <table class="fl base_tb sel_tb product_tb small_tb">
    <colgroup>
      <col width="15%" />
      <col width="15%" />
      <col width="15%" />
      <col width="40%" />
      <col width="15%" />
    </colgroup>
    <tr>
      <th class="tal">이름</th>
      <td class="tal">${name}</td>
    </tr>
    <tr>
      <th class="tal">생년월일</th>
      <td class="tal">${birthdate}</td>
    </tr>
    <tr>
      <th class="tal">핸드폰번호</th>
      <td class="tal">${phoneNumber}</td>
    </tr>
    <tr>
      <th class="tal">주소</th>
      <td class="tal">
        <p>우편번호: ${address2}</p>
        <p>주소: ${address3}</p>
        <p>상세 주소 : ${address}</p>
      </td>
    </tr>
    <tr>
      <th class="tal">이메일</th>
      <td class="tal">${email}</td>
    </tr>
  </table>
</div> 
  `;
}
function submitt() {
  alert = "제출되었습니다";
}

//카카오 api
function sample6_execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수
      var extraAddr = ""; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById("sample6_extraAddress").value = extraAddr;
      } else {
        document.getElementById("sample6_extraAddress").value = "";
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById("sample6_postcode").value = data.zonecode;
      document.getElementById("sample6_address").value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("sample6_detailAddress").focus();
    },
  }).open();
}
