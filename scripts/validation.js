const validationSettings = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}

function setEventListeners(formElement) {
  console.log(formElement);
}


function enableValidation(settingsObject) {
  const formsList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formsList.forEach(formElement => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    const fieldsetList = Array.from(formElement.querySelectorAll(validationSettings.fieldsetSelector));
    fieldsetList.forEach(fieldset => {
      setEventListeners(fieldset);
    })
  })
}
