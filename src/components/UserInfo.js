export class UserInfo {
  constructor({ userNameSelector, userCaptionSelector, userAvatarSelector }) {
    this._userNameSelector = userNameSelector;
    this._userCaptionSelector = userCaptionSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._name = document.querySelector(this._userNameSelector);
    this._caption = document.querySelector(this._userCaptionSelector);
    this._avatar = document.querySelector(this._userAvatarSelector)
  }

  getUserInfo() {
    const data = {
      name: this._name.textContent,
      about: this._caption.textContent
    };
    return data;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._caption.textContent = data.about;
    this.setUserAvatar(data);
    this._avatar.alt = `${data.name} avatar`;
  }
}
