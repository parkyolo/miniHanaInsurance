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

$(document).ready(function () {
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
