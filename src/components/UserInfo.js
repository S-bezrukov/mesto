class UserInfo {
  // Принимает объект с селекторами элементов пользователя
  constructor({ usernameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._avatarLink = document.querySelector(userAvatarSelector);
  }
  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._userDescription.textContent
    };
  }
  // Получаем новые данные пользователя и вставляем их
  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._userDescription.textContent = description;
    
  }
  // Обновляем ссылку аватара
  setUserAvatar(avatarLink) {
    this._avatarLink.src = avatarLink;
  }
}
export { UserInfo };