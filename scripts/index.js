let popUp = document.querySelector('.popup');

let editForm = document.querySelector('.edit-form');
let formCloseButton = editForm.querySelector('.edit-form__close-button');
let inputName = editForm.querySelector('.edit-form__input-name');
let inputCaption = editForm.querySelector('.edit-form__input-caption');

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

function togglePopUp(evt) {
  evt.preventDefault();
  popUp.classList.toggle('popup_opened');
  inputName.focus();
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
}

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;
  togglePopUp(evt);
}


profileEditButton.addEventListener('click', togglePopUp);
formCloseButton.addEventListener('click', togglePopUp);
editForm.addEventListener('submit', saveForm);
