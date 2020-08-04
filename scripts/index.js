let popUp = document.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');

let editForm = document.querySelector('.edit-form');
let inputName = editForm.querySelector('#profile-name');
let inputCaption = editForm.querySelector('#profile-caption');

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

function openPopUp() {
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
  popUp.classList.add('popup_opened');
  inputName.focus();
}

function closePopUp() {
  popUp.classList.remove('popup_opened');
}

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;
  closePopUp();
}


profileEditButton.addEventListener('click', openPopUp);
popUpCloseButton.addEventListener('click', closePopUp);
editForm.addEventListener('submit', saveForm);
