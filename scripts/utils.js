const popupPhotos = document.querySelector('.popup-photos');
const popupCloseButton = document.querySelector('.popup-photos__close-button');
const popupImage = popupPhotos.querySelector('.popup-photos__image');
const popupFigcaption = popupPhotos.querySelector('.popup-photos__figcaption');
const escapeKey = 'Escape';

const photoFigureSelector = '.photos__figure';
const photoImageSelector = '.photos__image';
const photoFigcaptionSelector = '.photos__figcaption';

const popupOpenedClass = 'popup_opened';

const openPhotoPopup = (photoCardElement) => {
  const figureElement = photoCardElement.querySelector(photoFigureSelector);
  const imageElement = figureElement.querySelector(photoImageSelector);
  const figcaptionElement = figureElement.querySelector(photoFigcaptionSelector);
  popupImage.src = imageElement.src;
  popupFigcaption.textContent = figcaptionElement.textContent;
  popupPhotos.classList.add(popupOpenedClass);
  setClosePhotoPopupEventListeners();
}

const closePhotoPopup = () => {
  popupImage.src = '';
  popupFigcaption.textContent = '';
  popupPhotos.classList.remove(popupOpenedClass);
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
