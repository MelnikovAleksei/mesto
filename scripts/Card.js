import { openPhotoPopup } from './utils.js'

class Card {
  constructor(cardData, templateSelector, settings) {
    this._cardName = cardData.name;
    this._cardLink = cardData.link;
    this._templateSelector = templateSelector;
    this._settings = settings;
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
      openPhotoPopup(this._element);
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

/*

_like(evt) {
  evt.target.classList.toggle('photos__like-button_liked');
}

_delete(evt) {
  evt.target.closest('.photos__card').remove();
}

_closePopup(popupPhotos) {
  const popupImage = popupPhotos.querySelector('.popup-photos__image');
  const popupFigcaption = popupPhotos.querySelector('.popup-photos__figcaption');
  popupImage.src = '';
  popupFigcaption.textContent = '';
  popupPhotos.classList.remove('popup_opened');
}

_openPopup(evt) {
  const figureElement = evt.target.parentElement;
  const imageElement = figureElement.querySelector('.photos__image');
  const figcaptionElement = figureElement.querySelector('.photos__figcaption');
  const popupPhotos = document.querySelector('.popup-photos');
  const popupImage = popupPhotos.querySelector('.popup-photos__image');
  const popupFigcaption = popupPhotos.querySelector('.popup-photos__figcaption');
  popupImage.src = imageElement.src;
  popupFigcaption.textContent = figcaptionElement.textContent;
  popupPhotos.classList.add('popup_opened');
}

_setEventListeners(cardsList, cardsSettings) {
  cardsList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(cardsSettings.photoImageClass)) {
      this._openPopup(evt);
    } else if (evt.target.classList.contains(cardsSettings.photoLikeButtonClass)) {
      this._like(evt)
    } else if (evt.target.classList.contains(cardsSettings.photoDeleteButtonClass)) {
      this._delete(evt)
    }
  })
  const popupPhotos = document.querySelector('.popup-photos');
  popupPhotos.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup-photos') || evt.target.classList.contains('popup-photos__close-button')) {
      this._closePopup(popupPhotos);
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (popupPhotos.classList.contains('popup_opened') && evt.key === 'Escape') {
      this._closePopup(popupPhotos);
    }
  })
}

generateCard(cardsSettings, container) {
  this._cardElement = this._getPhotoElement(cardsSettings).cloneNode(true);
  this._cardElement.querySelector(cardsSettings.photoImageSelector).src = this._cardData.link;
  this._cardElement.querySelector(cardsSettings.photoFigcaptionSelector).textContent = this._cardData.name;
  this._cardElement.querySelector(cardsSettings.photoImageSelector).alt = `фотография ${this._cardData.name}`
  container.prepend(this._cardElement);
}

initialize(cardsData, cardsSettings) {
  const cardsList = document.querySelector(cardsSettings.photoListSelector);
  const cardElement = this._getPhotoElement(cardsSettings);
  cardsData.forEach(element => {
    const card = cardElement.cloneNode(true);
    card.querySelector(cardsSettings.photoImageSelector).src = element.link;
    card.querySelector(cardsSettings.photoFigcaptionSelector).textContent = element.name;
    card.querySelector(cardsSettings.photoImageSelector).alt = `фотография ${element.name}`

    cardsList.append(card);
  })
  this._setEventListeners(cardsList, cardsSettings)
}*/

export {Card}
