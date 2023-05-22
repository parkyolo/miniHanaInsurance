/* 자주묻는 질문 아코디언 */
document.querySelectorAll('.accodion_box li.active').forEach((element) => {
    element.classList.add('open');
    Array.from(element.children).forEach((child) => {
        if (child.tagName === 'DIV') {
            child.style.transition = "all 0.2s";
            child.style.padding = "25px";
            child.style.opacity = "1";
            child.style.height = "100%";
        }
    });
});

document.querySelector('.accodion_box').addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('openbox')) {
        event.preventDefault();
        var element = event.target.parentNode;
        if (element.classList.contains('open')) {
            element.classList.remove('open');
            element.querySelectorAll('li').forEach((li) => {
                li.classList.remove('open');
            });
            element.querySelectorAll('div').forEach((div) => {
                div.style.transition = "all 0.2s";
                div.style.padding = "0";
                div.style.opacity = "0";
                div.style.height = "0";
            });
        } else {
            element.classList.add('open');
            Array.from(element.children).forEach((child) => {
                if (child.tagName === 'DIV') {
                    child.style.transition = "all 0.2s";
                    child.style.padding = "25px";
                    child.style.opacity = "1";
                    child.style.height = "100%";
                }
            });
            Array.from(element.parentNode.children).forEach((sibling) => {
            if (sibling !== element) {
                Array.from(sibling.querySelectorAll('ul')).forEach((ul) => {
                    ul.style.transition = "all 0.2s";
                    ul.style.padding = "0";
                    ul.style.opacity = "0";
                    ul.style.height = "0";
                });
                sibling.classList.remove('open');
                sibling.querySelectorAll('li').forEach((li) => {
                    li.classList.remove('open');
                });
                sibling.querySelectorAll('div').forEach((div) => {
                    div.style.transition = "all 0.2s";
                    div.style.padding = "0";
                    div.style.opacity = "0";
                    div.style.height = "0";
                });
            }
            });
        }
    }
});

/* 페이지네이션 */
let faq_list = [
    {"TITLE": "", "CONTENTS": ""},
    {"TITLE": "", "CONTENTS": ""},
]
const accodion_box = document.querySelector(".accodion_box");
const page_list_box = document.querySelector(".page_list_box");

const totalContent = faq_list.length;
const showContent = 10;
const showButton = 10;
const totalPage = Math.ceil(totalContent / showContent);
let page = 1;