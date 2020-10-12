import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._submit = submit;
    this._submitButton = this._form.querySelector('.popup__save-button');
    this._initialValueSubmitButton = this._submitButton.textContent;
    this._submitEvtHandler = this._submitEvtHandler.bind(this);
  }

  renderLoading(isLoading, initialDownloadMessage = 'Cохранение...') {
    if (isLoading) {
      this._submitButton.textContent = initialDownloadMessage;
    } else {
      this._submitButton.textContent = this._initialValueSubmitButton;
    }
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  _getInputValues() {
    const inputsList = Array.from(this._form.querySelectorAll('.form__input'));
    const data = {};
    inputsList.forEach(input => {
      data[input.name] = input.value;
    })
    return data;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._submitEvtHandler);
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    this._form.removeEventListener('submit', this._submitEvtHandler);
    super.close();
  }
}
