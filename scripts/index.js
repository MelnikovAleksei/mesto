import {Card} from './Card.js';

const photoCardSettings = {
  photoListSelector: '.photos__list',
  photoCardSelector: '.photos__card',
  photoImageSelector: '.photos__image',
  photoFigcaptionSelector: '.photos__figcaption',
  photoLikeButtonSelector: '.photos__like-button',
  photoDeleteButtonSelector: '.photos__delete-button',
  photoImageClass: 'photos__image',
  photoLikeButtonClass: 'photos__like-button',
  photoDeleteButtonClass: 'photos__delete-button',
}

const initialCardsData = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const newCardData =  {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}

// selectors
const photoTemplateSelector = '#photos-element';
const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const formInputSelector = '.form__input';
// classes
const addCardButtonClass = 'profile__add-button';
const editProfileButtonClass = 'profile__edit-button';
const photoImageClass = 'photos__image';
const popupOpenedClass = 'popup_opened';
const popupAddClass = 'popup-add';
const popupEditClass = 'popup-edit';
const popupPhotoClass = 'popup-photos';
const popupPhotoCloseButtonClass = 'popup-photos__close-button';
const popupEditCloseButtonClass = 'popup-edit__close-button';
const popupAddCloseButtonClass = 'popup-add__close-button';

// elements
const photoListElement = document.querySelector(photoCardSettings.photoListSelector)

const profileSectionElement = document.querySelector('.profile');
const addCardButtonElement = profileSectionElement.querySelector('.profile__add-button');

const popupAddElement = document.querySelector('.popup-add');
const popupEditProfileElement = document.querySelector('.popup-edit');
const popupPhotoElement = document.querySelector('.popup-photo');

const infoFormElement = document.forms.info;
const addFormElement = document.forms.photo;
const inputProfileNameElement = popupEditProfileElement.querySelector('#profile-name');
const inputProfileCaptionElement = popupEditProfileElement.querySelector('#profile-caption');

const profileName = profileSectionElement.querySelector(profileNameSelector);
const profileCaption = profileSectionElement.querySelector(profileCaptionSelector);

const escapeKey = 'Escape';

const initCards = (templateSelector, cardsData, cardsSettings) => {
  const card = new Card(cardsData, templateSelector);
  card.initialize(cardsData, cardsSettings);
}

const addCard = (templateSelector, cardData, cardsSettings, container) => {
  const card = new Card(cardData, templateSelector);
  card.generateCard(cardsSettings, container);
}

initCards(photoTemplateSelector, initialCardsData, photoCardSettings);
addCard(photoTemplateSelector, newCardData, photoCardSettings, photoListElement);

const initializeProfileInfo = (element) => {
  inputProfileNameElement.value = profileName.textContent;
  inputProfileCaptionElement.value = profileCaption.textContent;
}

const clearInputValue = (popupElement) => {
  const inputs = Array.from(popupElement.querySelectorAll(formInputSelector));
  inputs.forEach(element => {
    element.value = '';
  })
}

const openPopup = (element, popupElement) => {
  if (popupElement.classList.contains(popupEditClass)) {
    initializeProfileInfo(element);
  }
  popupElement.classList.add(popupOpenedClass);
}

const closePopup = (popupElement) => {
  clearInputValue(popupElement);
  popupElement.classList.remove(popupOpenedClass);
}

const setPopupEventListeners = (element, popupElement, popupClass, openingPointClass, closeButtonClass, popupOpenedClass, closeKey) => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(openingPointClass)) {
      openPopup(element, popupElement);
    }
  })
  popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(closeButtonClass) || evt.target.classList.contains(popupClass)) {
      closePopup(popupElement);
    }
  })
  document.addEventListener('keydown', (evt) => {
    if (popupElement.classList.contains(popupOpenedClass) && evt.key === closeKey) {
      closePopup(popupElement);
    }
  })
}

const getNewCardData = (popupAddElement) => {
  const inputs = Array.from(popupAddElement.querySelectorAll(formInputSelector));
  const newCardData = {
    name: inputs[0].value,
    link: inputs[1].value,
  }
  console.log(newCardData)
  return newCardData;
}

const infoFormEventHandler = () => {
  profileName.textContent = inputProfileNameElement.value;
  profileCaption.textContent = inputProfileCaptionElement.value;
  closePopup(popupEditProfileElement);
}

const addFormEventHandler = () => {
  const newCardData = getNewCardData(popupAddElement);
  addCard(photoTemplateSelector, newCardData, photoCardSettings, photoListElement);
  closePopup(popupAddElement);
}

const setFormsEventListeners = () => {
  addFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    addFormEventHandler();
  })
  infoFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    infoFormEventHandler();
  });
}

