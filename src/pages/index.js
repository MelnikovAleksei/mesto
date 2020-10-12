import './index.css';

import {Section} from '../components/Section.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import {Api} from '../components/Api.js';

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
const userAvatarSelector = '.profile__avatar'
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
const userInfo = new UserInfo({ userNameSelector, userCaptionSelector, userAvatarSelector });

const createNewCard = (data) => {
  const card = new Card(data, photoTemplateSelector, photoCardSettings, {
    handleCardClick: (data) => {
      photoPopup.open(data);
    }
  });
  return card;
}

const cardsList = new Section({
    renderer: (data) => {
      const card = createNewCard(data)
      const cardElement = card.generateCard();
      cardsList.addItem(cardElement);
    }
  }, photoListSelector);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'ff425bea-a4ea-4692-b47e-32fb337d2063',
    'Content-Type': 'application/json'
  }
});

api.getInitialData()
  .then((data) => {
    const [userData, cardsData] = data;
    userInfo.setUserInfo(userData);
    cardsList.renderCards(cardsData);
  })
  .catch((err) => {
    console.log(err);
  })

const popupWithAddForm = new PopupWithForm(popupAddSelector, {
  submit: (data) => {
    api.postCard(data)
      .then((res) => {
        const card = createNewCard(res);
        const cardElement = card.generateCard();
        cardsList.addItem(cardElement, 'prepend');
      })
    popupWithAddForm.close()
  }
})

const popupWithInfoForm = new PopupWithForm(popupEditProfileSelector, {
  submit: (data) => {
    api.setUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
    popupWithInfoForm.close();
  }
})

addButtonElement.addEventListener('click', () => {
  popupWithAddForm.open();
})

editButtonElement.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputProfileNameElement.value = userData.name;
  inputProfileCaptionElement.value = userData.about;
  popupWithInfoForm.open();
})

const setFormValidation = (formElement) => {
  const formValidator = new FormValidator(formElement, openFormButtonsList, validationSettings);
  formValidator.enableValidation();
}

formsList.forEach(form => {
  setFormValidation(form);
})
