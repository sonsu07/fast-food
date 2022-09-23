# 패스트푸드점 찾기 미니 프로젝트
- [X] fetch 통신을 이용하여 서버에서 데이터 받아와서 뿌리기
  - [ ] ajax 통신으로 구현된 코드들을 fetch 통신으로 변경.
- [X] 검색기능 구현
- [ ] 페이징 기능 구현

---

### 패스트푸드점 목록 API
https://floating-harbor-78336.herokuapp.com/fastfood

### API 설명
https://floating-harbor-78336.herokuapp.com


## 배운점

---

### fetch를 이용하여 queryString을 하는 2가지 방법
#### 1번 방법
```js
const params = {
    searchKeyword: searchKeyword,
}
let query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
let API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood?' + query;
```

#### 2번 방법
```js
const API_URL = new URL('https://floating-harbor-78336.herokuapp.com/fastfood');
const params = {
    searchKeyword: searchKeyword,
}
API_URL.search = new URLSearchParams(params).toString();
```
- params를 String으로 바꾸는 방식이다보니 숫자형태를 써야하는 페이징 같은 경우에 문제생김. 

https://dalya-tech.tistory.com/47 참고

https://stackoverflow.com/questions/35038857/setting-query-string-using-fetch-get-request 참고

---

### HTML 템플릿을 생성할 때는 문자열들을 변수에 넣어두는 것보다 HTML에서 하나를 생성해둔 뒤 숨겨두고, clone 형식으로 쓰는게 편함

- HTML단에서 하나의 템플릿을 생성하고 `display:none` 속성을 부여해둔다. 
- 해당 템플릿의 id나 class를 불러와서 cloneNode 함수를 사용한다. (cloneNode 속성은 true 부여)
- id로 불러와서 clone 할경우, id속성은 삭제해준다. 
```js
let template = document.querySelector('#item-template').cloneNode(true);
template.removeAttribute('id');
```

---

### Ajax에서 존재하는 trigger 속성은 대체가능
* trigger 속성을 통해 다른 타겟을 불러와 클릭하게 만드는 기능은
* 바닐라 자바스크립트에서는 그냥 `.click()`시켜버리자
* 이벤트 객체를 생성하여 전달하는 방법도 있지만, 굳이 번거롭게 안해도 될 듯하다. 
```js
// 인풋창에서 엔터키를 누르면 searchBtn을 클릭
let searchBox = document.querySelector('#txt-search');
searchBox.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        searchBtn.click();// Enter키 입력시  searchBtn 클릭
    }
})
```

---

### jQuery 동적 태그 생성 => 바닐라 자바스크립트로 변경
```js
// jQuery
$(`<a href="javascript:search(${i})">${i}</a>`)

// 바닐라 자바스크립트로 변경시
let aTag = document.createElement('a');
aTag.setAttribute('href', `javascript:search(${i})`);
aTag.innerHTML = i;
```
* 이런식으로 변경. 
* 하드코딩시키면 체이닝방식으로 클래스나 다른 속성부여 못함. 

https://ludeno-studying.tistory.com/82 참고