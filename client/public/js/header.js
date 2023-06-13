import axios from 'https://cdn.skypack.dev/axios';

let searchButton = document.querySelector('#searchButton');
let searchInput = document.querySelector('#searchInput');
searchButton.addEventListener('click', async (e)=> {
    e.preventDefault();
    let searchValue = searchInput.value;
    window.location.href = `/search/type?name=${searchValue}&type=name`;
});


