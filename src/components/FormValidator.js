export class FormValidator {
    constructor(formElement, openFormButtons, settings) {
      this._formElement = formElement;
      this._settings = settings;
      this._openFormButtons = openFormButtons;
    }
    _getErrorElement(inputElement) {
      return this._formElement.querySelector(`#${inputElement.id}-error`);
    }
    _showInputError(inputElement, validationMessage, errorElement) {
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
    _hideInputError(inputElement, errorElement) {
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = '';
      errorElement.classList.remove(this._settings.errorClass);
    }
    _hasInvalidInput() {
      return this._formInputs.some(inputElement => {
        return !inputElement.validity.valid;
      })
    }
    _checkInputValidity(inputElement) {
      const errorElement = this._getErrorElement(inputElement);
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage, errorElement);
      } else {
        this._hideInputError(inputElement, errorElement);
      }
    }
    _toggleSubmitButtonState() {
      if (this._hasInvalidInput(this._formInputs)) {
        this._formSubmitButton.disabled = true;
        this._formSubmitButton.classList.add(this._settings.inactiveButtonClass);
      } else {
        this._formSubmitButton.disabled = false;
        this._formSubmitButton.classList.remove(this._settings.inactiveButtonClass);
      }
    }
    _inputEventListener(evt) {
      const inputElement = evt.target;
      this._checkInputValidity(inputElement);
      this._toggleSubmitButtonState();
    }

    _hideErrorMessages() {
      this._inputsList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      this._inputsList.forEach(element => {
        element.classList.remove(this._settings.inputErrorClass);
      })
      this._errorsList = Array.from(this._formElement.querySelectorAll(`${this._settings.inputSelector}-error`));
      this._errorsList.forEach(element => {
        element.textContent = '';
        element.classList.remove(this._settings.errorClass);
      })
    }

    _setEventListeners() {
      this._formElement.addEventListener('reset', () => {
        this._hideErrorMessages();
      })
      this._formInputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      this._formSubmitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
      this._openFormButtons.forEach(button => {
        button.addEventListener('click', () => {
          this._toggleSubmitButtonState();
        })
      })
      this._toggleSubmitButtonState();
      this._formInputs.forEach(inputElement => {
        inputElement.addEventListener('input', (evt) => {
          this._inputEventListener(evt);
        });
      })
    }

    enableValidation() {
      this._setEventListeners();
    }
}
