/* eslint-disable no-unused-vars */
class PhotographerInfo {
  constructor(totalLike, price) {
    this._totalLike = totalLike
    this._price = price

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('photographer-info')
  }

  createInfo() {
    const photographerInfo = `
        
      <div class="photographer-info__likes">
        ${this._totalLike}
        <img
        src="./assets/icons/heart-black.svg"
        alt="Bouton pour ajouter ou enlver un like"
        role="button"
        class="photographer-info__imgLike"
        />
      </div>
      <p class="photographer-info__price">${this._price}€ / jour</p>
        
        `
    this.$wrapper.innerHTML = photographerInfo

    return this.$wrapper
  }
}
