// let incButton = document.querySelector('.incButton');
import axios from 'https://cdn.skypack.dev/axios';

let decButts = document.getElementsByClassName('decButton');
let incButts = document.getElementsByClassName('incButton');
let closeButts = document.getElementsByClassName('close-btn');
let boughtItems = document.querySelector('#boughtItems');
let realIncButts = Array.from(incButts);
let realDecButts = Array.from(decButts);
let realCloseButts = Array.from(closeButts);
realIncButts.forEach((item)=> {
    item.addEventListener('click', ()=> {
        let quantityValue = item.previousElementSibling;
        if(quantityValue.value < 10) {
            quantityValue.value++;
        }
    })
});

realDecButts.forEach((item)=> {
    item.addEventListener('click', ()=> {
        let quantityValue = item.nextElementSibling;
        if(quantityValue.value > 1) {
            quantityValue.value--;
        }
    })
});

realCloseButts.forEach((item)=> {
    item.addEventListener('click', async ()=> {
        let thisItem = item.closest('.bt-item');
        const res = await axios.delete('/orders/delete', {
            params: {
                name: thisItem.querySelector('.itemName').innerText
            }
        });
        thisItem.remove();
        if(boughtItems.childElementCount < 2) {
            const spanElement = document.createElement('span');
            spanElement.classList.add('fw-bold', 'fs-4');
            spanElement.textContent = 'Корзина порожня :(';
            boughtItems.appendChild(spanElement);
        }
    });
})



const form = document.querySelector('#orderForm');
form.addEventListener('submit', async (e)=> {
    if (!form.checkValidity() || !boughtItems.children[1].classList.contains('bt-item')) {
        e.preventDefault();
        form.classList.add('was-validated');
    } else {
        e.preventDefault();
        const items = [];
        const btItemElements = document.getElementsByClassName('bt-item');
        for(let el of btItemElements) {
            const item = [el.querySelector('.itemName').innerText,
                el.querySelector('.itemAmount').value]
            items.push(item)
        }
        const formData = new FormData(form);
        formData.append('items', JSON.stringify(items));
        // formData.append('items', items);
        const formDataObject = {};
        for (let [name, value] of formData) {
            formDataObject[name] = value;
            console.log(`Name ${name} - value ${value}`);
        }
        const res = await axios.post('/orders', formDataObject);
        console.log(res);
        if(res.request.response === 'Order created') {
            window.location.href = '/users/orders';
        }

    }

});

window.addEventListener('beforeunload', (e)=> {
    let allSavedItems = document.querySelectorAll('.bt-item');
    let savedItemsList = [];
    allSavedItems.forEach((item)=> {
        savedItemsList.push(item.innerText);
    });
    axios.delete('orders/refresh', savedItemsList);
});
