import { Fancybox } from "@fancyapps/ui";

const videoContainer = document.querySelector('.about-us__video-container')
const portfolioContent = document.querySelector('.portfolio__content')
const servicesContainer = document.querySelector('.services .section-container')
const mastersContainer = document.querySelector('.masters .section-container')
const headerButton = document.querySelector('.header__sign .btn')


function showModalForm() {
    Fancybox.show([{ src: "#form-modal", type: "inline" }]);
}

headerButton.addEventListener('click', ()=> {
    showModalForm();
})

servicesContainer.addEventListener('click', event => {
    if (event.target.nodeName == 'BUTTON') {
        showModalForm();
    }
})

mastersContainer.addEventListener('click', event => {
    if (event.target.classList.contains('picture-container')) {
        showModalForm();
    }
})



videoContainer.addEventListener('click', (event) => {
    Fancybox.show([{
        src: event.target.attributes['data-src'].value,
        type: 'video'
      }]);
})

portfolioContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("portfolio__picture-container")) {
        Fancybox.show([{
            src: event.target.attributes['data-src'].value,
            type: 'image'
          }]);

    }
})