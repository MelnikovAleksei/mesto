const validationSettings = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

function hasInvalidInput(formInputs) {
  return formInputs.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    console.log('invalid');
  } else {
    console.log('valid');
  }
}

function toggleSubmitButtonState(formInputs, formSubmitButton) {
  if (hasInvalidInput(formInputs)) {
    formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
  } else {
    formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
  }
}

function setEventListeners(formElement) {
  const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleSubmitButtonState(formInputs, formSubmitButton);
  formInputs.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButtonState(formInputs, formSubmitButton);
    })
  })
}


function enableValidation(settingsObject) {
  const formsList = Array.from(document.querySelectorAll(settingsObject.formSelector));
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(settingsObject.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    })
  })
}
