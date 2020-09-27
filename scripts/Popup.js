export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
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
    document.querySelector(this._popupSelector).addEventListener('click', this._handleClickClose);
    document.addEventListener('keydown', this._handleKeydownClose);
  }

  _removeEventListeners() {
    document.querySelector(this._popupSelector).removeEventListener('click', this._handleClickClose);
    document.removeEventListener('keydown', this._handleKeydownClose);
  }

  open() {
    this.setEventListeners();
    document.querySelector(this._popupSelector).classList.add('popup_opened');
  }

  close() {
    this._removeEventListeners();
    document.querySelector(this._popupSelector).classList.remove('popup_opened');
  }
}
