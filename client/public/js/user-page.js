import axios from 'https://cdn.skypack.dev/axios';
const form = document.querySelector('.userForm');
const formGroups = document.querySelectorAll('.userForm .form-group')
form.addEventListener('submit', async (e)=> {
    if(!form.checkValidity()) {
        e.preventDefault();
        return;
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
        e.preventDefault();
        return;
    }
    e.preventDefault();
    const formData = new FormData(form);

    const formDataObject = {};
    for (let [name, value] of formData) {
        formDataObject[name] = value;
    }
    const res = await axios.post('/users', formDataObject);
    if(res.data) {
        location.reload();
    }
});