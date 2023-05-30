let carouselItems = document.querySelectorAll(".el-carousel__item");
let slideListLinks = document.querySelectorAll(".slideinfo-list__link");
let itemWidth;
let carouselInterval;

let activeIdx = 0;  // 현재 active 상태인 카로셀의 index
let carouselCnt = 3;


// 카로셀 업데이트하는 함수
function updateCarouselDisplay() {
  itemWidth = carouselItems[0].offsetWidth;
  let translateValue = [0, itemWidth, -itemWidth];
  for (let i=0; i<carouselCnt; i++) {
    let item = carouselItems[i];
    item.style.transform = `translateX(${translateValue[(i-activeIdx+carouselCnt)%carouselCnt]}px) scale(1)`;
  }

  for (let i=0; i<carouselCnt; i++) {
    if (i === activeIdx) {
      if (!slideListLinks[i].classList.contains('is-active')) {
        slideListLinks[i].classList.add('is-active');
      }
    } else {
      if (slideListLinks[i].classList.contains('is-active')) {
        slideListLinks[i].classList.remove('is-active');
      }
    }
  }
}

function startCarousel() {
  carouselInterval = setInterval(function() {
    nextIdx = (activeIdx + 1) % carouselCnt;
    carouselItems[activeIdx].classList.remove("is-active");
    carouselItems[nextIdx].classList.add("is-active");
    activeIdx = nextIdx;

    updateCarouselDisplay();
  }, 5000);
}

// 화살표 버튼 클릭이벤트 렌더 함수
function renderArrowBtns() {
  let arrowRight = document.querySelector(".el-carousel__arrow--right");
  arrowRight.addEventListener('click', () => {
      activeIdx = (activeIdx + 1) % carouselCnt;
      updateCarouselDisplay();
  });

  let arrowLeft = document.querySelector(".el-carousel__arrow--left");
  arrowLeft.addEventListener('click', () => {
      activeIdx = (activeIdx - 1 + carouselCnt) % carouselCnt;
      updateCarouselDisplay();
  });
}

function pauseCarousel() {
  clearInterval(carouselInterval);
}

function renderToggleButton () {
  let toggleButton = document.querySelector('.btn-control--toggle');
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

function renderSlideLink() {
  slideListLinks.forEach((slideLink) => {
    slideLink.addEventListener('click', () => {
      let curIdx = Array.from(slideListLinks).indexOf(slideLink);
      activeIdx = curIdx;
      updateCarouselDisplay();
    })
  });
}

function renderTab() {
  document.addEventListener('DOMContentLoaded', function() {
    let tabs = document.querySelectorAll('ul.tabs li');

    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            let tab_id = this.getAttribute('data-tab');
            let tabContents = document.querySelectorAll('.tab-content');

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
    if (item.classList.contains("is-active")) {
      activeIdx = i;
      break;
    }
  }

  updateCarouselDisplay();
  startCarousel();
  renderArrowBtns();
  renderToggleButton();
  renderSlideLink();
  renderTab();
}

init();