setPopupEventListeners(profileSectionElement, popupEditProfileElement, popupEditClass, editProfileButtonClass, popupEditCloseButtonClass, popupOpenedClass, escapeKey);
setPopupEventListeners(profileSectionElement, popupAddElement, popupAddClass, addCardButtonClass, popupAddCloseButtonClass, popupOpenedClass, escapeKey);
setFormsEventListeners();
// =========================================================
function func () {

const popUpList = document.querySelectorAll('.popup');

const openPopUpSelector = 'popup_opened';

const popUpCloseButtonList = document.querySelectorAll('.popup__close-button');

const popUpEdit = document.querySelector('.popup-edit');
const popUpEditCloseButton = popUpEdit.querySelector('.popup-edit__close-button');

const popUpAdd = document.querySelector('.popup-add');
const popUpAddCloseButton = popUpAdd.querySelector('.popup-add__close-button');

const popUpPhotos = document.querySelector('.popup-photos');
const popUpPhotosImage = popUpPhotos.querySelector('.popup-photos__image');
const popUpPhotosFigcaption = popUpPhotos.querySelector('.popup-photos__figcaption');
const popUpPhotosCloseButton = popUpPhotos.querySelector('.popup-photos__close-button');

const editForm = document.querySelector('.edit-form');
const inputProfileName = editForm.querySelector('#profile-name');
const inputProfileCaption = editForm.querySelector('#profile-caption');

const addForm = document.querySelector('.add-form');
const inputPhotoName = addForm.querySelector('#photo-name');
const inputPhotoLink = addForm.querySelector('#photo-link');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileCaption = profile.querySelector('.profile__caption');

const photosAddButton = profile.querySelector('.profile__add-button');

const photos = document.querySelector('.photos');
const photosList = photos.querySelector('.photos__list');

const escKeyCode = 'Escape';

const photosElement = document.querySelector('#photos-element').content;

function addPhotosElement(name, link, where = 'append') {
  const photosCard = photosElement.cloneNode(true);
  const photosImage = photosCard.querySelector('.photos__image');
  const photosLikeButton = photosCard.querySelector('.photos__like-button');
  const photosDeleteButton = photosCard.querySelector('.photos__delete-button');
  photosCard.querySelector('.photos__image').src = link;
  photosCard.querySelector('.photos__image').alt = `фотография ${name}`;
  photosCard.querySelector('.photos__figcaption').textContent = name;
  if (where === 'append') {
    photosList.append(photosCard);
  } else if (where === 'prepend') {
    photosList.prepend(photosCard);
  }
}

function initializePhotos(arr) {
  arr.forEach(elem => {
    addPhotosElement(elem.name, elem.link, 'append');
  });
}

function initializeProfileInfo() {
  inputProfileName.value = profileName.textContent;
  inputProfileCaption.value = profileCaption.textContent;
}

function emptyInputValue(element) {
  const inputs = Array.from(element.querySelectorAll('.form__input'));
  inputs.forEach(elem => {
    elem.value = '';
  })
}

function addCard(evt) {
  evt.preventDefault();
  addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  emptyInputValue(inputPhotoName, inputPhotoLink);
  closePopUp(popUpAdd)
}

function eventHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopUp(evt.target);
  }
}

function removeInputListener(element) {
  const formInputs = Array.from(element.querySelectorAll('.form__input'));
  formInputs.forEach(element => {
    element.removeEventListener('input', inputEventListener);
  })
}

function addInputListener(element) {
  const formInputs = Array.from(element.querySelectorAll('.form__input'));
  formInputs.forEach(element => {
    element.addEventListener('input', inputEventListener);
  })
}

function openPopUp(element) {
  addInputListener(element);
  element.classList.add('popup_opened');
  element.addEventListener('click', eventHandler);
  document.addEventListener('keydown', escKeyHandler);
}

function closePopUp(element) {
  removeInputListener(element);
  element.classList.remove('popup_opened');
  element.removeEventListener('click', eventHandler);
  document.removeEventListener('keydown', escKeyHandler);
}

function openPopUpEdit() {
  initializeProfileInfo();
  openCheckValidity(editForm);
  openPopUp(popUpEdit);
}

function openPopUpAdd() {
  emptyInputValue(addForm);
  openCheckValidity(addForm);
  openPopUp(popUpAdd);
}

function closePopUpEdit() {
  closePopUp(popUpEdit)
}

function closePopUpAdd() {
  closePopUp(popUpAdd)
}

function profileSaveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileCaption.textContent = inputProfileCaption.value;
  closePopUp(evt.target.parentElement.parentElement);
}

function likePhoto(evt) {
  if (evt.target.classList.contains('photos__like-button')) {
    evt.target.classList.toggle('photos__like-button_liked');
  }
}

function deletePhoto(evt) {
  if (evt.target.classList.contains('photos__delete-button')) {
    evt.target.closest('.photos__card').remove();
  }
}

function closePopUpPhoto() {
  closePopUp(popUpPhotos);
}

function openPopUpPhoto(evt) {
  if (evt.target.classList.contains('photos__image')) {
    const figure = evt.target.parentElement;
    const img = figure.querySelector('.photos__image');
    const figcaption = figure.querySelector('.photos__figcaption');
    popUpPhotosImage.src = img.src;
    popUpPhotosFigcaption.textContent = figcaption.textContent;
    openPopUp(popUpPhotos);
  }
}

function escKeyHandler(evt) {
  if (evt.key === escKeyCode) {
    if (popUpAdd.classList.contains(openPopUpSelector)) {
      closePopUp(popUpAdd);
    } else if (popUpEdit.classList.contains(openPopUpSelector)) {
      closePopUp(popUpEdit);
    } else if (popUpPhotos.classList.contains(openPopUpSelector)) {
      closePopUp(popUpPhotos);
    }
  }
}

popUpList.forEach(popup => {
  popup.addEventListener('keydown', escKeyHandler)
})

profileEditButton.addEventListener('click', openPopUpEdit);
popUpEditCloseButton.addEventListener('click', closePopUpEdit);
editForm.addEventListener('submit', profileSaveForm);

photosList.addEventListener('click', likePhoto);
photosList.addEventListener('click', deletePhoto);
photosList.addEventListener('click', openPopUpPhoto)

photosAddButton.addEventListener('click', openPopUpAdd);

popUpCloseButtonList.forEach(popUpCloseButton => {
  popUpCloseButton.addEventListener('click', function (evt) {
    closePopUp(evt.target.parentElement.parentElement);
  })
})

addForm.addEventListener('submit', addCard);

initializePhotos(initialCards);

}
