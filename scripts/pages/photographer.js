/* eslint-disable no-undef */
//Mettre le code JavaScript lié à la page photographer.html

class photographer {
  constructor() {
    //  --> Envoie de l'URL avec nouvelle instance
    this.photographersApi = new PhotographerApi('./data/photographers.json')

    //  --> Séléction de la class ou ajouter des éléments
    this.$addDom = document.querySelector('#main')

    this.$photographerMedia = document.createElement('div')
    this.$photographerMedia.classList.add('photographer-media')

    this.$mediaContainer = document.createElement('div')
    this.$mediaContainer.classList.add('media-container')
  }

  async main() {
    //  --> Récupération des datas
    const photographersData = await this.photographersApi.get()
    console.log(photographersData)

    //  --> Cible le photographe pour récupérer juste ses données
    const photographerAllData = await new PhotographerData(photographersData)

    // ------------------------------------------------------------------------------
    // Création de l'en-tête -> photographerAllData.dataPhotographer
    // ------------------------------------------------------------------------------
    const photographerProfil = new PhotographerProfil(
      photographerAllData.dataPhotographer
    )
    const createHeaderPhotographer = new PhotographerHeader(photographerProfil)
    this.$addDom.appendChild(createHeaderPhotographer.createHeader())

    // ------------------------------------------------------------------------------
    // Création de la section filtres
    // ------------------------------------------------------------------------------
    this.$addDom.appendChild(this.$photographerMedia)
    const $addPhotographerMedia = document.querySelector('.photographer-media')

    const createMediaFilter = new MediaFilter()
    $addPhotographerMedia.appendChild(createMediaFilter.createMediaFilter())

    const customSelect = document.querySelector('.filter-media')
    const selectBtn = document.querySelector('.filter-button')

    // add a click event to select button
    selectBtn.addEventListener('click', () => {
      // add/remove active class on the container element
      customSelect.classList.toggle('active')
      // update the aria-expanded attribute based on the current state
      selectBtn.setAttribute(
        'aria-expanded',
        selectBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
      )
    })
    const selectedValue = document.querySelector('.filter-selected')
    const optionsList = document.querySelectorAll('.filter-dropdown li')
    optionsList.forEach((option) => {
      function handler(e) {
        // Click Events
        if (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0) {
          selectedValue.textContent = this.children[1].textContent
          customSelect.classList.remove('active')
        }
        // Key Events
        if (e.key === 'Enter') {
          selectedValue.textContent = this.textContent
          customSelect.classList.remove('active')
        }
      }

      option.addEventListener('keyup', handler)
      option.addEventListener('click', handler)
    })

    // ------------------------------------------------------------------------------
    // Création de la liste des media -> photographerAllData.mediaPhotographer
    // ------------------------------------------------------------------------------
    const photographerMedia = photographerAllData.mediaPhotographer.map(
      (e) => new PhotographerMedia(e)
    )
    console.log(photographerMedia)
    $addPhotographerMedia.appendChild(this.$mediaContainer)
    const $addMediaContainer = document.querySelector('.media-container')

    let totalLikes = 0
    let likeId = 0
    photographerMedia.forEach((element) => {
      const Template = new PhotographerMediaCard(element, likeId)
      $addMediaContainer.appendChild(Template.createMedia())

      likeId++
      totalLikes += element.likes
    })
    // ------------------------------------------------------------------------------
    // Création pour total likes et prix
    // ------------------------------------------------------------------------------

    const createInfo = new PhotographerInfo(
      totalLikes,
      photographerProfil.price
    )
    this.$addDom.appendChild(createInfo.createInfo())
  }
}

const run = new photographer()
run.main()
