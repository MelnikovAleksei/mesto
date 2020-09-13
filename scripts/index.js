import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

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

const validationSettings = {
  formSelector: '.form',
  fieldsetSelector: '.form__fieldset',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  profileSectionSelector: '.profile',
  addCardButtonClass: 'profile__add-button',
  editProfileButtonClass: 'profile__edit-button',
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

// selectors
const photoTemplateSelector = '#photos-element';
const profileNameSelector = '.profile__name';
const profileCaptionSelector = '.profile__caption';
const formInputSelector = '.form__input';
const photoNameInputSelector = '#photo-name';
const photoLinkInputSelector = '#photo-link';
// classes
const addCardButtonClass = 'profile__add-button';
const editProfileButtonClass = 'profile__edit-button';
const popupOpenedClass = 'popup_opened';
const popupAddClass = 'popup-add';
const popupEditClass = 'popup-edit';
const popupEditCloseButtonClass = 'popup-edit__close-button';
const popupAddCloseButtonClass = 'popup-add__close-button';

// elements
const photoListElement = document.querySelector(photoCardSettings.photoListSelector)

const profileSectionElement = document.querySelector('.profile');

const popupAddElement = document.querySelector('.popup-add');
const popupEditProfileElement = document.querySelector('.popup-edit');

const infoFormElement = document.forms.info;
const addFormElement = document.forms.photo;
const inputProfileNameElement = popupEditProfileElement.querySelector('#profile-name');
const inputProfileCaptionElement = popupEditProfileElement.querySelector('#profile-caption');

const profileName = profileSectionElement.querySelector(profileNameSelector);
const profileCaption = profileSectionElement.querySelector(profileCaptionSelector);

const escapeKey = 'Escape';

const popupAddEventListenersSettings = {
  element: profileSectionElement,
  popupElement: popupAddElement,
  popupClass: popupAddClass,
  openingPointClass: addCardButtonClass,
  closeButtonClass: popupAddCloseButtonClass,
  popupOpenedClass: popupOpenedClass,
  closeKey: escapeKey,
}

const popupEditEventListenersSettings = {
  element: profileSectionElement,
  popupElement: popupEditProfileElement,
  popupClass: popupEditClass,
  openingPointClass: editProfileButtonClass,
  closeButtonClass: popupEditCloseButtonClass,
  popupOpenedClass: popupOpenedClass,
  closeKey: escapeKey,
}

const initCards = (templateSelector, cardsData, cardsSettings) => {
  const card = new Card(cardsData, templateSelector);
  card.initialize(cardsData, cardsSettings);
}

const addCard = (templateSelector, cardData, cardsSettings, container) => {
  const card = new Card(cardData, templateSelector);
  card.generateCard(cardsSettings, container);
}

initCards(photoTemplateSelector, initialCardsData, photoCardSettings);

const initializeProfileInfo = () => {
  inputProfileNameElement.value = profileName.textContent;
  inputProfileCaptionElement.value = profileCaption.textContent;
}

const clearInputValue = (popupElement) => {
  const inputs = Array.from(popupElement.querySelectorAll(formInputSelector));
  inputs.forEach(element => {
    element.value = '';
  })
}

const openPopup = (popupElement) => {
  if (popupElement.classList.contains(popupEditClass)) {
    initializeProfileInfo();
  }
  popupElement.classList.add(popupOpenedClass);
}

const closePopup = (popupElement) => {
  clearInputValue(popupElement);
  popupElement.classList.remove(popupOpenedClass);
}

const setPopupEventListeners = (settings) => {
  settings.element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(settings.openingPointClass)) {
      openPopup(settings.popupElement);
    }
  })
  settings.popupElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(settings.closeButtonClass) || evt.target.classList.contains(settings.popupClass)) {
      closePopup(settings.popupElement);
    }
  })
  document.addEventListener('keydown', (evt) => {
    if (settings.popupElement.classList.contains(settings.popupOpenedClass) && evt.key === settings.closeKey) {
      closePopup(settings.popupElement);
    }
  })
}

const getNewCardData = () => {
  const inputNameValue = popupAddElement.querySelector(photoNameInputSelector).value;
  const inputLinkValue = popupAddElement.querySelector(photoLinkInputSelector).value;
  const newCardData = {
    name: inputNameValue,
    link: inputLinkValue,
  }
  return newCardData;
}

const infoFormEventHandler = () => {
  profileName.textContent = inputProfileNameElement.value;
  profileCaption.textContent = inputProfileCaptionElement.value;
  closePopup(popupEditProfileElement);
}

const addFormEventHandler = () => {
  const newCardData = getNewCardData();
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

setPopupEventListeners(popupEditEventListenersSettings);
setPopupEventListeners(popupAddEventListenersSettings);
setFormsEventListeners();

const setFormValidation = (settings, formElement) => {
  const formValidator = new FormValidator(settings, formElement);
  formValidator.enableValidation();
}

setFormValidation(validationSettings, infoFormElement);
setFormValidation(validationSettings, addFormElement);
