import { Popup } from './Popup.js';
class PopupWithImage extends Popup {
  // Конструктор принимает селектор попап
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitlePlace = document.querySelector('.popup__title-place');
    this._popupImagePlace = document.querySelector('.popup__image-place');
  }
  // Перезаписывает родительский метод открытия
  open(description, image) {
    this._popupTitlePlace.textContent = description;
    this._popupImagePlace.src = image;
    this._popupImagePlace.alt = description;
    super.open();
  }
}
export { PopupWithImage };
