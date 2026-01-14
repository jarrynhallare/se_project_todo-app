class Section {
  constructor({ items = [], renderer, containerSelector }) {
    if (!Array.isArray(items)) {
      throw new Error("Section: 'items' must be an array.");
    }
    if (typeof renderer !== "function") {
      throw new Error("Section: 'renderer' must be a function.");
    }

    this._items = items;
    this._renderer = renderer;

    this._container =
      typeof containerSelector === "string"
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!(this._container instanceof Element)) {
      throw new Error(
        "Section: container not found. Pass a valid CSS selector string (e.g. '.todos__list') or a DOM element."
      );
    }
  }

  renderItems() {
    this._items.forEach((item) => {
      const maybeElement = this._renderer(item);
      if (maybeElement instanceof Element) {
        this.addItem(maybeElement);
      }
    });
  }
  
  addItem(element) {
    if (!(element instanceof Element)) {
      throw new Error("Section.addItem: 'element' must be a DOM Element.");
    }
    this._container.prepend(element);
  }
}

export default Section;