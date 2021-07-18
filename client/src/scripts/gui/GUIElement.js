class GUIElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      document.createElement('template').content.cloneNode(true)
    );
  }

  get element() {
    return this.shadowRoot;
  }
}

export default GUIElement;
