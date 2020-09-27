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

export { photoCardSettings, validationSettings}
