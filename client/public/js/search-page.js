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
        const newItems =  await axios.get('/products', {
            params: {
                name: document.querySelector('#searchedCategory'),
                page: selectedPage-1,
                amountElements: 20
            }
        });
        allItems.innerHTML = '';
        newItems.forEach((item)=> {
           const div = document.createElement('div')
           div.classList.add('col-auto', 'my-2');
           div.innerHTML = `            <div class="card item text-center" style="width: 15rem;">
                <a href="#" class="itemTitle">
                    <img src="${item.photo}" alt="Logo" class="bd-placeholder-img card-img-top m-2" width="100" height="100">
                    <div class="car-body">
                        <h5 class="card-title pt-3">${item.name}</h5>
                    </div>
                </a>
                <div class="card-body">
                    <span>${item.price} USD</span>
                </div>
            </div>`;
            allItems.appendChild(div);
        });
    });
});