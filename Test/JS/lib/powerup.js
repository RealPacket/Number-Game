class Powerup {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.element = document.createElement("div");
    this.element.classList.add("powerup");
    this.element.innerHTML = `
        <h2>${this.name}</h2>
        <p>${this.description}</p>
        <button id='activate-button'>Activate</button>
      `;
    this.activateButton = this.element.querySelector("#activate-button");
    this.activateButton.addEventListener("click", this.activate.bind(this));
  }

  show() {
    document.body.appendChild(this.element);
  }

  hide() {
    document.body.removeChild(this.element);
  }

  activate() {
    // TODO: add overridable
    console.log(`${this.name} activated!`);
  }
}
export default Powerup;
