class Section {
  constructor({ renderer }, templateSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(templateSelector);
  }
  // Отрисовываем все элементы
  renderItems(res) { res.forEach(this._renderer)}
  // Принимаем DOM-элемент и добавляет его в контейнер
  addItem(cardElement) { this._container.prepend(cardElement)}
}
export { Section };