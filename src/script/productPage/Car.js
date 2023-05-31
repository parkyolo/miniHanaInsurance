$(document).ready(function () {
  $(".tab_header li a").click(function () {
    $(".tab_header li a").removeClass("on");
    $(this).addClass("on");

    var tabId = $(this).attr("id");
    $(".tab_cont").removeClass("open");
    $("#" + tabId + "_content").addClass("open");
  });
});

$(document).ready(function () {
  $(".acc_group dt a").click(function () {
    $(this).closest("dt").next("dd").slideToggle();
  });
});

/* $(document).ready(function () {
  // 간편 산출 버튼 클릭 시 해당 내용 표시
  $("#btnSimpleCalcView").click(function () {
    $("#divCalcContainer").show();
    $("#contents").hide();
  });

  // 상품특징 버튼 클릭 시 해당 내용 표시
  $("#btnContentView").click(function () {
    $("#divCalcContainer").hide();
    $("#contents").show();
  });
});
 */
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 3,
    margin: 25,
    nav: true,
    loop: true,
  });
});
/* $(document).ready(function () {
  var owl = $(".owl-carousel");

  owl.owlCarousel({
    items: 3, // 한번에 보여줄 아이템 수
    loop: true, // 반복여부
    margin: 35,
    nav: true, // 오른쪽 간격
    autoplay: true, // 자동재생 여부
    autoplayTimeout: 1800, // 재생간격
    autoplayHoverPause: true, //마우스오버시 멈출지 여부
  });
}); */
/* 
$(function () {
  $(".aCounselReq").on("click", function () {
    var data = { sCallTaskID: "call20" }; // 개인용

    pop
      .open("popCounselRequest")
      .params(fnCounselReqInit, data)
      .callback("popCounselRequest", function () {
        pop.open("popCounselComplete");
      });
  });
});
 */

//여행보험 행추가 버튼
$(document).ready(function () {
  // "+ 행추가" 버튼 클릭 시 새로운 행 추가
  $(".btn_plus").click(function () {
    var rowCount = $("#tblBase tbody tr[name='sInputData']").length;

    // 최대 8개의 행까지만 추가 가능
    if (rowCount < 8) {
      // 새로운 행을 복제하여 추가
      var newRow = $("tr[name='sInputData']").eq(0).clone();

      // 새로운 행의 input 요소 초기화
      newRow.find("input[type='text']").val("");
      newRow.find("input[name='nManPrem']").prop("disabled", true);
      newRow.find("input[name='nWomanPrem']").prop("disabled", true);

      // 추가된 행을 tbody에 추가
      $("#tblBase tbody").append(newRow);
    }
  });
});
$(document).ready(function () {
  // "+ 행삭제" 버튼 클릭 시 행 삭제
  $(".btn_minus").click(function () {
    var rowCount = $("#tblBase tbody tr[name='sInputData']").length;

    // 최소 1개의 행은 유지되도록 설정
    if (rowCount > 1) {
      // 테이블의 마지막 행을 삭제
      $("#tblBase tbody tr[name='sInputData']:last-child").remove();
    }
  });
});

$(document).ready(function () {
  $("#btnInsCalc").click(function () {
    // 여행기간 계산
    var termSum = parseInt($("#totTravelPeriod strong").text());

    // 인원수 계산
    var manNumSum = 0;
    var womanNumSum = 0;
    $("input[name='nManNum']").each(function () {
      var value = parseInt($(this).val());
      if (!isNaN(value)) {
        manNumSum += value;
      }
    });
    $("input[name='nWomanNum']").each(function () {
      var value = parseInt($(this).val());
      if (!isNaN(value)) {
        womanNumSum += value;
      }
    });
    var totPsnNo = manNumSum + womanNumSum;

    // 인원수 유효성 검사
    if (totPsnNo < 10) {
      alert("인원을 맞춰주세요.");
      return;
    }

    // 가입대상 생년월일 유효성 검사 및 보험료 계산
    var sumPrem = 0;
    var currentDate = 10;
    $("input[name='sInsGrpAge']").each(function () {
      var value = parseInt($(this).val());
      if (!isNaN(value) && value >= 1930 && value <= 2020) {
        if (value >= 1930 && value <= 1970) {
          sumPrem += 20000;
        } else if (value > 1970 && value <= 2020) {
          sumPrem += 10000;
        }
      } else {
        alert("생년월일을 맞춰주세요.");
        return;
      }
    });

    // 결과 출력
    $("#totTravelPeriod strong").text(termSum);
    $("#totPerson strong").text(totPsnNo);
    $("#totPrem strong").text(sumPrem);

    // 화면 전환
    $(".firstCalc").css("display", "none");
    $(".Calccc").css("display", "block");
  });

  // 초기화 버튼 클릭 시 초기화
  $("#btnReset").click(function () {
    $("#totTravelPeriod strong").text("");
    $("#totPerson strong").text("");
    $("#totPrem strong").text("");
    $(".firstCalc").css("display", "block");
    $(".Calccc").css("display", "none");
  });
});
