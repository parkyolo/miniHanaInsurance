//탭헤더 스위치
$(document).ready(function () {
  $(".tab_header li a").click(function () {
    $(".tab_header li a").removeClass("on");
    $(this).addClass("on");

    var tabId = $(this).attr("id");
    $(".tab_cont").removeClass("open");
    $("#" + tabId + "_content").addClass("open");
  });
});

//토글 알아두실 사항
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

//여행보험 행추가 버튼
$(document).ready(function () {
  $(".btn_plus").click(function () {
    var rowCount = $("#tblBase tbody tr[name='sInputData']").length;

    // 최대 8개의 행까지만 추가 가능
    if (rowCount < 8) {
      // 새로운 행추가
      var newRow = $("tr[name='sInputData']").eq(0).clone();

      // 새로운 행의 input 요소 초기화
      newRow.find("input[type='text']").val("");
      newRow.find("input[name='nManPrem']").prop("disabled", true);
      newRow.find("input[name='nWomanPrem']").prop("disabled", true);

      $("#tblBase tbody").append(newRow);
    }
  });
});

//행삭제
$(document).ready(function () {
  // "+ 행삭제" 버튼 클릭 시 행 삭제
  $(".btn_minus").click(function () {
    var rowCount = $("#tblBase tbody tr[name='sInputData']").length;

    // 최소 1개의 행은 유지되도록 설정
    if (rowCount > 1) {
      $("#tblBase tbody tr[name='sInputData']:last-child").remove();
    }
  });
});

$(document).ready(function () {
  $("#btnInsCalc").click(function () {
    // 여행기간 계산
    var currentDate = new Date(); // 현재 날짜
    var startDateStr = $("#sActive1Fmdt").val();
    var endDateStr = $("#sActive1Todt").val();

    // 날짜 형식 (YYYY.MM.DD)을 변환하여 Date 객체로 생성
    var startDate = new Date(startDateStr.replace(/\./g, "-"));
    var endDate = new Date(endDateStr.replace(/\./g, "-"));

    // 날짜 차이 계산
    var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var selectedOption = $("#sJoinTarget option:selected").val();
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

    if (startDate < currentDate || endDate < currentDate) {
      alert("시작일과 종료일은 현재 날짜보다 이전일 수 없습니다.");
      return;
    }

    // 인원수 유효성 검사
    if (totPsnNo < 10) {
      alert("인원을 맞춰주세요.");
      return;
    }

    // 가입대상 생년월일 유효성 검사 및 보험료 계산
    var sumPrem = 0;

    $("input[name='sInsGrpAge']").each(function () {
      var value = parseInt($(this).val());
      var maleCount = 0;
      var femaleCount = 0;
      var maleCount = parseInt(
        $(this).closest("tr").find("input[name='nManNum']").val()
      );
      var femaleCount = parseInt(
        $(this).closest("tr").find("input[name='nWomanNum']").val()
      );

      if (!isNaN(value) && value >= 1930 && value <= 2020) {
        if (value >= 1930 && value <= 1970) {
          sumPrem += (maleCount * 2000 + femaleCount * 2000) * diffDays;
          if (selectedOption === "C") {
            sumPrem *= 2;
          }
        } else if (value > 1970 && value <= 2020) {
          sumPrem += (maleCount * 1000 + femaleCount * 1000) * diffDays;
          if (selectedOption === "C") {
            sumPrem *= 2;
          }
        }
      } else {
        alert("생년월일을 맞춰주세요.");
        return;
      }
    });

    // 결과 출력
    $("#totTravelPeriod strong").text(diffDays);
    $("#totPerson strong").text(totPsnNo);
    $("#totPrem strong").text(sumPrem);

    // 화면 전환
    $(".firstCalc").css("display", "none");
    $(".Calccc").css("display", "block");

    //계산결과

    //alert 뜨면 안됨
    if (
      startDate < currentDate ||
      endDate < currentDate ||
      totPsnNo < 10 ||
      value < 1930 ||
      value > 2020
    ) {
      $(".firstCalc").css("display", "block");
      $(".Calccc").css("display", "none");
    }
  });

  // 초기화 버튼 클릭 시 초기화
  $("#btnReset").click(function () {
    $("#totTravelPeriod strong").text("");
    $("#totPerson strong").text("");
    $("#totPrem strong").text("");
    $("input[name='nManNum']").val("");
    $("input[name='nWomanNum']").val("");
    $("input[name='sInsGrpAge']").val("");
    $(".firstCalc").css("display", "block");
    $(".Calccc").css("display", "none");
  });
});

//이것도 팝업창 띄우기
$(document).ready(function () {
  $("#lnk_info").click(function () {
    $("#popProductInfo").fadeIn();
  });

  $(".modal_off.modalProductInfo").click(function () {
    $("#popProductInfo").fadeOut();
  });
});

//가입안내 등등 팝업창 띄우기
$(document).ready(function () {
  $("#lnk_info").click(function () {
    $("#popProductInfo").css("display", "block");
  });

  $(".modal_off.modalProductInfo").click(function () {
    $("#popProductInfo").hide();
  });
});
$(document).ready(function () {
  $("#lnk_guaran").click(function () {
    $("#popProductInfo2").css("display", "block");
  });

  $(".modal_off.modalProductInfo").click(function () {
    $("#popProductInfo2").hide();
  });
});
$(document).ready(function () {
  $("#lnk_subs").click(function () {
    $("#popProductInfo3").css("display", "block");
  });

  $(".modal_off.modalProductInfo").click(function () {
    $("#popProductInfo3").hide();
  });
});
$(document).ready(function () {
  $("#bohumhelp").click(function () {
    $("#popProductInfo4").css("display", "block");
  });

  $(".modal_off.modalProductInfo").click(function () {
    $("#popProductInfo4").hide();
  });
});
