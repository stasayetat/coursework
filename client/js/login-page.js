const form = document.querySelector('.loginForm');
form.addEventListener('submit', (e)=> {
    if(!form.checkValidity()) {
        e.preventDefault();
    }
    form.classList.add('was-validated');
});