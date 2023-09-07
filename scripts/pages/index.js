/* eslint-disable no-undef */

async function getPhotographers() {
  // Ceci est un exemple de données pour avoir un affichage de photographes de test
  // dès le démarrage du projet,
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  const fetchPhotographers = await fetch('./data/photographers.json')
  const responsePhotographers = await fetchPhotographers.json()
  console.log(responsePhotographers)
  // let photographers = [
  //     {
  //         "name": "Ma data test",
  //         "id": 1,
  //         "city": "Paris",
  //         "country": "France",
  //         "tagline": "Ceci est ma data test",
  //         "price": 400,
  //         "portrait": "account.png"
  //     },
  //     {
  //         "name": "Autre data test",
  //         "id": 2,
  //         "city": "Londres",
  //         "country": "UK",
  //         "tagline": "Ceci est ma data test 2",
  //         "price": 500,
  //         "portrait": "account.png"
  //     },
  // ]
  // et bien retourner le tableau photographers seulement une fois récupéré
  return { photographers: responsePhotographers.photographers }
}

async function displayData(photographers) {
  console.log(photographers)
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer)
    // Il y a photographerModel.getUserCardDOM() car
    // getUserDOM est une fonction dans photographerModel
    // donc on appelle le parent.enfant() ça transmet en même
    // temps les datas returné de la fonction parent
    const userCardDOM = photographerModel.getUserCardDOM()
    // photographersSection.appendChild(userCardDOM)
    photographersSection.innerHTML += userCardDOM
  })
}
/*
    init() se lance en premier pour
    charger les photographes -> getPhotographers
    afficher les photographes -> displayData
*/
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
