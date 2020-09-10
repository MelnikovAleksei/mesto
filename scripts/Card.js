class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
  }

  _getPhotoElement(cardsSettings) {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(cardsSettings.photoCardSelector)
  }

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

  generateCard(cardsSettings, parentPhotoList) {
    this._cardElement = this._getPhotoElement(cardsSettings).cloneNode(true);
    this._cardElement.querySelector(cardsSettings.photoImageSelector).src = this._cardData.link;
    this._cardElement.querySelector(cardsSettings.photoFigcaptionSelector).textContent = this._cardData.name;
    parentPhotoList.prepend(this._cardElement);
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
    this._setEventListeners(cardsList, cardsSettings)
  }
}

export {Card}
