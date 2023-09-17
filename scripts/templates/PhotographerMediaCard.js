/* eslint-disable no-unused-vars */
/* ----------------------------------------------------------------
    Création de la partie Header de la page d'un photographe
------------------------------------------------------------------- */
class PhotographerMediaCard {
  constructor(photographer) {
    this._photographer = photographer
    this._likeId = 0
    this._totalLikes = 0

    // this.$wrapper = document.createElement('div')
    // this.$wrapper.classList.add('media-card')

    this.$mediaContainer = document.querySelector('.media-container')
  }

  get photographer() {
    return this._photographer
  }

  set photographer(value) {
    this._photographer = value
  }

  get totalLikes() {
    return this._totalLikes
  }

  createMedia(photographer) {
    const mediaCard = `
      <div class="media-card">
        ${
          photographer.formatPicture === 'image'
            ? `<img
            src="${photographer.picture}"
            alt="Photo ${photographer.title}"
            class="media-card__img"
            />`
            : `<video 
            src="${photographer.picture}" 
            class="media-card__img" autoplay>
              Votre navigateur ne permet pas de lire les vidéos.
              Mais vous pouvez toujours
              <a href="${photographer.picture}">la télécharger</a> !
          </video>`
        }
        
        <section class="media-card__text">
          <h3 class="media-card__title">${photographer.title}</h3>
          <p class="media-card__counterLike">${photographer.likes}</p>
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
    </div>
            
            `
    this.$mediaContainer.innerHTML += mediaCard

    return this.$mediaContainer
  }

  createAllMedia() {
    this._photographer.forEach((element) => {
      this.createMedia(element)
      this._likeId++
      this._totalLikes += element.likes
    })
  }

  updateMedia(data) {
    this.resetMedia()
    this._photographer = data
    this.createAllMedia()
  }

  resetMedia() {
    this.$mediaContainer.innerHTML = ''
  }
}
