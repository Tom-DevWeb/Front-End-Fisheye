/* eslint-disable no-unused-vars */
// --> Singleton Pattern
/* ----------------------------------------------------------------
    Strucutre les données d'un photographe
------------------------------------------------------------------- */
class PhotographerData {
  constructor(data) {
    if (PhotographerData.exists) {
      return PhotographerData.instance
    }
    PhotographerData.instance = this

    this._data = data

    this.searchParams = new URLSearchParams(document.location.search).get(
      'user'
    )
  }

  get namePhotographer() {
    return this.searchParams
  }

  get dataPhotographer() {
    // const user = this._data.photographers.find(
    //   (element) => element.name === this.searchParams
    // )
    return this._data.photographers.find(
      (element) => element.name === this.searchParams
    )
  }

  get mediaPhotographer() {
    // const id = this.dataPhotographer.id
    // const media = this._data.media.filter(
    //   (element) => element.photographerId === id
    // )
    return this._data.media.filter(
      (element) => element.photographerId === this.dataPhotographer.id
    )
  }
}
