class Card {
  constructor(templateSelector) {
    this._templateSelector = templateSelector;
  }

  _getPhotoElement(cardsSettings) {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(cardsSettings.photoCardSelector)
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
    this._cardElement.querySelector(this._cardsSettings.photoLikeButtonSelector).addEventListener('click', this._like);
    this._cardElement.querySelector(this._cardsSettings.photoDeleteButtonSelector).addEventListener('click', this._delete);
    this._cardElement.querySelector(this._cardsSettings.photoImageSelector).addEventListener('click', this._openPopup);
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

  generateCard(cardData, cardsSettings) {
    this._cardElement = this._getPhotoElement(cardsSettings).cloneNode(true);
    this._cardElement.querySelector(cardsSettings.photoImageSelector).src = cardData.link;
    this._cardElement.querySelector(cardsSettings.photoFigcaptionSelector).textContent = cardData.name;
    document.querySelector(cardsSettings.photoListSelector).prepend(this._cardElement);
  }
  
  initialize(cardsData, cardsSettings) {
    const cardsList = document.querySelector(cardsSettings.photoListSelector);
    const cardElement = this._getPhotoElement(cardsSettings);
    cardsData.forEach(element => {
      const card = cardElement.cloneNode(true);
      card.querySelector(cardsSettings.photoImageSelector).src = element.link;
      card.querySelector(cardsSettings.photoFigcaptionSelector).textContent = element.name;
      cardsList.append(card);
    })
  }
}

export {Card}
