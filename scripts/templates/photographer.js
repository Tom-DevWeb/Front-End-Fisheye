/* eslint-disable no-unused-vars */
function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data

  // --> Créer le lien de la photo de profil mais si aucune défini image par default
  const picture = `assets/photographers/${portrait ?? 'account.png'}`

  function getUserCardDOM() {
    // const article = document.createElement('article')
    // const img = document.createElement('img')
    // img.setAttribute('src', picture)
    // const h2 = document.createElement('h2')
    // h2.textContent = name
    // article.appendChild(img)
    // article.appendChild(h2)
    // console.log(article)
    const userCard = `
    <article class="user-card">
        <a href="./photographer.html" class="user-card__link">
        <header class="user-card__header">
            <img class="user-card__picture" src="${picture}" alt="${name}" />
            <h2 class="user-card__name">${name}</h2>
        </header>
        </a>
        <section class="user-card__paragraph">
            <p class="user-card__localization">${city}, ${country}</p>
            <p class="user-card__tagline">${tagline}</p>
            <p class="user-card__price">${price}€/jour</p>
        </section>
    </article>
    `
    console.log(userCard)
    return userCard
  }
  return { name, picture, city, country, tagline, price, getUserCardDOM }
}
