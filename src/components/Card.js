export class Card {
  constructor(data, templateSelector, settings, ownerId, { handleCardClick, handleDeleteCardClick, setLike, deleteLike }) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._settings = settings;
    this._ownerId = ownerId
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
  }

  _getTemplateElement() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .firstElementChild
      .cloneNode(true);
    return cardElement;
  }

  deleteCard() {
    this._deleteElem(this._element);
  }

  _deleteElem(elem) {
    elem.remove();
    elem = null;
  }

  _dislike(data) {
    this._removeLikedClass();
    this._deleteLike(data);
  }

  _like(data) {
    this._addLikedClass();
    this._setLike(data);
  }

  _removeLikedClass() {
    this._likeButton.classList.remove(this._settings.photoLikedButtonClass);
  }

  _addLikedClass() {
    this._likeButton.classList.add(this._settings.photoLikedButtonClass);
  }

  setLikeCount(data) {
    this._photoLikeCount.textContent = String(data.likes.length);
  }

  _checkIsOwnCard() {
    if (this._data.owner._id !== this._ownerId) {
      this._deleteElem(this._deleteButton);
    }
  }

  _checkLikedState() {
    this._data.likes.forEach((likeOwner) => {
      if (likeOwner._id === this._ownerId) {
        this._addLikedClass();
      }
    })
  }

  _setEventListeners() {
    this._photoImage.addEventListener('click', () => {
      this._handleCardClick(this._data);
    })
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains(this._settings.photoLikedButtonClass)) {
        this._dislike(this._data);
      } else {
        this._like(this._data);
      }
    })
    this._deleteButton.addEventListener('click', this._handleDeleteCardClick);
  }

  generateCard() {
    this._element = this._getTemplateElement();
    this._photoImage = this._element.querySelector(this._settings.photoImageSelector);
    this._photoFigcaption = this._element.querySelector(this._settings.photoFigcaptionSelector);
    this._likeButton = this._element.querySelector(this._settings.photoLikeButtonSelector);
    this._photoLikeCount = this._element.querySelector(this._settings.photoLikeCountSelector);
    this._deleteButton = this._element.querySelector(this._settings.photoDeleteButtonSelector);
    this._element.setAttribute('id', `a${this._data._id}`);
    this._photoImage.src = this._data.link;
    this._photoImage.alt = `Фотография ${this._data.name}`;
    this._photoFigcaption.textContent = this._data.name;
    this.setLikeCount(this._data)
    this._setEventListeners();
    this._checkIsOwnCard();
    this._checkLikedState();
    return this._element;
  }
}
