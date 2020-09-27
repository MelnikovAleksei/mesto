import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector, photoElem) {
    super(popupSelector)
    this._popupSelector = popupSelector;
    this._photoElem = photoElem;
  }


  open() {
    const image = this._photoElem.querySelector('.photos__image');
    const figcaption = this._photoElem.querySelector('.photos__figcaption');
    this._popupElement = document.querySelector(this._popupSelector);
    this._popupElement.querySelector('.popup-photos__image').src = image.src;
    this._popupElement.querySelector('.popup-photos__figcaption').alt = `фото ${figcaption.textContent}`;
    this._popupElement.querySelector('.popup-photos__figcaption').textContent = figcaption.textContent;
    super.open();
  }
}
