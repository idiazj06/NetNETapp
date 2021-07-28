form.addEventListener('submit', function AlmacenarLocalStorage() {

    //Captura de datos y almacenamiento en variables

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }

    let inputName = document.getElementById('inputName').value;
    let inputApellido = document.getElementById('inputApellido').value;
    let email = document.getElementById('email').value;
    let inputTelefono = document.getElementById('inputTelefono').value;
    let gender = document.getElementById('gender').value;

    if (inputName < 1 || inputApellido < 1 || email < 1 || inputTelefono < 7 || gender === "") {
        alert('Debes completar todos los campos requeridos');
    } else {
        localStorage.setItem('Nombre', inputName);
        localStorage.setItem('Apellido', inputApellido);
        localStorage.setItem('Email', email);
        localStorage.setItem('Telefono', inputTelefono);
        localStorage.setItem('Genero', gender);
    }

})

function ObtenerLocalStorage() {
    let nombre = localStorage.getItem('Nombre');
    let email = localStorage.getItem('Email');
    let genero = localStorage.getItem('Genero');
    let mensaje = localStorage.getItem('Mensaje');


}



