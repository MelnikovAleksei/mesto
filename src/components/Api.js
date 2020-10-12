export class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleOriginalResponse)
  }

  deleteLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  setLike(data) {
    return fetch(`${this._url}/cards/likes/${data._id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  postCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleOriginalResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleOriginalResponse)
  }

  getInitialData() {
    return Promise.all([this.getUserInfo(), this.getCards()]);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleOriginalResponse)
  }
}
