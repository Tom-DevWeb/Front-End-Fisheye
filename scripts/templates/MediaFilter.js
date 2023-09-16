/* eslint-disable no-unused-vars */
class MediaFilter {
  constructor() {
    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('filter-container')
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
                <label for="filter-popularity">Popularité</label>
            </li>
            <li role="option">
                <input type="radio" id="filter-title" name="chooce-filter" />
                <label for="filter-title">Title</label>
            </li>
            <li role="option">
                <input type="radio" id="filter-date" name="chooce-filter" />
                <label for="filter-date">Date</label>
            </li>
        </ul>
    </div>
        
        `
    this.$wrapper.innerHTML = filter

    return this.$wrapper
  }
}
