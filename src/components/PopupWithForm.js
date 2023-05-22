import { Popup } from './Popup.js';
class PopupWithForm extends Popup {
  // Конструктор принимает селектор popup и callback сабмита формы
  constructor(popupSelector, { callbackSubmitForm }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupFormItem = this._popupItem.querySelector('.form');
    this._inputList = Array.from(this._popupFormItem.querySelectorAll('.form__input'));
    this._sendButton = this._popupItem.querySelector('.form__submit-btn');
    this._sendButtonText = this._sendButton.textContent;
  }
  // Собираем данные всех полей
  _getInputValues() {
    const formValues = {}; // Пустой массив наполняем данными
    this._inputList.forEach(inputItem => {
      formValues[inputItem.name] = inputItem.value;
    });
    return formValues;
  }
  // Добавляем обработчик на клик и сабмита формы
  setEventListeners() {
    // Перезаписывает родительский метод setEventListeners
    super.setEventListeners();
    this._popupFormItem.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
  }
  // название кнопки в момент сохранения
  putSavingProcessText() {
    this._sendButton.textContent = 'Сохранение...';
  }
  // стандартного текст кнопки
  returnSavingProcessText() {
    this._sendButton.textContent = this._sendButtonText;
  }
  // Закрытие попап (перезаписывает у родителя)
  close() {
    super.close();
    // Сбрас формы
    this._popupFormItem.reset();
  }
}
export { PopupWithForm };