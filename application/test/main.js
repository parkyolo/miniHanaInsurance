const { off } = require("process");

async function getUser() { // 사용자 정보를 가져오는 함수
    try {
        const res = await axios.get('/users'); // 서버로부터 사용자 목록을 가져옴
        const users = res.data;
        const list = document.getElementById('list'); // html에서 list 태그를 가져옴.
        list.innerHTML = ''; // list 태그의 내용을 초기화시킴 수정, 삭제, 추가시 내용이 달라지니깐(세가지 작업후 getUser 호출하여 갱신하여 보여줄것임)
        
        // Object.keys() - 주어진 객체의 속성 이름들을 일반적인 반복문과 동일한 순서로 순회되는 열거할 수 있는 배열로 반환함.
        // users에 key: 시각, value: 이름으로 들어가 있음. map에 키들이 들어감
        // 배열의 map 메소드는 콜백 함수에서 리턴한 값들을 가지고 새로운 배열을 만드는 함수.
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div'); // 각 이름이 가지는 영역
            const span = document.createElement('span'); // 이름
            span.textContent = users[key];
            const edit = document.createElement('button'); // 수정 버튼
            edit.textContent = '수정';
            edit.addEventListener('click', async () => { // 수정 버튼 이벤트
                const name = prompt('바꿀 이름을 입력하세요.');
                if (!name) {
                    return alert('이름을 반드시 입력해야 합니다.');
                }

                try {
                    await axios.put('/user/' + key, { name }); // '/user/사용자id' 에 치환할 데이터를 함께 보냄.
                    getUser(); // 수정했으니 목록 갱신하여 보여주자.
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button'); // 삭제 버튼
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => { // 삭제 버튼 이벤트
                try {
                    await axios.delete('/user/' + key) // '/user/사용자id' 해당id 사용자 서버에서 제거
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });

            // userDiv에 이름, 수정, 삭제 버튼을 달아줌
            userDiv.append(span);
            userDiv.append(edit);
            userDiv.append(remove);
            
            // list에 userDiv를 달아줌.
            list.append(userDiv);

            // 이 과정을 모든 users에 대해 적용하고 list에 붙여나감
        })
    } catch (err) {
        console.error(err);
    }
} // getUser()

window.onload = getUser; // 화면(restFront.html) 로딩이 끝나면 getUser 호출

// 폼 제출(submit)시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // form안에 submit 버튼을 눌러도 새로고침 안되게 (submit은 실행됨)
    const name = e.target.username.value; /* console.log(e.target) */
    if (!name) {
        return alert('이름을 반드시 입력하세요.');
    }
    try {
        await axios.post('/user', { name }); // 새로 등록할 이름과 함께 요청
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
})