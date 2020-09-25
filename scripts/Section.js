export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems = () => {
    this._items.forEach(elem => {
      this._renderer(elem);
    })
  }

  addItem = (domElement) => {
    this._container.append(domElement);
  }
}
