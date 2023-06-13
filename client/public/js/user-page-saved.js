import axios from 'https://cdn.skypack.dev/axios';

let allRemoveButtons = document.querySelectorAll('.remove-button');
allRemoveButtons.forEach((item)=> {
    item.addEventListener('click', async (e)=> {
        const res = await axios.delete('saved/refresh', {
            params: {
                name: item.closest('.item-col').querySelector('.itemTitle').innerText
            }
        });
        item.closest('.item-col').remove();
    });
});

// window.addEventListener('beforeunload', (e)=> {
//     let allSavedItems = document.querySelectorAll('.item-title');
//     let savedItemsList = [];
//     allSavedItems.forEach((item)=> {
//         savedItemsList.push(item.innerText);
//     });
//
// });