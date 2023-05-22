class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }
  // Метод обработки ответа сервака
  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  // Инициализации карточек с сервака
  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Добавления новой карточки на сервак
  addNewCard({ name, link }) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Удаления карточки с сервака
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Отправка лайка на сервак
  insertCardLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'PUT',
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Удаления лайка с сервака
  delCardLike(cardId) {
    return fetch(`${this._link}cards/${cardId}/likes`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Метод получения данных пользователя с сервака
  getUserData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Метод отправки данных пользователя на сервак
  sendUserData(profileData) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name: profileData.username, about: profileData.description })
    })
    .then(res => { return this._serverResponse(res); })
  }
  // Отправка нового аватаре на сервак
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar: avatarLink.avatar })
    })
    .then(res => { return this._serverResponse(res); })
  }
}
export { Api };