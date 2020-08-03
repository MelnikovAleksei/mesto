let popUp = document.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');

let editForm = document.querySelector('.edit-form');
let inputName = editForm.querySelector('#profile-name');
let inputCaption = editForm.querySelector('#profile-caption');

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

function togglePopUp() {
  popUp.classList.toggle('popup_opened');
  inputName.focus();
  inputName.value = profileName.textContent;
  inputCaption.value = profileCaption.textContent;
}

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileCaption.textContent = inputCaption.value;
  togglePopUp();
}


profileEditButton.addEventListener('click', togglePopUp);
popUpCloseButton.addEventListener('click', togglePopUp);
editForm.addEventListener('submit', saveForm);
