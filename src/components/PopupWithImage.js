import { Popup } from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitlePlace = this._popupItem.querySelector('.popup__title-place');
    this._popupImagePlace = this._popupItem.querySelector('.popup__image-place');
  }
  open(description, image) {
    this._popupTitlePlace.textContent = description;
    this._popupImagePlace.src = image;
    this._popupImagePlace.alt = description;
    super.open();
  }
}
export { PopupWithImage };
