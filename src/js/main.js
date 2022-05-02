import $ from "jquery/dist/jquery";
import { OrderForm } from "./forms/order-form";
import { Fancybox } from "@fancyapps/fancybox/dist/jquery.fancybox.min";

const navTopBtn = document.querySelector(".btn.nav-top");
const overlayMenu = document.querySelector(".header__top_overlay");
const contactForm = document.querySelector(".contact-form__form");
const navMenu = document.querySelector(".nav-menu");
const overlay = document.querySelector(".overlay");
const aboutUsButtonsContainer = document.querySelector(
  ".about-us__buttons-container"
);
const aboutUsButtons = document.querySelectorAll(".about-us__button");
const aboutUsMoretext = document.querySelector(".about-us__moretext");

aboutUsButtonsContainer.addEventListener("click", (event) => {
  aboutUsButtons.forEach((button) => {
    button.classList.toggle("about-us__button_visible");
  });
  aboutUsMoretext.classList.toggle("about-us__moretext_visible");
});

function toggleOverlayMenu() {
  overlay.classList.toggle("overlay_visible");
  navMenu.classList.toggle("nav-menu_open");
  navMenu.classList.toggle("nav-menu_close");
}

overlayMenu.addEventListener("click", (event) => {
  if (event.target.nodeName == "A") {
    toggleOverlayMenu();
  }
});

navMenu.addEventListener("click", (event) => {
  toggleOverlayMenu();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(contactForm);
  data.forEach((value, key) => console.log(`${key}:${value}`));
});

window.onscroll = function () {
  document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
    ? navTopBtn.classList.add("nav-top_visible")
    : navTopBtn.classList.remove("nav-top_visible");
};

navTopBtn.addEventListener("click", (event) => {
  document.querySelector("header.header").scrollIntoView({
    behavior: "smooth",
  });
});

/*Add smooth scroll for anchor links with offset for small screen sizes top-background*/
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (event) {
    event.preventDefault();
    element = document.querySelector(this.getAttribute("href"));
    offset = 60; /* header top background for mobile menu height*/
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.pageYOffset - offset,
      behavior: "smooth",
    });
  });
});

class TabItem {
  constructor(link, content) {
    this.link = link;
    this.content = content;
  }

  onClick(callback) {
    this.link.addEventListener("click", () => callback());
  }

  activate() {
    this._toggle(true);
  }

  deactivate() {
    this._toggle(false);
  }

  _toggle(activate) {
    this.link.classList.toggle("active-item", activate);
    this.content.classList.toggle("active-table", activate);
  }
}

class TabsManager {
  constructor(tabsElem) {
    this.tabs = [];
    this.activeTab = null;

    this.init(tabsElem);
    this.activateTab(this.tabs[0]);
  }

  init(tabsElem) {
    const links = tabsElem.querySelectorAll(".prices__navigation li");
    const contents = tabsElem.querySelectorAll(".prices__table");

    for (let i = 0; i < links.length; i++) {
      const tab = new TabItem(links[i], contents[i]);
      this.tabs.push(tab);

      tab.onClick(() => this.activateTab(tab));
    }
  }

  activateTab(tab) {
    if (this.activeTab) {
      this.activeTab.deactivate();
    }
    this.activeTab = tab;
    this.activeTab.activate();
  }
}

window.onload = function () {
  const tabsElem = document.querySelector(".prices__content");
  new TabsManager(tabsElem);
};

function init() {
  $(".slider").slick({
    draggable: true,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: ".portfolio__btn_left",
    nextArrow: ".portfolio__btn_right",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          verticalSwiping: true,
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: true,
        },
      },
    ],
  });
}

$(document).ready(init);
