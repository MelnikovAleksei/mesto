class Card {
  constructor(cardData, settings) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplateSelector = settings.templateSelector;
    this._photoCardSelector = settings.photoCardSelector;
    this._photoImageSelector = settings.photoImageSelector;
    this._photoFigcaptionSelector = settings.photoFigcaptionSelector;
    this._photoLikeButtonSelector = settings.photoLikeButtonSelector;
    this._photoDeleteButtonSelector = settings.photoDeleteButtonSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
  }

  _like() {
    this.classList.toggle('photos__like-button_liked');
  }

  _delete() {
    this.removeEventListener('click', this._delete);
    this.closest('.photos__card').remove();
  }

  _setEventListeners() {
    this._cardElement.querySelector(this._photoLikeButtonSelector).addEventListener('click', this._like);
    this._cardElement.querySelector(this._photoDeleteButtonSelector).addEventListener('click', this._delete);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(this._photoImageSelector).src = this._link;
    this._cardElement.querySelector(this._photoFigcaptionSelector).textContent = this._name;
    return this._cardElement;
  }
}

export {Card}
