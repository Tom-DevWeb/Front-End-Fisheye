/* eslint-disable no-unused-vars */
class Lightbox {
  constructor() {
    this.$body = document.querySelector('body')
    this.$mainDom = document.querySelector('main')

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('lightbox-container')

    // Enregistrez la fonction de gestionnaire d'événements dans une propriété
    this.keyUpHandler = this.handleKeyPress.bind(this)

    this._index = 0
    this._indexLenght = 0
  }
  static data = []

  createLightbox(index) {
    const lightboxCreate = `
        <button onclick="lightbox.closeLightbox()" class="lightbox-close">
        <span class="sr-only">Fermer le caroussel</span>
        </button>
        <div class="lightbox">
        <button class="lightbox-prev" onclick="lightbox.prevMedia()">
            <span class="sr-only">Image précédente</span>
        </button>
        <div class="lightbox-media">
            <div class="lightbox-img"></div>
            <h2 class="lightbox-title"></h2>
        </div>
        <button class="lightbox-next" onclick="lightbox.nextMedia()">
            <span class="sr-only">Image suivante</span>
        </button>
        </div>
    `

    this.$wrapper.innerHTML = lightboxCreate
    this.$mainDom.appendChild(this.$wrapper)

    this.createMediaFormat(index)
    this.openLightbox()
  }

  openLightbox() {
    const $lightbox = document.querySelector('.lightbox-container')
    // $lightbox.style.display = 'block'
    $lightbox.setAttribute('aria-hidden', 'false')

    this.$mainDom.setAttribute('aria-hidden', 'true')

    this.$body.classList.add('no-scroll')

    const closeBtn = document.querySelector('.lightbox-close')
    closeBtn.focus()
  }

  closeLightbox() {
    const $lightbox = document.querySelector('.lightbox-container')
    // $lightbox.style.display = 'none'
    if ($lightbox) {
      $lightbox.remove()
    } else {
      console.error('L élément n a pas été trouvé.')
    }

    // $lightbox.setAttribute('aria-hidden', 'true')
    this.$body.classList.remove('no-scroll')

    this.$mainDom.setAttribute('aria-hidden', 'false')

    // --> Enlève les event key aux éléments
    document.removeEventListener('keydown', this.keyUpHandler)
  }

  handleKeyPress(e) {
    // ==> Gère la fermeture du modal avec la touche echap
    const $lightbox = document.querySelector('.lightbox-container')
    const focusElements = $lightbox.querySelectorAll('button')
    const focusElementsArray = Array.from(focusElements)

    const firstFocusElement = focusElementsArray[0]
    const lastFocusElement = focusElementsArray[focusElementsArray.length - 1]

    if (
      $lightbox.getAttribute('aria-hidden') === 'false' &&
      e.key === 'Escape'
    ) {
      this.closeLightbox()
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      this.nextMedia()
      e.preventDefault()
    } else if (e.key === 'ArrowLeft') {
      this.prevMedia()
      e.preventDefault()
    } else if (e.key === 'Tab' || e.keyCode === 9) {
      // console.log('Tab')
      if (e.shiftKey) {
        // console.log('Shift Tab')
        // Si Maj + Tab, déplacez le focus de l'élément actuel vers le dernier élément focusable
        //  --> document.activeElement est l'élément avec le focus à linstant T
        if (document.activeElement === firstFocusElement) {
          e.preventDefault()
          lastFocusElement.focus()
          // console.log('last')
        }
      } else {
        // Sinon, déplacez le focus de l'élément actuel vers le premier élément focusable
        //  --> document.activeElement est l'élément avec le focus à linstant T
        if (document.activeElement === lastFocusElement) {
          e.preventDefault()
          firstFocusElement.focus()
          // console.log('first')
        }
      }
    } else {
      if (e.key === 'Enter') return
      //  --> Désactive les événement pour les autres touches
      e.preventDefault()
      // console.log('test')
    }
  }

  listenerLightbox(data) {
    //  --> On obtient une NodeList
    const allMedia = document.querySelectorAll('.media-card__img')
    //  --> On transforme en Array
    const allMediaArray = [...allMedia]
    //  --> On recherche l'index de l'object cliqué
    const searchIndex = allMediaArray.findIndex((e) => e === data)
    // --> Renvoye en haut de la page pour la position abolute top 0 right 0
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    })

    this._indexLenght = allMediaArray.length
    this._index = searchIndex
    this.createLightbox(searchIndex)

    // --> Rattache les event key aux éléments
    document.addEventListener('keydown', this.keyUpHandler)
  }

  prevMedia() {
    const prevBtn = document.querySelector('.lightbox-prev')
    prevBtn.focus()
    this._index = this._index - 1
    if (this._index < 0) {
      this._index = this._indexLenght - 1
    }
    setTimeout(() => {
      this.createMediaFormat(this._index)
    }, 100)
  }

  nextMedia() {
    const nextBtn = document.querySelector('.lightbox-next')
    nextBtn.focus()
    this._index = this._index + 1
    if (this._index > this._indexLenght - 1) {
      this._index = 0
    }
    setTimeout(() => {
      this.createMediaFormat(this._index)
    }, 100)
  }

  createMediaFormat(index) {
    const $lightboxTitle = document.querySelector('.lightbox-title')
    $lightboxTitle.textContent = Lightbox.data[index].title

    const $lightboxIMG = document.querySelector('.lightbox-img')
    $lightboxIMG.innerHTML = ''
    let format = Lightbox.data[index].formatPicture
    if (format === 'image') {
      const createPicture = `
        <img
            class="lightbox-picture"
            src="${Lightbox.data[index].picture}"
            alt="Image ${Lightbox.data[index].title}"
        />
      `
      $lightboxIMG.innerHTML = createPicture
    } else if (format === 'video') {
      const createPicture = `
        <video
            class="lightbox-picture"
            src="${Lightbox.data[index].picture}"
            alt="Vidéo ${Lightbox.data[index].title}"
            controls>
        </video>
      `
      $lightboxIMG.innerHTML = createPicture
    } else {
      throw console.log('Format inconnu ni video ou image')
    }
  }

  attachWindow() {
    window.lightbox = this
  }
}
