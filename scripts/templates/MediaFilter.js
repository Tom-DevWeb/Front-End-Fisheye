/* eslint-disable no-undef */
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
            aria-labelledby="filter-dropdown"
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
                <input type="radio" id="filter-date" name="chooce-filter" />
                <label for="filter-date" class="filter-option" tabindex="0">Date</label>
            </li>
            <li role="option">
                <input type="radio" id="filter-title" name="chooce-filter" />
                <label for="filter-title" class="filter-option" tabindex="0">Titre</label>
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
        // ==> /!\ Problème la fonction tourne 2fois quand on click !
        //
        if (isHandling) return // Si déjà en train de gérer, ne fait rien
        const label = option.querySelector('label')
        if (
          e.key === 'Enter' ||
          (e.type === 'click' && e.clientX !== 0 && e.clientY !== 0)
        ) {
          this.$selectedValue.textContent = label.textContent
          this.$customSelect.classList.remove('active')
          isHandling = true // Défini le drapeau traitement est en cours
          setTimeout(() => {
            isHandling = false // Réinitialise le drapeau après un court délai
          }, 100)

          new SortFilters(label.textContent)
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
