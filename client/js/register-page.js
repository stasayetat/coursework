const form = document.querySelector('.registerForm');
const formGroups = document.querySelectorAll('.registerForm .form-group')
form.addEventListener('submit', (e)=> {
    if(!form.checkValidity()) {
        e.preventDefault();
    }
    // form.classList.add('was-validated');
    formGroups.forEach((item)=> {
       if(item.classList.contains('repeatPassword')) {
           if(form.elements.password.value !== form.elements.repeatPassword.value) {
               item.classList.remove('was-validated');
               form.elements.repeatPassword.classList.add('is-invalid');
               e.preventDefault();
           } else {
               form.elements.repeatPassword.classList.remove('is-invalid');
               item.classList.add('was-validated');
           }
       } else {
           item.classList.add('was-validated');
       }
    });

});