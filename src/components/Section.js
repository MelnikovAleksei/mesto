export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards(cardsData) {
    cardsData.forEach(card => {
      this._renderer(card);
    })
  }

  addItem(domElement, place = 'prepend') {
    if (place === 'append') {
      this._container.append(domElement);
    } else {
      this._container.prepend(domElement);
    }
  }
}
