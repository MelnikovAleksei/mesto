class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings;
        this._formElement = formElement;
    }
    _getErrorElement() {

    }
    _showInputError(){

    }
    _hideInputError() {

    }
    _hasInvalidInput() {

    }
    _checkInputValidity() {

    }
    _toggleSubmitButtonState() {

    }
    _inputEventListener() {

    }
    _openCheckValidity() {

    }
    _setEventListeners() {

    }
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            
        })
    }
}

export {FormValidator}