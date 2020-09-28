import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    this._popupPhotoElement = this._popupElement.querySelector('.popup-photos__image');
    this._popupPhotoElement.src = data.link;
    this._popupPhotoElement.alt = `Фотография ${data.name}`;
    this._popupElement.querySelector('.popup-photos__figcaption').textContent = data.name;
    super.open();
  }
}
