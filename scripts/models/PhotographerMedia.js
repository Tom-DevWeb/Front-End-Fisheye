/* eslint-disable no-unused-vars */

// --> Contructor Patterns
/* ----------------------------------------------------------------
    Class(modèle) d'un media d'un photographe
------------------------------------------------------------------- */
class PhotographerMedia {
  constructor(data) {
    this._date = data.date
    this._id = data.id
    this._formatPicture = data.image ? 'image' : 'video'
    this._picture = data.image ?? data.video
    this._likes = data.likes
    this._photographerId = data.photographerId
    this._price = data.price
    this._title = data.title
  }

  get date() {
    return this._date
  }

  get id() {
    return this._id
  }

  get formatPicture() {
    return this._formatPicture
  }

  get picture() {
    return `./assets/media/${this._photographerId}/${this._picture}`
  }

  get likes() {
    return this._likes
  }

  get photographerId() {
    return this.photographerId
  }

  get price() {
    return this._price
  }

  get title() {
    return this._title
  }
}
