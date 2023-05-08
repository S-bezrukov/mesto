class UserInfo {
  // Принимает объект с селекторами элементов: элемент имени пользователя и элемент опмисание
  constructor({ usernameSelector, userDescriptionSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }
  // Возвращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._userDescription.textContent
    };
  }
  // Принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._userDescription.textContent = description;
    
  }
}
export { UserInfo };