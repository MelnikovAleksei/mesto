import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup {
  constructor(popupSelector/*, { deleteCard }*/) {
    super(popupSelector);
    this._popupElement = document.querySelector(this._popupSelector);
    this._form = this._popupElement.querySelector('.form');
    /*this._deleteCard = deleteCard;*/
  }

  _submitEvtHandler(evt) {
    evt.preventDefault();
    //this._deleteCard();
  }

  setEventListeners() {
    super.setEventListeners();
    //this._form.addEventListener('submit', this._submitEvtHandler);
  }
}
