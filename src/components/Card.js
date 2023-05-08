class Card {
 constructor(object, templateElem, handleCardClick) {
   // Клонируем шаблон и наполняем его информацией из объекта object, навешиваем обработчики событий
   this._name = object.name;
   this._image = object.link;
   this._template = templateElem;
   this._handleCardClick = handleCardClick;
   this._elementCard = document.querySelector(this._template).content.querySelector('.elements__element').cloneNode(true);
   this._cardTitle = this._elementCard.querySelector('.elements__text');
   this._cardImage = this._elementCard.querySelector('.elements__image');
   this._cardLike = this._elementCard.querySelector('.elements__icon');
   this._cardDelete = this._elementCard.querySelector('.elements__delete');
 }
 // удаление карточки
 _deleteCard() {
   this._elementCard.remove();
 }
 // Лайк
 _handleLike () {
   this._cardLike.classList.toggle('elements__icon_active');
 }
 // Создаём карточку
 createCard() {
   this._cardTitle.textContent = this._name;
   this._cardImage.src = this._image;
   this._cardImage.alt = this._name;
   this._addEventHandler();
   return this._elementCard;
 }
 // Обработчика событий
 _addEventHandler = () => {
   this._cardLike.addEventListener('click', event => this._handleLike(event));
   this._cardDelete.addEventListener('click', event => this._deleteCard(event));
   this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._image));
 }
}
export { Card };