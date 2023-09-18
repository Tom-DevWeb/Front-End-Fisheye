/* eslint-disable no-unused-vars */

class ContactForm {
  constructor(userData) {
    this._userData = userData

    this.$wrapper = document.createElement('div')
    this.$wrapper.classList.add('contact-modal')

    this.$body = document.querySelector('body')
    this.$insertDom = document.querySelector('.body-container')
    this.$mainDom = document.querySelector('main')

    this.createForm()
    this.closeModal()
  }

  attachWindow() {
    window.contactForm = this
  }

  createForm() {
    const modalCreate = `
    
      <div class="modal">
        <header class="modal-header">
          <h2 id="modalTitle" class="modal-title">Contactez-moi <br> ${this._userData}</h2>
          <button onclick="contactForm.closeModal()" class="modal-close">
            <span class="sr-only">Fermer le formulaire de contact</span>
          </button>
        </header>
        <form method="post" action="#" class="modal-form" onsubmit="return contactForm.validate(event);">
          <fieldset class="modal-fieldset">
            <label for="prenom" class="modal-label">Prénom</label>
            <input
              type="text"
              name="prenom"
              id="prenom"
              class="modal-input"
              aria-placeholder="Entrer votre prénom"
              autocomplete="given-name"
            />

            <label for="nom" class="modal-label">Nom</label>
            <input
              type="text"
              name="nom"
              id="nom"
              class="modal-input"
              aria-placeholder="Entrer votre nom"
              autocomplete="family-name"
            />

            <label for="email" class="modal-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="modal-input"
              aria-placeholder="Entrer votre email"
              autocomplete="email"
            />
            <p class="modal-message">
              <label for="message" class="modal-label">Message</label>
              <textarea
                name="message"
                id="message"
                class="modal-textarea"
                aria-placeholder="Entrer votre message"
              ></textarea>
            </p>
          </fieldset>
          <button type="submit" class="modal-submit">Envoyer</button>
        </form>
      </div>
    
    `

    this.$wrapper.innerHTML = modalCreate
    this.$wrapper.id = 'contact-modal'
    this.$wrapper.role = 'dialog'
    this.$wrapper.setAttribute('aria-describedby', 'modalTitle')
    this.$body.appendChild(this.$wrapper)
  }

  displayModal() {
    const modal = document.getElementById('contact-modal')
    modal.style.display = 'block'

    this.$mainDom.setAttribute('aria-hidden', 'true')
    const $modalDom = document.querySelector('.contact-modal')
    $modalDom.setAttribute('aria-hidden', 'false')

    const closeBtn = document.querySelector('.modal-close')
    closeBtn.focus()

    const classThis = this
    document.addEventListener('keydown', function (e) {
      const modal = document.getElementById('contact-modal')

      if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') {
        classThis.closeModal()
      }
    })
  }

  closeModal() {
    const modal = document.getElementById('contact-modal')
    modal.style.display = 'none'

    this.$mainDom.setAttribute('aria-hidden', 'false')
    const $modalDom = document.querySelector('.contact-modal')
    $modalDom.setAttribute('aria-hidden', 'true')

    // const openBtn = document.querySelector('.contact-button')
    // openBtn.focus()
  }

  getDataInput() {
    const getPrenom = document.querySelector('#prenom').value
    const getNom = document.querySelector('#nom').value
    const getEmail = document.querySelector('#email').value
    const getMessage = document.querySelector('#message').value
    return { getPrenom, getNom, getEmail, getMessage }
  }

  deleteDataInput() {
    document.querySelectorAll('.modal-input').forEach((e) => {
      e.value = ''
    })
    const textareaValue = document.querySelector('.modal-textarea')
    textareaValue.value = ''
  }

  validate(event) {
    event.preventDefault()
    this.closeModal()
    const data = this.getDataInput()
    console.log(`Prénom: ${data.getPrenom}`)
    console.log(`Nom: ${data.getNom}`)
    console.log(`Email: ${data.getEmail}`)
    console.log(`Message: ${data.getMessage}`)
    console.log('Envoyé')

    this.deleteDataInput()
  }
}
