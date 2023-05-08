class Popup {
  // В конструктор принимает селектор попап
  constructor(popupSelector) {
    this._popupItem = document.querySelector(popupSelector);
  }
  // Открывает попап
  open() {
    this._popupItem.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose)
  }
  // Закрывает попап
  close() {
    this._popupItem.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  // Закрывает на клавишу Escape
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  // Закрывает по оверлэю или всем крестикам
  setEventListeners() {
    this._popupItem.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__image')) {
        this.close();
      }
    });
  }
}
export { Popup };