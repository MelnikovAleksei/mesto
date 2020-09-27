import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._form = this._popupElement.querySelector('.form');
    this._submit = submit;
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
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._getInputValues())
      this._submit(this._getInputValues());
      this.close();
    })
  }

  close() {
    this._form.reset();
    super.close();
  }
}
