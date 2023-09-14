/* eslint-disable no-unused-vars */

/* ----------------------------------------------------------------
    Création d'une class pour fetch des données
------------------------------------------------------------------- */
class Api {
  constructor(url) {
    this._url = url
  }

  async get() {
    return (
      fetch(this._url)
        .then((res) => res.json())
        //   .then((res) => data)
        .catch((err) => console.error('an error occurs', err))
    )
  }
}

/* ----------------------------------------------------------------
    Création d'une class récupérer les données des photographes
------------------------------------------------------------------- */

class PhotographerApi extends Api {
  constructor(url) {
    super(url)
  }
  // ---> J'utilise get() pour récupérer les datas
  async getPhotographers() {
    return await this.get()
  }
}
