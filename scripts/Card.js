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
    return document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._photoCardSelector)
      .cloneNode(true);
  }

  _like() {
    this.classList.toggle('photos__like-button_liked');
  }

  _delete() {
    this.closest('.photos__card').remove();
  }

  _closePopup() {
    const popupPhotos = document.querySelector('.popup-photos');
    const popupImage = popupPhotos.querySelector('.popup-photos__image');
    const popupFigcaption = popupPhotos.querySelector('.popup-photos__figcaption');
    popupImage.src = '';
    popupFigcaption.textContent = '';
    popupPhotos.classList.remove('popup_opened');
  }

  _openPopup() {
    const figureElement = this.parentElement;
    const imageElement = figureElement.querySelector('.photos__image');
    const figcaptionElement = figureElement.querySelector('.photos__figcaption');
    const popupPhotos = document.querySelector('.popup-photos');
    const popupImage = popupPhotos.querySelector('.popup-photos__image');
    const popupFigcaption = popupPhotos.querySelector('.popup-photos__figcaption');
    popupImage.src = imageElement.src;
    popupFigcaption.textContent = figcaptionElement.textContent;
    popupPhotos.classList.add('popup_opened');
  }

  _setEventListeners() {
    this._cardElement.querySelector(this._photoLikeButtonSelector).addEventListener('click', this._like);
    this._cardElement.querySelector(this._photoDeleteButtonSelector).addEventListener('click', this._delete);
    this._cardElement.querySelector(this._photoImageSelector).addEventListener('click', this._openPopup);
    document.querySelector('.popup-photos__close-button').addEventListener('click', this._closePopup);
    document.querySelector('.popup-photos').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        this._closePopup();
      }
    });
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this._closePopup();
      }
    })
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
