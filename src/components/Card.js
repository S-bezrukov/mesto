class Card {
 constructor(cardObject, templateElem, userId, authorData, handleActions) {
  this._card = cardObject;
  this._name = cardObject.name;
  this._image = cardObject.link;
  this._template = templateElem;
  this._elementCard = document.querySelector(this._template).content.querySelector('.elements__element').cloneNode(true);
  this._userId = userId;
  this._cardId = authorData.cardId;
  this._authorId = authorData.authorId;
  this._cardDelete = handleActions.handleCardDelete;
  this._cardZoom = handleActions.handleCardZoom;
  this._putLike = handleActions.handleCardLike;
  this._removeLike = handleActions.handleCardDeleteLike;
  this._cardTitle = this._elementCard.querySelector('.elements__text');
  this._cardImage = this._elementCard.querySelector('.elements__image');
  this._cardLike = this._elementCard.querySelector('.elements__icon');
  this.likeSelector = this._elementCard.querySelector('.elements__like-counter');
  this._iconDelete = this._elementCard.querySelector('.elements__delete');
 }
  deleteCard() {
    this._elementCard.remove();
    this._elementCard = null;
  }
  // Отображения лайков и их количества
  renderCardLike(card) {
    this._likeArea = card.likes;
    if (this._likeArea.length === 0) {
      this.likeSelector.textContent = '';
    } else {
      // Берём количество лайков с сервера
      this.likeSelector.textContent = this._likeArea.length;
    }
    if (this._likedCard()) {
      this._cardLike.classList.add('elements__icon_active');
    } else {
      this._cardLike.classList.remove('elements__icon_active');
    }
  }
  // Проверки есть ли лайк
  _likedCard = ()  => {
    return this._likeArea.find((userLike) => userLike._id === this._userId);
  }
  _interactLike() {
    if (this._likedCard()) {
      this._removeLike(this._cardId);
    } else {
      this._putLike(this._cardId);
    }
  }
  createCard() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this.renderCardLike(this._card);
    this._addEventHandler();
    return this._elementCard;
  }
  // Обработчики событий
  _addEventHandler = () => {
    this._cardLike.addEventListener('click', () => this._interactLike());
    this._cardImage.addEventListener('click', () => this._cardZoom(this._name, this._image));
    if (this._userId === this._authorId) {
      this._iconDelete.addEventListener('click', () =>  this._cardDelete(this, this._cardId));
    } else {
      this._iconDelete.remove();
    }
  }
}
export { Card };