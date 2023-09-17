/* eslint-disable no-unused-vars */
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

    const filters = new MediaFilter()

    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    // ------------------------------------------------------------------------------
    // Création de la liste des media -> photographerAllData.mediaPhotographer
    // ------------------------------------------------------------------------------
    //  --> Création du container
    const $addPhotographerMedia = document.querySelector('.photographer-media')
    $addPhotographerMedia.appendChild(this.$mediaContainer)

    //  --> Structure mes données
    const photographerMedia = photographerAllData.mediaPhotographer.map(
      (e) => new PhotographerMedia(e)
    )
    const initMedia = new PhotographerMediaCard(photographerMedia)
    initMedia.createAllMedia()

    // const $addMediaContainer = document.querySelector('.media-container')
    // let totalLikes = 0
    // let likeId = 0
    // await photographerMedia.forEach((element) => {
    //   const Template = new PhotographerMediaCard(element, likeId)
    //   $addMediaContainer.appendChild(Template.createMedia())

    //   likeId++
    //   totalLikes += element.likes
    //   console.log(Template)
    // })

    // this.setAllMedia(photographerMedia)

    // const filteredMedia = FilterSelected(photographerMedia)
    // this.updateAllMedia(filteredMedia)
    // --> test
    const testReset = document.querySelector('.photograph-header__title')
    testReset.addEventListener('click', () => {
      initMedia.resetMedia()
    })

    // ------------------------------------------------------------------------------
    // Création pour total likes et prix
    // ------------------------------------------------------------------------------

    const createInfo = new PhotographerInfo(
      initMedia.totalLikes,
      photographerProfil.price
    )
    this.$addDom.appendChild(createInfo.createInfo())

    //
    const filteredMedia = FilterSelected(photographerMedia)
    const changeFilter = document.querySelector('.user-card__picture')
    changeFilter.addEventListener('click', () => {
      // initMedia._photographer = filteredMedia
      initMedia.updateMedia(filteredMedia)
      const newdataTest = new PhotographerMediaCard(filteredMedia)
      console.log(newdataTest.photographer)
    })
  }

  // ------------------------------------------------------------------------------
  // Changement après filtre
  // ------------------------------------------------------------------------------
}

const run = new photographer()
run.main()
