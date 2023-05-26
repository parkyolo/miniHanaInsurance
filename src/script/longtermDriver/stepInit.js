const plnPrice = [8000, 11000, 16000];
let priceIdx = 1;

function startCountdown(minutes) {
    let seconds = minutes * 60;

    const countdown = setInterval(() => {
        const minutesRemaining = Math.floor(seconds / 60);
        const secondsRemaining = seconds % 60;

        const logonTimer = document.getElementById('spnLogonTimer');
        logonTimer.innerHTML = `${minutesRemaining}분${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}초`;

        if (seconds === 0) {
            clearInterval(countdown);
            // 로그인 유효 시간 초과 안내창
        } else {
            seconds--;
        }
    }, 1000);
}

// 플랜 선택에 따라 select_area의 위치를 변경하는 함수
function moveSelectArea() {
    const rdoPlnCod = document.querySelectorAll('input[name="rdoPlnCod"]');
    const select_area = document.querySelector('.select_area');

    rdoPlnCod.forEach((radio) => {
        radio.addEventListener('click', () => {
            if (radio.checked) {
                const value = radio.value;

                // 모든 라디오 버튼의 레이블에서 'on' 클래스 제거
                const labels = document.querySelectorAll('label');
                labels.forEach((label) => {
                    label.classList.remove('on');
                });

                // 선택된 라디오 버튼과 연결된 레이블에 'on' 클래스 추가
                const connectedLabel = document.querySelector(`label[for="${radio.id}"]`);
                connectedLabel.classList.add('on');

                // 선택된 버튼 위치로 select_area 이동
                if (value === "E") {
                    select_area.style.left = "560px";
                } else if (value === "C") {
                    select_area.style.left = "740px";
                } else if (value === "D") {
                    select_area.style.left = "920px";
                }

                // 선택된 플랜에 맞는 가격 노출
                showPrice();
            }
        });
    });
}

// 숫자 카운트업 애니메이션
function numberCounter(target_frame, target_number) {
    this.count = 0; this.diff = 0;
    this.target_count = parseInt(target_number);
    this.target_frame = document.getElementById(target_frame);
    this.timer = null;
    this.counter();
};

numberCounter.prototype.counter = function() {
    var self = this;
    this.diff = this.target_count - this.count;

    if(this.diff > 0) {
        self.count += Math.ceil(this.diff / 5);
    }

    this.target_frame.innerHTML = this.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if(this.count < this.target_count) {
        this.timer = setTimeout(function() { self.counter(); }, 20);
    } else {
        clearTimeout(this.timer);
    }
};

// 선택한 플랜에 맞는 가격을 보여주는 함수
function showPrice() {
    const rdoPlnCod = document.querySelectorAll('input[name="rdoPlnCod"]');
    rdoPlnCod.forEach((plnCod) => {
        if (plnCod.checked) {
            const value = plnCod.value;

            // 플랜에 따라 priceIdx 변경
            if (value === "E") {
                priceIdx = 0;
            } else if (value === "C") {
                priceIdx = 1;
            } else if (value === "D") {
                priceIdx = 2;
            }

            new numberCounter(`spnPlnCo${priceIdx}price`, plnPrice[priceIdx]);
            new numberCounter("strSumPrm", plnPrice[priceIdx]);
        }
    });
}

// 납입기간 클릭 이벤트 랜더 함수
function renderPeriodClickEvent() {
    const rdoPeriod = document.querySelectorAll('input[name="rdoGigan"]');
    rdoPeriod.forEach((period) => {
        period.addEventListener('click', () => {
            if (period.checked) {
                // 납입기간을 클릭하면 가격 카운트업 애니메이션을 보여준다.
                new numberCounter(`spnPlnCo${priceIdx}price`, plnPrice[priceIdx]);
                new numberCounter("strSumPrm", plnPrice[priceIdx]);
            }
        });
    });
}

function init() {
    startCountdown(30);
    renderPeriodClickEvent()
    moveSelectArea();
    showPrice();
}

init();