/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// ------------------------------------------------------------------------------
// Code de la page phtographer.html
// ------------------------------------------------------------------------------

class photographer {
  constructor() {
    //  --> Envoie de l'URL pour après récupérer les datas
    this.photographersApi = new PhotographerApi('./data/photographers.json')

    //  --> Séléction de la class ou ajouter des éléments
    this.$addDom = document.querySelector('#main')

    //  --> Ajoute la section contenant Filtre + Medias
    this.$photographerMedia = document.createElement('div')
    this.$photographerMedia.classList.add('photographer-media')

    //  --> Ajoute la section contenant Medias
    this.$mediaContainer = document.createElement('div')
    this.$mediaContainer.classList.add('media-container')
  }

  async main() {
    // ------------------------------------------------------------------------------
    // Récupére datas -> media et photographers
    // ------------------------------------------------------------------------------
    // --> Récupére les datas de l'instance crée plus haut avec "url".json
    const photographersData = await this.photographersApi.get()

    //  --> SearchParams récupère seulement data du photographe Singleton pattern
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
    //  --> On ajoute div photographer-media
    this.$addDom.appendChild(this.$photographerMedia)

    //  --> On ajoute le bandeau filtre
    new MediaFilter()

    // ------------------------------------------------------------------------------
    // Création de la liste des media -> photographerAllData.mediaPhotographer
    // ------------------------------------------------------------------------------
    //  --> On ajoute div media-container
    this.$photographerMedia.appendChild(this.$mediaContainer)

    //  --> Structure mes données medias
    const photographerMedia = photographerAllData.mediaPhotographer.map(
      (e) => new PhotographerMedia(e)
    )

    // Création intsance pour crée mes card media et récupérer infos
    const initMedia = new PhotographerMediaCard(photographerMedia)
    initMedia.createAllMedia()

    // je transfére mes donnees au filtre
    InitData.data = photographerMedia
    InitData.update = initMedia

    // ------------------------------------------------------------------------------
    // Gestion du modal de contact
    // ------------------------------------------------------------------------------
    const contactForm = new ContactForm(photographerProfil._name)
    contactForm.attachWindow()

    // ------------------------------------------------------------------------------
    // Gestion du modal de contact
    // ------------------------------------------------------------------------------
    Lightbox.data = photographerMedia
    const lightbox = new Lightbox()
    lightbox.attachWindow()

    // ------------------------------------------------------------------------------
    // Création pour total likes et prix
    // ------------------------------------------------------------------------------

    const createInfo = new PhotographerInfo(
      initMedia.totalLikes,
      photographerProfil.price
    )
    this.$addDom.appendChild(createInfo.createInfo())
  }
}

const run = new photographer()
run.main()
