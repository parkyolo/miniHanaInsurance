async function getUser() { // 로딩 시 사용자 가져오는 함수
    // [ flow : 등록 버튼 클릭 -> 클릭 이벤트 발생 -> POST 요청(await) -> getUser() 실행 ]
    try {
        /**
         * [GET 요청]
         * GET '/users'
         * " await 임을 생각하자! "
         * users 정보를 JSON 형식으로 RETURN >> res 에 저장
         */
        const res = await axios.get('/users');
        const users = res.data;                         // 유저 정보 저장
        const list = document.getElementById('list');   // id가 list 인 요소 불러오기
        list.innerHTML = '';

        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            // div, span 요소 생성
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            // [NODE.textContent] : https://developer.mozilla.org/ko/docs/Web/API/Node/textContent
            span.textContent = users[key];  // span 내 텍스트 설정
            // 버튼 요소 생성
            const edit = document.createElement('button');
            edit.textContent = '수정';  // button 내 텍스트 설정
            /**
             * [ 수정 button 이벤트 등록 ]
             * PUT(수정) 이벤트 등록
             * edit(수정 button)을 누르는 경우...
             */
            edit.addEventListener('click', async () => { // 수정 버튼 클릭
                // Prompt로 수정할 값 입력 받기.
                const name = prompt('바꿀 이름을 입력하세요');
                // 이름을 입력하지 않은 경우
                if (!name) {
                    return alert('이름을 반드시 입력하셔야 합니다');    // alert!
                }
                /**
                 * [ PUT 요청 ]
                 * /user/key 로 data(name)와 함께 전송
                 */
                try {
                    await axios.put('/user/' + key, { name });
                    // PUT 완료 후 getUser(); 실행
                    getUser();
                } catch (err) {
                    console.error(err); // 에러 발생
                }
        });
        
        // 버튼 생성
        const remove = document.createElement('button');
        remove.textContent = '삭제';    // 버튼 텍스트 지정
        /**
         * [ 삭제 button 이벤트 등록 ]
         * DELETE(삭제) 이벤트 등록
         * remove(삭제 button)을 누르는 경우...
         */
        remove.addEventListener('click', async () => { // 삭제 버튼 클릭
            try {
                /**
                 * [ DELETE 요청 ]
                 * /user/key 로 삭제 요청
                 */
                await axios.delete('/user/' + key);
                getUser();
            } catch (err) {
                console.error(err);
            }
        });
        
        // 준비한 요소 추가
        userDiv.appendChild(span);
        userDiv.appendChild(edit);
        userDiv.appendChild(remove);
        list.appendChild(userDiv);
        
        // 출력
        console.log(res.data);
      });
    } catch (err) {
        console.error(err);
    }
}
  
window.onload = getUser; // 화면 로딩 시 getUser 호출

/**
 * [등록 버튼 : id = "registUser"]
 * 폼 제출(submit) 시 실행
 */
document.getElementById('registUser').addEventListener('submit', async (e) => {
    // Event 인터페이스의 preventDefault() 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정합니다.
    // ex : 체크박스의 클릭 기본 동작은 체크박스를 체크하거나 체크 해제하는 것입니다. 이 예제는 체크박스의 클릭 기본 동작을 방지하는 모습을 보입니다.
    e.preventDefault();
    // input box에 입력된 값 가져오기
    const name = e.target.username.value;
    // 입력 값이 없느 경우
    if (!name) {
        return alert('이름을 입력하세요');
    }
    try {
        /**
         * [ flow : 등록 버튼 클릭 -> 클릭 이벤트 발생 -> POST 요청(await) ]
         * [POST 요청]
         * 메서드 : POST
         * url : /user
         * data : name
         * '/user'에 name을 같이 전송
         * " await 임을 생각하자! "
         */
        await axios.post('/user', { name });
        // getUser 실행
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});