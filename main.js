// EventListener
const searchBtn = document.querySelector('.btn-search');
searchBtn.addEventListener('click', function (e) {
    // console.log('click');
    const inputBox = document.querySelector('#txt-search');
    let searchKeyword = inputBox.value;

    search(1, null, searchKeyword)
})

let searchBox = document.querySelector('#txt-search');
searchBox.addEventListener('keypress', function (e) {
    if (e.code === 'Enter') {
        searchBtn.click();// Enter 키 입력시  searchBtn 클릭
    }
})

function search(page, perPage, searchKeyword) {
    if (typeof page !== 'number' || page < 1) page = 1; // default 값은 1
    if (typeof perPage !== 'number' || perPage <= 0) perPage = 10; // 한 화면에 몇개의 데이터를 표시할 것인가. default 값은 10


    const params = {
        page: page,
        perPage: perPage,
        searchKeyword: searchKeyword,
    }
    let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    let API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood?' + query;

    fetchAPI(API_URL, page, perPage, searchKeyword)
}

function fetchAPI(API_URL, page, perPage, searchKeyword) {
    fetch(API_URL)
        .then((res) => res.json())
        .then((res) => {
            let dataList = res.list;
            let dataCnt = res.total;
            // 리스트 출력
            let list = document.querySelector('.list');

            // 패스트푸드점 총 개수 출력
            let total = document.querySelector('.total');
            total.innerHTML = `총 ${dataCnt}개의 패스트푸드점을 찾았습니다.`

            list.innerHTML = ''; // 이전 검색 데이터 삭제

            dataList.forEach((data, idx) => {
                let template = document.querySelector('#item-template').cloneNode(true);
                template.removeAttribute('id'); // id 중복 제거

                let no = (page - 1) * perPage + idx + 1; // 배열문 밖의 인자를 사용하여 페이지가 넘어가도 인덱스번호는 유지되도록 함
                template.querySelector('.item-no').innerHTML = no;
                template.querySelector('.item-name').innerHTML = data.name;
                template.querySelector('.item-addr').innerHTML = data.addr;

                list.append(template);
            })

            showPaging(page, perPage, dataCnt, searchKeyword);
        })
}

function showPaging(page, perPage, total, searchKeyword) {
    const paging = document.querySelector('.paging');
    paging.innerHTML = ''; // 불필요한 페이지 제거

    // paging단 생성
    let numPages = 5; // 한 화면에서 보여질 페이지 개수
    let pageStart = Math.floor((page - 1) / numPages) * numPages + 1 // perPage 첫번째 숫자.
    let pageEnd = pageStart + numPages - 1; // perPage 마지막 숫자
    let totalPages = Math.floor(total / perPage) + 1; // 전체 페이지 숫자
    // console.log('total: ' + total);
    // console.log('pageEnd: ' + pageEnd);
    if (pageEnd > totalPages) pageEnd = totalPages; // 마지막 페이지가 전체 페이지보다 클 경우 전체 페이지를 마지막 페이지로 초기화


    // 이전, 다음 버튼 로직
    let prevPage = pageStart - 1;
    if (prevPage < 1) prevPage = 1;
    let nextPage = pageEnd + 1;
    if (nextPage > totalPages) nextPage = totalPages;

    // 이전 버튼 삽입
    let insertPrevPage = document.createElement('a');
    insertPrevPage.setAttribute('href', `javascript:search(${prevPage},${perPage},\'${searchKeyword}\')`);
    insertPrevPage.innerHTML = '처음';
    insertPrevPage.setAttribute('class', 'prev');
    paging.append(insertPrevPage);

    // 페이지 넘버 삽입
    for (let i = pageStart; i <= pageEnd; i++) {
        let currentPage = document.createElement('a');
        currentPage.setAttribute('href', `javascript:search(${i},${perPage},\'${searchKeyword}\')`);
        currentPage.innerHTML = `${i}`; // 페이징할 페이지 번호 생성

        if (i === page) currentPage.setAttribute('class', 'current'); // 현재 페이지 확인

        paging.append(currentPage); // 태그 삽입
    }

    // 다음 버튼 삽입
    let insertNextPage = document.createElement('a');
    insertNextPage.setAttribute('href', `javascript:search(${nextPage},${perPage},\'${searchKeyword}\')`);
    insertNextPage.innerHTML = '마지막';
    insertNextPage.setAttribute('class', 'next');
    paging.append(insertNextPage);
}
