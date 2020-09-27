import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._submit = submit;
  }

  _getInputValues() {
    const form = this._popupElement.querySelector('.form');
    const inputsList = Array.from(form.querySelectorAll('.form__input'));
    const data = {};
    inputsList.forEach(input => {
      data[input.id] = input.value;
    })
    return data;
  }
}
