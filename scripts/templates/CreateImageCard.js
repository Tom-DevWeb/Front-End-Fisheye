/* eslint-disable no-unused-vars */
class CreateImageCard {
  constructor(likeId) {
    this._likeId = likeId
    this.$mediaContainer = document.querySelector('.media-container')
  }

  createMedia(photographer) {
    const mediaCard = `
      <article class="media-card" >
        <img
        src="${photographer.picture}"
        alt="Photo ${photographer.title}"
        class="media-card__img"
        tabindex="0"
        onclick="lightbox.listenerLightbox(this)"
        />

        <div class="media-card__text">
          <h3 class="media-card__title">${photographer.title}</h3>
          <p class="media-card__counterLike" 
            id="nbrLike${this._likeId}">
              ${photographer.likes} 
          </p>
          <label for="like${this._likeId}" 
          class="media-card__label" 
          tabindex="0"
          >
          
            <input 
              type="checkbox" 
              id="like${this._likeId}" 
              class="media-card__checkbox" />
            <span class="media-card__btnLike" role="button">
              <span class="sr-only">Boutton pour ajouter ou enlever un like</span>
            </span>
          </label>
        </div>
    </article>
            
            `
    this.$mediaContainer.innerHTML += mediaCard

    return this.$mediaContainer
  }
}
