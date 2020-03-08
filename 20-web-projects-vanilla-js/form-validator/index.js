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
    console.log(field);
    error.textContent = getFieldName(field) + " " + message; 
}
//Check Required Fields
function checkRequirements(fields) {

    fields.forEach(field => {

        if(field.value.trim() === '') {
            showError(field, 'is Required')
        }

        console.log("not continue!!")
    });
}

//get field name with first letter capitalized
function getFieldName(field) {
    return field.id.charAt(0).toUpperCase() + field.id.substring(1);
}

//Add submit event listener to form
form.addEventListener('submit', function(event) {

    event.preventDefault();

    checkRequirements([username, email, password, passwordConfirmation]);
});
