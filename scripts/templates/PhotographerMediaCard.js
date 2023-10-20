/* eslint-disable no-undef */
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
    this._localStorageKey = `listLikes${this._photographer[0]._photographerId}`

    this._arrayStorage =
      JSON.parse(localStorage.getItem(this._localStorageKey)) || []

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
      <article class="media-card" >
        ${
          photographer.formatPicture === 'image'
            ? `<img
            src="${photographer.picture}"
            alt="Photo ${photographer.title}"
            class="media-card__img"
            tabindex="0"
            onclick="lightbox.listenerLightbox(this)"
            />`
            : `<video 
            src="${photographer.picture}" 
            tabindex="0"
            class="media-card__img"
            onclick="lightbox.listenerLightbox(this)"
             autoplay>
              Votre navigateur ne permet pas de lire les vidéos.
              Mais vous pouvez toujours
              <a href="${photographer.picture}">la télécharger</a> !
          </video>`
        }
        
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

  createAllMedia() {
    this._photographer.forEach((element, index) => {
      this.createMedia(element)

      this._likeId++
      this._totalLikes += element.likes
      this.createLikes(index)
    })
    // --> Permet de séléctionner une image avec entrer et ouvrir lightbox
    const $pictureCard =
      this.$mediaContainer.querySelectorAll('.media-card__img')
    $pictureCard.forEach((image) =>
      image.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          lightbox.listenerLightbox(image)
          e.preventDefault
        }
      })
    )
    this.updateLike()
  }

  updateMedia(data) {
    this.resetMedia()
    this._photographer = data
    this._likeId = 0
    this._totalLikes = 0
    this.createAllMedia()
  }

  resetMedia() {
    this.$mediaContainer.innerHTML = ''
  }

  createLikes(index) {
    // console.log(element)
    const $inputliked = document.getElementById(`like${index}`)
    const $likeTextContent = document.getElementById(`nbrLike${index}`)
    if (this._arrayStorage.includes(this._photographer[index].id)) {
      // --> inputliked.checked pas pris en compte suite du code
      // $inputliked.checked = true
      // console.log($inputliked.checked)

      $inputliked.setAttribute('checked', 'checked')
      this.addLike($likeTextContent)
    }
  }

  updateLike() {
    const displayNewTotalLikes = new PhotographerInfo()
    // --> Cible les label like du DOM
    const $updateLike = document.querySelectorAll('.media-card__label')
    $updateLike.forEach((label, index) => {
      this.toggleCheckbox(label, index, displayNewTotalLikes)
      this.enterCheckbox(label, index, displayNewTotalLikes)
    })

    //  --> Changement du conteneur total like
    displayNewTotalLikes.updateInfo(this.totalLikes)
  }

  addLike(numberLike) {
    let plusNbr = Number(numberLike.textContent) + 1
    this._totalLikes++
    numberLike.textContent = `${plusNbr}`
  }

  removeLike(numberLike) {
    let plusNbr = Number(numberLike.textContent) - 1
    this._totalLikes--
    numberLike.textContent = `${plusNbr}`
  }

  // -----------------------------------------------------------------------------------
  // ==> Pour changer le like avec le click
  // -----------------------------------------------------------------------------------
  toggleCheckbox(label, index, displayNewTotalLikes) {
    // --> Cible le conteneur nombre like 1 media
    const $likeTextContent = document.getElementById(`nbrLike${index}`)

    // --> Au changement de la checkbox
    label.addEventListener('change', () => {
      // --> Si le media deja like enlever du storage
      if (this._arrayStorage.includes(this._photographer[index].id)) {
        const indexToRemove = this._arrayStorage.indexOf(
          this._photographer[index].id
        )
        this._arrayStorage.splice(indexToRemove, 1)
        this.removeLike($likeTextContent)
        displayNewTotalLikes.updateInfo(this.totalLikes)

        // --> Sinon rajouter dans storage
      } else {
        this._arrayStorage.push(this._photographer[index].id)
        this.addLike($likeTextContent)
        displayNewTotalLikes.updateInfo(this.totalLikes)
      }

      // --> MAJ du local storage
      localStorage.setItem(
        this._localStorageKey,
        JSON.stringify(this._arrayStorage)
      )
    })
  }

  // -----------------------------------------------------------------------------------
  // ==> Pour changer le like avec entrer
  // -----------------------------------------------------------------------------------
  enterCheckbox(label, index, displayNewTotalLikes) {
    const $checkbox = document.getElementById(`like${index}`)
    // console.log($checkbox)
    // console.log($checkbox.checked)
    const $likeTextContent = document.getElementById(`nbrLike${index}`)
    label.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        $checkbox.checked = !$checkbox.checked
        e.preventDefault()
        if ($checkbox.checked) {
          this._arrayStorage.push(this._photographer[index].id)
          this.addLike($likeTextContent)
          displayNewTotalLikes.updateInfo(this.totalLikes)
        } else {
          const indexToRemove = this._arrayStorage.indexOf(
            this._photographer[index].id
          )
          this._arrayStorage.splice(indexToRemove, 1)
          this.removeLike($likeTextContent)
          displayNewTotalLikes.updateInfo(this.totalLikes)
        }
      }

      // --> MAJ du local storage
      localStorage.setItem(
        this._localStorageKey,
        JSON.stringify(this._arrayStorage)
      )
    })
  }
}
