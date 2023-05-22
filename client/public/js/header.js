import axios from 'https://cdn.skypack.dev/axios';

let searchButton = document.querySelector('#searchButton');
let searchInput = document.querySelector('#searchInput');
searchButton.addEventListener('click', async ()=> {
    let searchValue = searchInput.value;
    await axios.get(`/search/name=${searchValue}`);
});

let userIcon = document.querySelector('#userIcon');
userIcon.addEventListener('click', async ()=> {
    alert(123);
    // await axios.get('/user/main/');
});

let savedItems = document.querySelector('#savedItems');
savedItems.addEventListener('click', async ()=> {
    // await axios.get('/user/saved/');
});

let cartItem = document.querySelector('#savedItems');
cartItem.addEventListener('click', async ()=> {
    // await axios.get('/cart/');
});


