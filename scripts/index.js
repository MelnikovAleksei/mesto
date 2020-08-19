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

let popUpEdit = document.querySelector('.popup-edit');
let popUpEditCloseButton = popUpEdit.querySelector('.popup-edit__close-button');

let popUpAdd = document.querySelector('.popup-add');
let popUpAddCloseButton = popUpAdd.querySelector('.popup-add__close-button');

let popUpPhotos = document.querySelector('.popup-photos');
let popUpPhotosImage = popUpPhotos.querySelector('.popup-photos__image');
let popUpPhotosFigcaption = popUpPhotos.querySelector('.popup-photos__figcaption');
let popUpPhotosCloseButton = popUpPhotos.querySelector('.popup-photos__close-button');

let editForm = document.querySelector('.edit-form');
let inputProfileName = editForm.querySelector('#profile-name');
let inputProfileCaption = editForm.querySelector('#profile-caption');

let addForm = document.querySelector('.add-form');
let inputPhotoName = addForm.querySelector('#photo-name');
let inputPhotoLink = addForm.querySelector('#photo-link');

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileCaption = profile.querySelector('.profile__caption');

let photosAddButton = profile.querySelector('.profile__add-button');

let photos = document.querySelector('.photos');
let photosList = photos.querySelector('.photos__list');

function addPhotosElement(name, link, where = 'append') {
  const photosElement = document.querySelector('#photos-element').content;
  const photosCard = photosElement.cloneNode(true);
  const photosImage = photosCard.querySelector('.photos__image');
  const photosLikeButton = photosCard.querySelector('.photos__like-button');
  const photosDeleteButton = photosCard.querySelector('.photos__delete-button');
  photosCard.querySelector('.photos__image').src = link;
  photosCard.querySelector('.photos__image').alt = 'фотография ' + name;
  photosCard.querySelector('.photos__figcaption').textContent = name;
  photosImage.addEventListener('click', openPhoto);
  photosLikeButton.addEventListener('click', likePhoto);
  photosDeleteButton.addEventListener('click', deleteButton);
  where === 'append' ? photosList.append(photosCard) : photosList.prepend(photosCard);
}

function initializePhotos(arr) {
  arr.forEach(elem => {
    addPhotosElement(elem.name, elem.link, 'append');
  });
}

function initializeProfileInfo() {
  inputProfileName.value = profileName.textContent;
  inputProfileCaption.value = profileCaption.textContent;
}

function emptyInputValue(...inputs) {
  inputs.map(elem => elem.value = '')
}

function addCard(evt) {
  evt.preventDefault();
  addPhotosElement(inputPhotoName.value, inputPhotoLink.value, 'prepend');
  emptyInputValue(inputPhotoName, inputPhotoLink);
  closePopUpAdd()
}

function openPopUpEdit() {
  initializeProfileInfo();
  popUpEdit.classList.add('popup_opened');
}

function openPopUpAdd() {
  popUpAdd.classList.add('popup_opened');
}

function closePopUpEdit() {
  popUpEdit.classList.remove('popup_opened');
}

function closePopUpAdd() {
  emptyInputValue(inputPhotoName, inputPhotoLink);
  popUpAdd.classList.remove('popup_opened');
}

function profileSaveForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileCaption.textContent = inputProfileCaption.value;
  closePopUpEdit();
}

function likePhoto(evt) {
  evt.target.classList.toggle('photos__like-button_liked');
}

function deleteButton(evt) {
  evt.target.closest('.photos__card').remove();
}

function openPhoto(evt) {
  let figure = evt.path[1];
  let img = figure.querySelector('.photos__image');
  let figcaption = figure.querySelector('.photos__figcaption');
  popUpPhotosImage.src = img.src;
  popUpPhotosFigcaption.textContent = figcaption.textContent;
  popUpPhotosCloseButton.addEventListener('click', closePhoto);
  popUpPhotos.classList.add('popup_opened');
}

function closePhoto() {
  popUpPhotos.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopUpEdit);
popUpEditCloseButton.addEventListener('click', closePopUpEdit);
editForm.addEventListener('submit', profileSaveForm);

photosAddButton.addEventListener('click', openPopUpAdd);
popUpAddCloseButton.addEventListener('click', closePopUpAdd);
addForm.addEventListener('submit', addCard);

initializePhotos(initialCards)






