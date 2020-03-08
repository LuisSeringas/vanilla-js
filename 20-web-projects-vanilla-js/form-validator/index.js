//Get all Dom elements to manipulate
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirmation = document.getElementById('password-confirmation');

//Show error message
function showError(field, message) {
    const parentNode = field.parentNode;
    parentNode.className = 'form-control error';

    const error = parentNode.querySelector('small');

    error.textContent = message;
}

//Show success
function showSuccess(field) {
    const parentNode = field.parentNode;
    parentNode.className = 'form-control';
}

//Check required fields
function checkEmptyFields(fields) {
    fields.forEach(field => {
        if (field.value.trim() === '') {
            showError(field, `${getFieldName(field)} is required`);
        }
    });
}

//Check a valid email
function checkValidEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(String(email.value).toLowerCase())) {
        showSuccess(email);
        return;
    }

    showError(email, 'Email is not valid');
}

//Check minimum and maximum of field length
function checkLength(field, min, max) {
    if (field.value.length < min) {
        showError(
            field,
            `${getFieldName(field)} must be at least ${min} characters`
        );
        return;
    }

    if (field.value.length > max) {
        showError(
            field,
            `${getFieldName(field)} must be less than ${max} characters`
        );
        return;
    }

    showSuccess(field);
}

function checkPasswordConfirmation(password, passToConfirm) {

    if(password.value !== passToConfirm.value) {
        showError(passToConfirm, 'Passwords do not match');
        return;
    }

    showSuccess();
}

//get field name with first letter capitalized
function getFieldName(field) {
    if (field.id === 'password-confirmation') {
        const indexOfHyphen = field.id.indexOf('-');

        return (
            field.id.charAt(0).toUpperCase() +
            field.id.substring(1, indexOfHyphen) +
            ' ' +
            field.id.substring(indexOfHyphen + 1)
        );
    }

    return field.id.charAt(0).toUpperCase() + field.id.substring(1);
}

//Add submit event listener to form
form.addEventListener('submit', function(event) {
    event.preventDefault();

    checkEmptyFields([username, email, password, passwordConfirmation]);

    checkLength(username, 3, 15);
    checkLength(password, 3, 15);
    checkValidEmail(email);
    checkPasswordConfirmation(password, passwordConfirmation);
});
