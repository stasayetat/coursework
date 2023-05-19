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
const cartAmount = document.getElementById('cartAmount');

buyButton.addEventListener('click', async (e)=> {
    buyToast.querySelector('#itemNameToast').innerText = document.querySelector('#itemName').innerText;
    buyToast.classList.add('show');
    cartAmount.innerText = Number(cartAmount.innerText.split('\n')[0])+1;
    await axios.post('/order/add', document.querySelector('#itemName').innerText);
});

const moreRevButton = document.querySelector('#moreRevButton');
const allReviews = document.querySelector('#allReviews');
moreRevButton.addEventListener('click', async ()=> {
    const allGetRevs = await axios.get(`reviews/all?id=${id}`);
    moreRevButton.remove();
    for(let el of allGetRevs) {
        const div = document.createElement('div');
        const rate = el.rate;
        div.innerHTML = `    <div class="container bg-body-secondary rounded">
        <div class="row">
            <div class="col-auto mt-3">
                <span class="ms-2 fs-5">${el.name} ${el.surname}</span>
            </div>
            <div class="col-auto mt-2">
                <ul class="star_rating ps-0" id="starRatingNumber">
<!--                    <i class="bi-star-fill fs-4"></i>-->
<!--                    <i class="bi-star-fill fs-4"></i>-->
<!--                    <i class="bi-star-fill fs-4"></i>-->
<!--                    <i class="bi-star-fill fs-4"></i>-->
<!--                    <i class="bi-star-fill fs-4"></i>-->
                </ul>
            </div>
            <div class="col-auto mt-3">
                <span class="ms-2 fs-5">${el.date}</span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="form-control">
                    ${el.message}
                </div>

                <div class="mt-3 mb-3">
                    <span class="fs-4 fw-bold">Плюси</span>
                    <div class="form-control mt-1">
                        ${el.adv}
                    </div>
                </div>

                <div class="mt-3 mb-3">
                    <span class="fs-4 fw-bold">Мінуси</span>
                    <div class="form-control mt-1">
                        ${el.disAdv}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        const rateUl = div.querySelector('#starRatingNumber');
        for(let i = 0; i < 5; i++) {
            let curRat = document.createElement('li');
            if(i <= rate) {
                curRat.innerHTML = '<i class="bi-star-fill fs-4 golden-star"></i>';
            } else {
                curRat.innerHTML = '<i class="bi-star-fill fs-4"></i>';
            }
            rateUl.appendChild(curRat);
        }
        allReviews.appendChild(div);
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
    await axios.post('/reviews/add', formData);
    e.preventDefault();
});

const followButton = document.querySelector('#followButton');
followButton.addEventListener('click', async ()=> {
    let heart = followButton.querySelector('#heart');
    heart.classList.contains('followed') ? heart.classList.remove('followed') : heart.classList.add('followed');
    const followHeart = followButton.querySelector('.followed');
    if(followHeart) {
        heart.src = "/client/src/img/heart-solid.svg";
    } else {
        heart.src = "/client/src/img/heart-regular.svg";
    }
});



window.addEventListener('beforeunload', (e)=> {
    let heart = followButton.querySelector('#heart');
    heart.classList.contains('followed') ? axios.post('/followed/add', document.querySelector('#itemName')) : null;
});