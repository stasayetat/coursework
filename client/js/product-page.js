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

    buyButton.addEventListener('click', (e)=> {
        buyToast.classList.add('show');
        cartAmount.innerText = Number(cartAmount.innerText.split('\n')[0])+1;
    });
