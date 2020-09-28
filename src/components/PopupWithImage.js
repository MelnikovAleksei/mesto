import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoElement = this._popupElement.querySelector('.popup-photos__image');
    this._popupFigcaptionElement = this._popupElement.querySelector('.popup-photos__figcaption');
  }

  open(data) {
    this._popupPhotoElement.src = data.link;
    this._popupPhotoElement.alt = `Фотография ${data.name}`;
    this._popupFigcaptionElement.textContent = data.name;
    super.open();
  }
}
