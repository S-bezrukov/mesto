class Section {
  constructor({ items, renderer }, templateSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(templateSelector);
  }
  // Отрисовываем все элементы
  renderItems() {
    this._initialItems.forEach(this._renderer);
  }
  // Принимаем DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}
export { Section };