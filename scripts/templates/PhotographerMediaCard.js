/* eslint-disable no-unused-vars */
/* ----------------------------------------------------------------
    Création de la partie Header de la page d'un photographe
------------------------------------------------------------------- */
class PhotographerMediaCard {
  constructor(photographer, likeId) {
    this._photographer = photographer
    this._likeId = likeId

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('media-card')
  }

  get photographer() {
    return this._photographer
  }

  createMedia() {
    const mediaCard = `
            
      ${
        this._photographer.formatPicture === 'image'
          ? `<img
          src="${this._photographer.picture}"
          alt="Photo ${this._photographer.title}"
          class="media-card__img"
          />`
          : `<video 
          src="${this._photographer.picture}" 
          class="media-card__img" autoplay>
            Votre navigateur ne permet pas de lire les vidéos.
            Mais vous pouvez toujours
            <a href="${this._photographer.picture}">la télécharger</a> !
        </video>`
      }
      
      <section class="media-card__text">
        <h3 class="media-card__title">${this._photographer.title}</h3>
        <p class="media-card__counterLike">${this._photographer.likes}</p>
        <label for="like${this._likeId}" class="media-card__label">
          <input type="checkbox" id="like${
            this._likeId
          }" class="media-card__checkbox" />
          <img
            src="./assets/icons/heart.svg"
            alt="Bouton pour ajouter ou enlver un like"
            role="button"
            class="media-card__imgLike"
          />
        </label>
      </section>
   
            
            `
    this.$wrapper.innerHTML = mediaCard

    return this.$wrapper
  }
}
