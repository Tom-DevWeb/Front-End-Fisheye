/* eslint-disable no-unused-vars */
// ------------------------------------------------------------------------------
// Système pour trier
// ------------------------------------------------------------------------------
//  --> Je stock mes valeurs à réutiliser
//      -> l'ensemble des medias à réorganisé
//      -> l'instance pour lancer l'update
class InitData {
  static data = []
  static getData() {
    return this.data
  }
  static update = {}
  static getUpdate() {
    return this.update
  }
}

class SortFilters {
  constructor(typeFilter) {
    this._typeFilter = typeFilter
    this._filteredMedia = []

    this.sortData()
  }

  sortData() {
    if (this._typeFilter === 'Popularité') {
      // Trier par popularité
      this._filteredMedia = InitData.data.sort((a, b) => b._likes - a._likes)
    } else if (this._typeFilter === 'Titre') {
      // Trier par titre
      this._filteredMedia = InitData.data.sort((a, b) =>
        a.title.localeCompare(b._title)
      )
    } else if (this._typeFilter === 'Date') {
      // Trier par date
      this._filteredMedia = InitData.data.sort((a, b) => {
        const dateA = new Date(a._date)
        const dateB = new Date(b._date)
        return dateB - dateA
      })
    }
    InitData.update.updateMedia(this._filteredMedia)
  }
}
