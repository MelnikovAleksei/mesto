export class Card {
  constructor(data, templateSelector, settings, { handleCardClick }) {
    this._cardName = data.name;
    this._cardLink = data.link;
    this._templateSelector = templateSelector;
    this._settings = settings;
    this._handleCardClick = handleCardClick;
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .firstElementChild
      .cloneNode(true);
    return cardElement;
  }
  _delete() {
    this._element.remove();
    this._element = null;
  }
  _like() {
    this._likeButton.classList.toggle(this._settings.photoLikedButtonClass);
  }
  _setEventListeners() {
    this._photoImage.addEventListener('click', () => {
      this._handleCardClick(this._element);
    })
    this._likeButton = this._element.querySelector(this._settings.photoLikeButtonSelector);
    this._deleteButton = this._element.querySelector(this._settings.photoDeleteButtonSelector);
    this._likeButton.addEventListener('click', () => {
      this._like();
    })
    this._deleteButton.addEventListener('click', () => {
      this._delete();
    })
  }
  generateCard() {
    this._element = this._getTemplateElement();
    this._photoImage = this._element.querySelector(this._settings.photoImageSelector);
    this._photoFigcaption = this._element.querySelector(this._settings.photoFigcaptionSelector);
    this._photoImage.src = this._cardLink;
    this._photoImage.alt = `Фотография ${this._cardName}`;
    this._photoFigcaption.textContent = this._cardName;
    this._setEventListeners();
    return this._element;
  }
}
