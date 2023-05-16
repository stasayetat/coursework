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
