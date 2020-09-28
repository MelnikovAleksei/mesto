import './index.css';

import {initialCardsData} from '../components/cardsData.js'
import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';

// settings

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
  photoLikedButtonClass: 'photos__like-button_liked',
}

const validationSettings = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  profileSectionSelector: '.profile',
  addCardButtonSelector: '.profile__add-button',
  editProfileButtonSelector: '.profile__edit-button',
  popupSelector: '.popup',
  popupOpenedClass: 'popup_opened',
}

// selectors

const photoTemplateSelector = '#photos-element';
const userNameSelector = '.profile__name';
const userCaptionSelector = '.profile__caption';
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

const photoPopup = new PopupWithImage(popupPhotosSelector);
const userInfo = new UserInfo({ userNameSelector, userCaptionSelector });

const createNewCard = (data) => {
  const card = new Card(data, photoTemplateSelector, photoCardSettings, {
    handleCardClick: (data) => {
      photoPopup.open(data);
    }
  });
  return card;
}

const cardsList = new Section({
  items: initialCardsData,
  renderer: (data) => {
    const card = createNewCard(data)
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement);
  }
}, photoListSelector);

cardsList.renderItems();

const popupWithAddForm = new PopupWithForm(popupAddSelector, {
  submit: (data) => {
    const card = createNewCard(data);
    const cardElement = card.generateCard();
    cardsList.addItem(cardElement, 'prepend');
    popupWithAddForm.close()
  }
})

const popupWithInfoForm = new PopupWithForm(popupEditProfileSelector, {
  submit: (data) => {
    userInfo.setUserInfo(data);
    popupWithInfoForm.close();
  }
})

addButtonElement.addEventListener('click', () => {
  popupWithAddForm.open();
})

editButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputProfileNameElement.value = userData.name;
  inputProfileCaptionElement.value = userData.caption;
  popupWithInfoForm.open();
})

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(formElement, openFormButtonsList, validationSettings);
  formValidator.enableValidation();
}

formsList.forEach(form => {
  setFormValidation(form);
})
