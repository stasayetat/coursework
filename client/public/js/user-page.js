const form = document.querySelector('.userForm');
const formGroups = document.querySelectorAll('.userForm .form-group')
form.addEventListener('submit', (e)=> {
    if(!form.checkValidity()) {
        e.preventDefault();
    }
    // form.classList.add('was-validated');
    formGroups.forEach((item)=> {
        if(item.classList.contains('req')) {
            item.classList.add('was-validated');
        }
    });
    let newPass = form.elements.newPassword;
    let repNewPass = form.elements.repNewPassword;
    if(newPass.value !== null && newPass.value === repNewPass.value) {
        repNewPass.classList.remove('is-invalid');
        repNewPass.classList.add('is-valid');
    } else {
        repNewPass.classList.remove('is-valid');
        repNewPass.classList.add('is-invalid');
    }
});