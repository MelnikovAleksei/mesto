const validationSettings = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
}
(function () {
  function getErrorElement(formElement, inputElement) {
    return formElement.querySelector(`#${inputElement.id}-error`);
  }

  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = getErrorElement(formElement, inputElement);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
  }

  function hideInputError(formElement, inputElement) {
    const errorElement = getErrorElement(formElement, inputElement);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(validationSettings.errorClass);
  }

  function hasInvalidInput(formInputs) {
    return formInputs.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function toggleSubmitButtonState(formInputs, formSubmitButton) {
    if (hasInvalidInput(formInputs)) {
      formSubmitButton.disabled = true;
      formSubmitButton.classList.add(validationSettings.inactiveButtonClass);
    } else {
      formSubmitButton.disabled = false;
      formSubmitButton.classList.remove(validationSettings.inactiveButtonClass);
    }
  }

  function inputEventListener(evt) {
    const formElement = evt.target.form;
    const inputElement = evt.srcElement;
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    checkInputValidity(formElement, inputElement);
    toggleSubmitButtonState(formInputs, formSubmitButton);
  }

  function openCheckValidity(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    formInputs.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement);
    });
    toggleSubmitButtonState(formInputs, formSubmitButton);
  };

  function setEventListeners(formElement) {
    const formInputs = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const formSubmitButton = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleSubmitButtonState(formInputs, formSubmitButton);
    formInputs.forEach(inputElement => {
      inputElement.addEventListener('input', inputEventListener);
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

  enableValidation(validationSettings);

})
