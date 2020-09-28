export class UserInfo {
  constructor({ userNameSelector, userCaptionSelector }) {
    this._userNameSelector = userNameSelector;
    this._userCaptionSelector = userCaptionSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._caption = document.querySelector(this._userCaptionSelector);
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      caption: this._caption.textContent
    };
    return data;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._caption.textContent = data.caption;
  }
}
