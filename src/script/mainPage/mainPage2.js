const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function showSlide(n) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

// 자동 슬라이드 전환 설정
const interval = setInterval(nextSlide, 3000);

// 마우스 hover시 자동 슬라이드 멈추도록 설정
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
  clearInterval(interval);
});

carousel.addEventListener('mouseleave', () => {
  interval = setInterval(nextSlide, 3000);
});

// 좌우 화살표 클릭 이벤트 설정
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

prevButton.addEventListener('click', previousSlide);
nextButton.addEventListener('click', nextSlide);

// 초기 슬라이드 표시
showSlide(currentSlide);
