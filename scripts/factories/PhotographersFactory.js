/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

class PhotographersFactory {
  constructor(data, type) {
    if (type === 'photographers') {
      console.log(data)
      const PhotographerData = data.photographers.map((data) => {
        return new PhotographerProfil(data)
      })
      return PhotographerData
    } else {
      throw 'Unknown type format'
    }
  }
}
