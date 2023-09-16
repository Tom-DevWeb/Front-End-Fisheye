/* eslint-disable no-undef */

/* ----------------------------------------------------------------
    Gestion de l'app
------------------------------------------------------------------- */
class App {
  constructor() {
    //  --> Envoie de l'URL avec nouvelle instance
    this.photographersApi = new PhotographerApi('./data/photographers.json')

    //  --> Séléction de la class ou ajouter des éléments
    this.$addDom = document.querySelector('.photographer_section')
  }

  async main() {
    //  --> Récupération des datas
    const photographersData = await this.photographersApi.get()
    console.log(photographersData)

    //  --> Trie des Datas et formatage des datas photographes
    // const Photographers = photographersData.photographers.map(
    //   (data) => new PhotographerProfil(data)
    // )
    const Photographers = new PhotographersFactory(
      photographersData,
      'photographers'
    )
    console.log(Photographers)

    //  --> Création des card photographe et ajout au DOM
    Photographers.forEach((photographer) => {
      const TemplateCard = new PhotographerCard(photographer)
      this.$addDom.appendChild(TemplateCard.createPhotographerCard())
    })
    // console.log(Photographers)
  }
}

/* ----------------------------------------------------------------
    Lance l'execution de l'app avec la méthode main()
------------------------------------------------------------------- */
const app = new App()
app.main()
