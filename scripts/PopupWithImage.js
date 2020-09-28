import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._data = data;
  }

  open() {
    this._popupElement.querySelector('.popup-photos__image').src = this._data.link;
    this._popupElement.querySelector('.popup-photos__figcaption').alt = `фото ${this._data.name}`;
    this._popupElement.querySelector('.popup-photos__figcaption').textContent = this._data.name;
    super.open();
  }
}
