class Section {
  constructor({ items, renderer }, templateSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._templateContainer = document.querySelector(templateSelector);
  }
  // Отрисовываем все элементы
  renderItems() {
    this._initialItems.forEach(this._renderer);
  }
  // Принимаем DOM-элемент и добавляет его в контейнер
  addItem(cardElement) {
    this._templateContainer.prepend(cardElement);
  }
}
export { Section };