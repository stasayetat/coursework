import axios from 'https://cdn.skypack.dev/axios';
const form = document.querySelector('.registerForm');
const formGroups = document.querySelectorAll('.registerForm .form-group')
form.addEventListener('submit', async(e)=> {
    document.querySelector('.invalid-response').innerText = '';
    if(!form.checkValidity()) {
        e.preventDefault();
    }
    let checkPass = false;
    // form.classList.add('was-validated');
    formGroups.forEach( (item)=> {
       if(item.classList.contains('repeatPassword')) {
           if(form.elements.password.value !== form.elements.repeatPassword.value) {
               item.classList.remove('was-validated');
               form.elements.repeatPassword.classList.add('is-invalid');
               e.preventDefault();
               checkPass = true;
               return;
           } else {
               form.elements.repeatPassword.classList.remove('is-invalid');
               item.classList.add('was-validated');
           }
       } else {
           item.classList.add('was-validated');
       }
    });
    if(checkPass)
        return;
    e.preventDefault();
    const formData = new FormData(form);
    const formDataObject = {};
    for (let [name, value] of formData) {
        formDataObject[name] = value;
    }
    const res = await axios.post('/register', formDataObject);
    if(typeof res.data.error !== "undefined") {
        document.querySelector('.invalid-response').innerText = res.data.error;
    }
    console.log("Register form send");
});