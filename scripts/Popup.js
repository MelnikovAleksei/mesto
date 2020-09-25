export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleClickClose = (evt) => {
    if (evt.target.classList.contains('popup__close-button') || evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners = () => {
    this._popupElement.addEventListener('click', (evt) => {
      this._handleClickClose(evt)
    })
    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });
  }

  open = () => {
    this._popupElement.classList.add('popup_opened');
  }

  close = () => {
    this._popupElement.classList.remove('popup_opened');
  }
}
