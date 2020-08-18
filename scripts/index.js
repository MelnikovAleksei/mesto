const initialCards = [
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

let popUp = document.querySelector('.popup');
let popUpCloseButton = popUp.querySelector('.popup__close-button');

let editForm = document.querySelector('.edit-form');
let inputName = editForm.querySelector('#profile-name');
let inputCaption = editForm.querySelector('#profile-caption');

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

let photosList = document.querySelector('.photos__list');

function addPhotosElement(name, link) {
  const photosElement = document.querySelector('#photos-element').content;
  const photosCard = photosElement.cloneNode(true);
  console.log(photosCard);
  photosCard.querySelector('.photos__image').src = link;
  photosCard.querySelector('.photos__image').alt = 'фотография' + name;
  photosCard.querySelector('.photos__figcaption').textContent = name;
  photosList.append(photosCard);
}

function initializePhotos(arr) {
  arr.forEach(elem => {
    addPhotosElement(elem.name, elem.link);
  });
}

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
