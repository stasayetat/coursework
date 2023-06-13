import axios from 'https://cdn.skypack.dev/axios';

const paginationNav = document.querySelector('#pagination-nav');
const pageLinks = paginationNav.querySelectorAll('.page-link');
const allItems = document.querySelector('#allItems');
pageLinks.forEach((item)=> {
    item.addEventListener('click', async (e)=> {
        e.preventDefault();
        let selectedPage = parseInt(e.target.textContent);
        for(let i = 0; i < pageLinks.length; i++) {
            pageLinks[i].classList.remove("active");
        }
        pageLinks[selectedPage-1].classList.add("active");
        const name = document.querySelector('#searchedCategory').innerText;
        const newItems = await axios.get('/search/type/pages', {
            params: {
                page: selectedPage,
                name: name
            }
        });
        allItems.innerHTML = '';
        addDataPage(newItems.data);
    });
});

const formSelect = document.querySelector('.form-select');
formSelect.addEventListener('change', async (e)=> {
    let sortNum = 1;
    let sortMeth = formSelect.value;
    if(formSelect.value.startsWith('rev')) {
        sortMeth = 'price';
        sortNum = -1;
    }
    console.log(`${formSelect.value} - ${sortNum}`);
    const res = await axios.get('/search/type/sort', {
        params: {
            sort: sortMeth,
            sortNum: sortNum
        }
    });
    allItems.innerHTML = '';
    addDataPage(res.data);
    let selectedPage = 1;
    for(let i = 0; i < pageLinks.length; i++) {
        pageLinks[i].classList.remove("active");
    }
    pageLinks[selectedPage-1].classList.add("active");
});

function addDataPage(newItemsData) {
    newItemsData.forEach((item)=> {
        const div = document.createElement('div')
        div.classList.add('col-auto', 'my-2');
        div.innerHTML += `
                <div class="card item text-center" style="width: 15rem;">
                    <a href="/product/${item._title}" class="itemTitle">
<!--                        card-img-top-->
                        <img src="${item._image}" alt="Logo" class="bd-placeholder-img m-2" width="200" height="200">
                        <div class="car-body">
                            <h5 class="card-title pt-3">${item._title}</h5>
                        </div>
                    </a>
                    <div class="card-body">
                        <span>${item._price} ГРН</span>
                    </div>
                </div>`;
        allItems.appendChild(div);
    });
}