// EventListener
const searchBtn = document.querySelector('.btn-search');
searchBtn.addEventListener('click', function (e) {
    // console.log('click');
    const inputBox = document.querySelector('#txt-search');
    let searchKeyword = inputBox.value;

    search(1, 10, searchKeyword)
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

    fetchAPI(API_URL, page)
}

function fetchAPI(API_URL, page) {
    fetch(API_URL)
        .then((res) => res.json())
        .then((res) => {
            let dataList = res.list;
            let dataCnt = res.total;
            // 리스트 출력
            let list = document.querySelector('.list');

            // 패스트푸드점 총 개수 출력
            let totalCnt = document.querySelector('.total');
            totalCnt.innerHTML = `총 ${dataCnt}개의 패스트푸드점을 찾았습니다.`

            list.innerHTML = ''; // 이전 검색 데이터 삭제

            dataList.forEach((data, idx) => {
                let template = document.querySelector('#item-template').cloneNode(true);
                template.removeAttribute('id');
                list.append(template);
                // list.innerHTML += template;

                template.querySelector('.item-no').innerHTML = idx + 1;
                template.querySelector('.item-name').innerHTML = data.name;
                template.querySelector('.item-addr').innerHTML = data.addr;
            })
            showPaging(page);
        })
}

function showPaging(page) {
    const paging = document.querySelector('.paging');
    paging.innerHTML = '';

    for (let i = 1; i <= 5; i++) {
        let aTag = document.createElement('a');
        aTag.setAttribute('href', `javascript:search(${i})`);
        aTag.innerHTML = i;

        if (i === page) aTag.setAttribute('class', 'current');
        // console.log(aTag);

        document.querySelector('.paging').append(aTag);
    }
}
