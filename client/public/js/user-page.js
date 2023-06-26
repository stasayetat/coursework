import axios from 'https://cdn.skypack.dev/axios';
const form = document.querySelector('.userForm');
const formGroups = document.querySelectorAll('.userForm .form-group')
let prevPassword = form.elements.prevPassword;
form.addEventListener('submit', async (e)=> {
    if(!form.checkValidity()) {
        prevPassword.classList.add('is-invalid');
        e.preventDefault();
        return;
    }
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


    try {
        const res = await axios.post('/users', formDataObject);
        location.reload();
    } catch (e) {
        if(e.message === 'Request failed with status code 404') {
                prevPassword.classList.add('is-invalid');
        }
    }

});