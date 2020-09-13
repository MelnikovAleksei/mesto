const popupPhotos = document.querySelector('.popup-photos');
const popupCloseButton = document.querySelector('.popup-photos__close-button');
const popupImage = popupPhotos.querySelector('.popup-photos__image');
const popupFigcaption = popupPhotos.querySelector('.popup-photos__figcaption');
const escapeKey = 'Escape';

const openPhotoPopup = (photoCardElement) => {
  const figureElement = photoCardElement.querySelector('.photos__figure');
  const imageElement = figureElement.querySelector('.photos__image');
  const figcaptionElement = figureElement.querySelector('.photos__figcaption');
  popupImage.src = imageElement.src;
  popupFigcaption.textContent = figcaptionElement.textContent;
  popupPhotos.classList.add('popup_opened');
  setClosePhotoPopupEventListeners();
}

const closePhotoPopup = () => {
  popupImage.src = '';
  popupFigcaption.textContent = '';
  popupPhotos.classList.remove('popup_opened');
  popupPhotos.removeEventListener('click', popupTargetHandler);
  popupCloseButton.removeEventListener('click', closePhotoPopup);
  document.removeEventListener('click', escapeKeyHandler);
}

const popupTargetHandler = (evt) => {
  if (evt.target === popupPhotos) {
    closePhotoPopup();
  }
}

const escapeKeyHandler = (evt) => {
  if (evt.key === escapeKey) {
    closePhotoPopup();
  }
}

const setClosePhotoPopupEventListeners = () => {
  popupCloseButton.addEventListener('click', closePhotoPopup);
  popupPhotos.addEventListener('click', popupTargetHandler)
  document.addEventListener('keydown', escapeKeyHandler)
}

export { openPhotoPopup }
