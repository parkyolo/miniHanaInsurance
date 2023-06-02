let carouselItems = document.querySelectorAll(".el_carousel__item");      // carousel에 들어가는 각 슬라이드
let slideListLinks = document.querySelectorAll(".slideinfo_list__link");  // 
let itemWidth;
let carouselInterval;

let activeIdx = 0;  // 현재 active 상태인 carousel의 index
let carouselCnt = 3;


// carousel 업데이트 함수
function updateCarousel() {
  itemWidth = carouselItems[0].offsetWidth;
  let translateValue = [0, itemWidth, -itemWidth];
  for (let i=0; i<carouselCnt; i++) {
    let item = carouselItems[i];
    item.style.transform = `translateX(${translateValue[(i-activeIdx+carouselCnt)%carouselCnt]}px) scale(1)`;
  }

  for (let i=0; i<carouselCnt; i++) {
    if (i === activeIdx) {
      if (!slideListLinks[i].classList.contains('active')) {
        slideListLinks[i].classList.add('active');
      }
    } else {
      if (slideListLinks[i].classList.contains('active')) {
        slideListLinks[i].classList.remove('active');
      }
    }
  }
}


// carousel 실행 함수
function startCarousel() {
  carouselInterval = setInterval(function() {
    nextIdx = (activeIdx + 1) % carouselCnt;
    carouselItems[activeIdx].classList.remove("active");
    carouselItems[nextIdx].classList.add("active");
    activeIdx = nextIdx;

    updateCarousel();
  }, 5000);
}


// 화살표 버튼 click event render 함수
function renderArrowBtns() {
  let arrowRight = document.querySelector(".el_carousel__arrow__right");
  arrowRight.addEventListener('click', () => {
      activeIdx = (activeIdx + 1) % carouselCnt;
      updateCarousel();
  });

  let arrowLeft = document.querySelector(".el_carousel__arrow__left");
  arrowLeft.addEventListener('click', () => {
      activeIdx = (activeIdx - 1 + carouselCnt) % carouselCnt;
      updateCarousel();
  });
}


// carousel을 멈추는 함수
function pauseCarousel() {
  clearInterval(carouselInterval);
}


// pause toggle 버튼을 render하는 함수
function renderToggleButton () {
  let toggleButton = document.querySelector('.btn_control__toggle');
  toggleButton.addEventListener('click', function() {
    if (toggleButton.classList.contains('pause')) {
      toggleButton.classList.remove('pause');
      startCarousel();
    } else {
      toggleButton.classList.add('pause');
      pauseCarousel();
    }
  });
}


// slide link render 함수
function renderSlideLink() {
  slideListLinks.forEach((slideLink) => {
    slideLink.addEventListener('click', () => {
      let curIdx = Array.from(slideListLinks).indexOf(slideLink);
      activeIdx = curIdx;
      updateCarousel();
    })
  });
}


// Tab에 click event render 함수
function renderTab() {
  document.addEventListener('DOMContentLoaded', function() {
    let tabs = document.querySelectorAll('ul.tabs li');

    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            let tab_id = this.getAttribute('data-tab');
            let tabContents = document.querySelectorAll('.tab_content');

            tabs.forEach((tab) => {
                tab.classList.remove('current');
            });

            tabContents.forEach((content) => {
                content.classList.remove('current');
            });

            this.classList.add('current');
            document.getElementById(tab_id).classList.add('current');
        });
    });
  });
}


function init() {

  for (let i = 0; i < carouselCnt; i++) {
    let item = carouselItems[i];
    if (item.classList.contains("active")) {
      activeIdx = i;
      break;
    }
  }

  window.addEventListener(`resize`, () => {
    if (window.innerWidth < 1200) {
      document.querySelector('#tab-1 .right .insurance_title').innerHTML = "적게 탈수록 할인받고<br>환경도 생각하는";
      document.querySelector('#tab-2 .right .insurance_title').innerHTML = "내 건강등급에 따른<br>Grade별 보험료 적용";
      document.querySelector('#tab-3 .right .insurance_title').innerHTML = "우리 아이를 위한<br>현명한 선택";
    } else {
      document.querySelector('#tab-1 .right .insurance_title').innerHTML = "적게 탈수록 할인받고 환경도 생각하는";
      document.querySelector('#tab-2 .right .insurance_title').innerHTML = "내 건강등급에 따른 Grade별 보험료 적용";
      document.querySelector('#tab-3 .right .insurance_title').innerHTML = "우리 아이를 위한 현명한 선택";
    }
  })

  updateCarousel();
  startCarousel();
  renderArrowBtns();
  renderToggleButton();
  renderSlideLink();
  renderTab();
}

init();