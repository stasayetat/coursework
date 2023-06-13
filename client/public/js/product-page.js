import axios from 'https://cdn.skypack.dev/axios';

let allStars = document.querySelectorAll('.star');
allStars.forEach((item, index)=> {
    item.addEventListener('click', (e)=> {
        e.preventDefault();
        allStars.forEach((star, indexTwo)=> {
            document.querySelector('#rateStar').value = index+1;
            if(indexTwo <= index) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        })
    });
});

const buyButton = document.getElementById('buyButton')
const buyToast = document.getElementById('buyToast');
const cartItem = document.getElementById('cartItem');

buyButton.addEventListener('click', async (e)=> {
    if(buyButton.innerText === 'Оформити замовлення') {
        window.location.href = '/orders';
        return;
    }
    buyToast.querySelector('#itemNameToast').innerText = document.querySelector('#itemName').innerText;
    buyToast.classList.add('show');
    cartItem.innerText = Number(cartItem.innerText.split('\n')[0])+1;
    const qwe = await axios.post('/orders/add', {
        params: {
            name: document.querySelector('#itemName').innerText
        }
    });
    if(qwe.request.responseURL === 'http://localhost:8000/login') {
        window.location.href = '/login';
    } else if (qwe.request.response === document.querySelector('#itemName').innerText){
        buyButton.innerText = 'Оформити замовлення';
    }
});


const reviewForm = document.querySelector('#reviewForm');
reviewForm.addEventListener('submit', async (e)=> {
    if(!reviewForm.checkValidity()) {
        if(reviewForm.rateStar.value === "") {
            reviewForm.querySelector('.invalid-feedback-rate').classList.remove('d-none');
        }
        return;
    } else {
        document.querySelector('.invalid-feedback-rate').classList.add('d-none');
    }
    reviewForm.classList.add('was-validated');
    const formData = new FormData(reviewForm);
    formData.append('itemTitle', document.querySelector('#itemName').innerText);
    await axios.post('/reviews/add', formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    e.preventDefault();
});

const followButton = document.querySelector('#followButton');
followButton.addEventListener('click', async (e)=> {
    if(document.querySelector('#userName')) {
        let heart = followButton.querySelector('#heart');
        heart.classList.contains('followed') ? heart.classList.remove('followed') : heart.classList.add('followed');
        const followHeart = followButton.querySelector('.followed');
        if(followHeart) {
            heart.src = "/src/img/heart-solid.svg";
        } else {
            heart.src = "/src/img/heart-regular.svg";
        }
    } else {
        window.location.href = '/login';
        e.preventDefault();
    }

});



window.addEventListener('beforeunload', async (e)=> {
    let heart = followButton.querySelector('#heart');
    if(heart.classList.contains('followed')) {
        const qwe = await axios.post('/users/saved/add', {
            params: {
                name: document.querySelector('#itemName').innerText
            }
        });
    }
});