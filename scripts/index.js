import {initialCardsData} from './cardsData.js'
import {Section} from './Section.js';
import {Card} from './Card.js';
import {Popup} from './Popup.js';
import {FormValidator} from './FormValidator.js';
import {PopupWithImage} from './PopupWithImage.js';

import {
  photoCardSettings,
  validationSettings
} from './constants.js';



// selectors
const photoTemplateSelector = '#photos-element';
const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const photoNameInputSelector = '#photo-name';
const photoLinkInputSelector = '#photo-link';
const formSelector = '.form';
const openFormButtonSelector = '.button-open-form';

const photoListSelector = '.photos__list';
const popupPhotosSelector = '.popup-photos';
const popupAddSelector = '.popup-add';
const popupEditProfileSelector = '.popup-edit';

// classes
const popupOpenedClass = 'popup_opened';

// elements

const profileSectionElement = document.querySelector('.profile');
const openFormButtonsList = Array.from(profileSectionElement.querySelectorAll(openFormButtonSelector));
const addButtonElement = profileSectionElement.querySelector('.profile__add-button');
const editButtonElement = profileSectionElement.querySelector('.profile__edit-button');

const popupAddElement = document.querySelector('.popup-add');
const popupEditProfileElement = document.querySelector('.popup-edit');

const formsList = Array.from(document.forms);
const addFormElement = document.forms.photo;
const infoFormElement = document.forms.info;
const inputProfileNameElement = popupEditProfileElement.querySelector('#profile-name');
const inputProfileCaptionElement = popupEditProfileElement.querySelector('#profile-caption');

const profileName = profileSectionElement.querySelector(profileNameSelector);
const profileCaption = profileSectionElement.querySelector(profileCaptionSelector);

const escapeKey = 'Escape';

const cardsList = new Section({
  items: initialCardsData,
  renderer: (elem) => {
    const card = new Card(elem, photoTemplateSelector, photoCardSettings, {
      photoPopupRenderer: (elem) => {
        const photoPopup = new PopupWithImage(popupPhotosSelector, elem);
        photoPopup.open();
      }
    });
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, photoListSelector);

cardsList.renderItems();

const openPhotoPopup = (elem) => {
  const photoPopup = new PopupWithImage(popupPhotosSelector, elem);
  photoPopup.open()
}

const initializeProfileInfo = () => {
  inputProfileNameElement.value = profileName.textContent;
  inputProfileCaptionElement.value = profileCaption.textContent;
}

const clearInputValue = (popupElement) => {
  const form = popupElement.querySelector(formSelector);
  form.reset();
}

const openPopup = (popupElement) => {
  popupElement.classList.add(popupOpenedClass);
  document.addEventListener('keydown', handleEscapePress);
}

const closePopup = (popupElement) => {
  clearInputValue(popupElement);
  document.removeEventListener('keydown', handleEscapePress);
  popupElement.classList.remove(popupOpenedClass);
}

const infoFormEventHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileNameElement.value;
  profileCaption.textContent = inputProfileCaptionElement.value;
}

const addFormEventHandler = (evt) => {
  evt.preventDefault();
  const cardData = {
    name: popupAddElement.querySelector(photoNameInputSelector).value,
    link: popupAddElement.querySelector(photoLinkInputSelector).value,
  };
  const card = new Card(cardData, photoTemplateSelector, photoCardSettings);
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement, 'prepend');
  addPhotoPopup.close()
}

const setFormsEventListeners = () => {
  addFormElement.addEventListener('submit', addFormEventHandler);
  infoFormElement.addEventListener('submit', infoFormEventHandler);
}

const addPhotoPopup = new Popup(popupAddSelector);
const editProfilePopup = new Popup(popupEditProfileSelector);

addButtonElement.addEventListener('click', () => {
  addPhotoPopup.open();
})
editButtonElement.addEventListener('click', () => {
  initializeProfileInfo();
  editProfilePopup.open();
})

setFormsEventListeners();

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(formElement, openFormButtonsList, validationSettings);
  formValidator.enableValidation();
}

formsList.forEach(form => {
  setFormValidation(form);
})
