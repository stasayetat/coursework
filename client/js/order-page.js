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
    item.addEventListener('click', ()=> {
        let thisItem = item.closest('.bt-item');
        thisItem.remove();
        if(boughtItems.childElementCount < 2) {
            const spanElement = document.createElement('span');
            spanElement.classList.add('fw-bold', 'fs-4');
            spanElement.textContent = 'Корзина порожня :(';
            boughtItems.appendChild(spanElement);
        }
    });
})



const form = document.querySelector('.orderForm');
form.addEventListener('submit', async (e)=> {
    if (!form.checkValidity() || !boughtItems.children[1].classList.contains('bt-item')) {
        e.preventDefault();
        form.classList.add('was-validated');
    } else {
        const products = [];
        const btItemElements = document.getElementsByClassName('bt-item');
        for(let el of btItemElements) {
            const product = {
                itemName: el.querySelector('.itemName').innerText,
                itemAmount: el.querySelector('.itemAmount').value
            }
            products.push(product)
        }
        const formData = new FormData(form);
        formData.append('products', JSON.stringify(products));
        await axios.post('/order', formData);
    }

});
