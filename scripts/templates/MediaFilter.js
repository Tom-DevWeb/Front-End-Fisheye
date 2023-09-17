/* eslint-disable no-unused-vars */
class MediaFilter {
  constructor() {
    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('filter-container')

    this.$addDom = document.querySelector('#main')
    this.$photographerMedia = document.querySelector('.photographer-media')

    this.createMediaFilter()
    this.createFilter()
  }

  createMediaFilter() {
    const filter = `
        
    <p class="filter-title">Trier par</p>

    <div class="filter-media">
        <button 
            class="filter-button"
            role="combobox"
            aria-labelledby="select button"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-controls="filter-dropdown">
                <span class="filter-selected">Choisir</span>
                <span class="filter-arrow"></span>
        </button>
        <ul class="filter-dropdown" role="listbox" id="filter-dropdown">
            <li role="option">
                <input type="radio" id="filter-popularity" name="chooce-filter" />
                <label for="filter-popularity" class="filter-option" tabindex="0">Popularité</label>
            </li>
            <li role="option">
                <input type="radio" id="filter-title" name="chooce-filter" />
                <label for="filter-title" class="filter-option" tabindex="0">Title</label>
            </li>
            <li role="option">
                <input type="radio" id="filter-date" name="chooce-filter" />
                <label for="filter-date" class="filter-option" tabindex="0">Date</label>
            </li>
        </ul>
    </div>
        
        `
    this.$wrapper.innerHTML = filter

    return this.$wrapper
  }
  createFilter() {
    this.$photographerMedia.appendChild(this.$wrapper)
    new MediaFilterButton()
  }
}
// -----------------------------------------------------------------------------------------------
class MediaFilterButton {
  constructor() {
    this.$selectBtn = document.querySelector('.filter-button')
    this.attachClickEvent()
  }

  attachClickEvent() {
    const customSelect = new MediaFilterDropdown(this.$selectBtn)
    this.$selectBtn.addEventListener('click', () => {
      customSelect.toggleDropdown()
    })
  }
}
// -----------------------------------------------------------------------------------------------
class MediaFilterDropdown {
  constructor(selectBtn) {
    this.selectBtn = selectBtn
    this.$selectedValue = document.querySelector('.filter-selected')
    this.$customSelect = document.querySelector('.filter-media')
    this.optionsList = document.querySelectorAll('.filter-dropdown li')

    this.attachEvents()
  }

  attachEvents() {
    this.optionsList.forEach((option) => {
      let isHandling = false // Ajoutez un drapeau

      function handler(e) {
        if (isHandling) return // Si déjà en train de gérer, ne faites rien
        const label = option.querySelector('label')
        if (
          e.key === 'Enter' ||
          (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0)
        ) {
          this.$selectedValue.textContent = label.textContent
          this.$customSelect.classList.remove('active')
          console.log(label.textContent)
          isHandling = true // Définissez le drapeau pour indiquer que le traitement est en cours
          setTimeout(() => {
            isHandling = false // Réinitialisez le drapeau après un court délai
          }, 100)
        }
      }

      option.addEventListener('keyup', handler.bind(this))
      option.addEventListener('click', handler.bind(this))
    })
  }

  toggleDropdown() {
    this.$customSelect.classList.toggle('active')
    const expanded = this.selectBtn.getAttribute('aria-expanded') === 'true'
    this.selectBtn.setAttribute('aria-expanded', !expanded)
  }
}

function FilterSelected(photographerMedia) {
  // console.log(photographerMedia)
  // Vous pouvez implémenter ici la logique de filtrage en fonction de l'option sélectionnée.
  // Par exemple, triez ou filtrez le tableau de médias en fonction de typeFilter.

  let typeFilter = 'Popularité'
  let filteredMedia = []
  if (typeFilter === 'Popularité') {
    // Trier par popularité
    filteredMedia = photographerMedia.sort((a, b) => b.likes - a.likes)
  } else if (typeFilter === 'Titre') {
    // Trier par titre
    filteredMedia = photographerMedia.sort((a, b) =>
      a.title.localeCompare(b.title)
    )
  } else if (typeFilter === 'Date') {
    // Trier par date (vous devez avoir une propriété date dans vos médias)
    filteredMedia = photographerMedia.sort((a, b) => a.date - b.date)
  }

  // Vous pouvez maintenant utiliser filteredMedia pour afficher les médias filtrés.
  // console.log(filteredMedia)
  // console.log(typeFilter)

  return filteredMedia
}
