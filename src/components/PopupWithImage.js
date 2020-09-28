import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._popupElement.querySelector('.popup-photos__image').src = data.link;
    this._popupElement.querySelector('.popup-photos__image').alt = `Фотография ${data.name}`;
    this._popupElement.querySelector('.popup-photos__figcaption').textContent = data.name;
    super.open();
  }
}
