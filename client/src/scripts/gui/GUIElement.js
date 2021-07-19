class GUIElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(
      document.createElement('template').content.cloneNode(true)
    );
  }
}

export default GUIElement;
