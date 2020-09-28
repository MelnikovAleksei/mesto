export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleKeydownClose = this._handleKeydownClose.bind(this);
  }

  _handleClickClose(evt) {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleKeydownClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleKeydownClose);
  }

  _removeEventListeners() {
    this._popupElement.removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleKeydownClose);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._removeEventListeners();
    this._popupElement.classList.remove('popup_opened');
  }
}
