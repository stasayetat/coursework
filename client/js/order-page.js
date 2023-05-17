// let incButton = document.querySelector('.incButton');
let decButts = document.getElementsByClassName('decButton');
let incButts = document.getElementsByClassName('incButton');
let realIncButts = Array.from(incButts);
let realDecButts = Array.from(decButts);
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

const form = document.querySelector('.orderForm');
form.addEventListener('submit', (e)=> {
    if(!form.checkValidity()) {
        e.preventDefault();
    }
    form.classList.add('was-validated');
});
