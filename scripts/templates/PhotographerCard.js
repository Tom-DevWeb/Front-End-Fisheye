/* eslint-disable no-unused-vars */

/* ----------------------------------------------------------------
    Création de la card d'un photographes
------------------------------------------------------------------- */
class PhotographerCard {
  constructor(photographer) {
    this._photographer = photographer

    this.$wrapper = document.createElement('article')
    this.$wrapper.classList.add('user-card')
  }

  get photographer() {
    return this._photographer
  }

  createPhotographerCard() {
    const photographerCard = `
        
            <header class="user-card__header">
              <a href="${this._photographer.url}" 
                class="user-card__link"
                role="navigation"
                aria-label="Lien vers la page de ${this._photographer.name}"
                >
                <img class="user-card__picture" 
                  src="${this._photographer.portrait}" 
                  alt="Photo de ${this._photographer.name}" />
                <h2 class="user-card__name">${this._photographer.name}</h2>
              </a>
            </header>
            <section class="user-card__paragraph">
                <p class="user-card__localization">
                  ${this._photographer.city}, ${this._photographer.country}</p>
                <p class="user-card__tagline">${this._photographer.tagline}</p>
                <p class="user-card__price">${this._photographer.price}€/jour</p>
            </section>
        
        `
    this.$wrapper.innerHTML = photographerCard

    return this.$wrapper
  }
}
