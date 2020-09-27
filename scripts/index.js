import {initialCardsData} from './cardsData.js'
import {Section} from './Section.js';
import {Card} from './Card.js';
import {Popup} from './Popup.js';
import {FormValidator} from './FormValidator.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';

import {
  photoCardSettings,
  validationSettings
} from './constants.js';



// selectors
const photoTemplateSelector = '#photos-element';
const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const openFormButtonSelector = '.button-open-form';

const photoListSelector = '.photos__list';
const popupPhotosSelector = '.popup-photos';
const popupAddSelector = '.popup-add';
const popupEditProfileSelector = '.popup-edit';

// elements

const profileSectionElement = document.querySelector('.profile');
const openFormButtonsList = Array.from(profileSectionElement.querySelectorAll(openFormButtonSelector));
const addButtonElement = profileSectionElement.querySelector('.profile__add-button');
const editButtonElement = profileSectionElement.querySelector('.profile__edit-button');
const popupEditProfileElement = document.querySelector('.popup-edit');

const formsList = Array.from(document.forms);
const inputProfileNameElement = popupEditProfileElement.querySelector('#profile-name');
const inputProfileCaptionElement = popupEditProfileElement.querySelector('#profile-caption');

const profileName = profileSectionElement.querySelector(profileNameSelector);
const profileCaption = profileSectionElement.querySelector(profileCaptionSelector);

const cardsList = new Section({
  items: initialCardsData,
  renderer: (elem) => {
    const card = new Card(elem, photoTemplateSelector, photoCardSettings, {
      handleCardClick: (elem) => {
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

const infoFormEventHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputProfileNameElement.value;
  profileCaption.textContent = inputProfileCaptionElement.value;
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

const popupWithAddForm = new PopupWithForm(popupAddSelector, {
  submit: (data) => {
    const card = new Card(data, photoTemplateSelector, photoCardSettings, {
      handleCardClick: (elem) => {
        const photoPopup = new PopupWithImage(popupPhotosSelector, elem);
        photoPopup.open();
      }
     })
    const cardElement = card.generateCard();
    console.log(cardElement)
    cardsList.addItem(cardElement, 'prepend')
  }
 })

popupWithAddForm.setEventListeners();

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(formElement, openFormButtonsList, validationSettings);
  formValidator.enableValidation();
}

formsList.forEach(form => {
  setFormValidation(form);
})
