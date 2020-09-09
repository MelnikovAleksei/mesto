class Card {
  constructor(cardData, settings) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplateSelector = settings.templateSelector;
    this._photoCardSelector = settings.photoCardSelector;
    this._photoImageSelector = settings.photoImageSelector;
    this._photoFigcaptionSelector = settings.photoFigcaptionSelector;
  }

  _getTemplate() {
    return document.querySelector(this._cardTemplateSelector).content.querySelector(this._photoCardSelector).cloneNode(true);
  }

  _like() {

  }

  _setEventListeners() {

  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(this._photoImageSelector).src = this._link;
    this._cardElement.querySelector(this._photoFigcaptionSelector).textContent = this._name;
    return this._cardElement;
  }
}

export {Card}
