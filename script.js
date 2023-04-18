

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}



// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    let field_value = document.getElementById(input); 
    if (field_value.value.trim() === '') {
        if (input!="lastname"){
          document.getElementById(input).placeholder = "";
          showError(field_value, `${getFieldName(field_value)} can not be empty`);
          isRequired = true;
        }
      }  
     else {
      if (input=="firstname" || input=="lastname" || input=="password"){
        if (field_value.value.length < 3) {
          showError(field_value, `${getFieldName(field_value)} can not be less than 3 letters`);
        }
        else if (field_value.value.length > 13){
          showError(field_value, `${getFieldName(field_value)} can not be greater than 13`);
        }
        else{
          let letters = /^[A-Za-z]+$/;
          if (input=="firstname" || input=="lastname"){
            if (letters.test(field_value.value.trim())) {
              showSuccess(field_value);
            } else {
              showError(field_value, 'Enter only aplhabets');
            }
          }
          
        } 
      }  
      else if (input=="email"){
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (re.test(field_value.value.trim())) {
          showSuccess(field_value);
        } else {
          showError(field_value, 'Looks like this is not an email');
        }
      }
    }
  });

  return isRequired;
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkRequired(["firstname", "lastname", "email", "password"]) ;
});