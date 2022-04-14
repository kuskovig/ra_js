const navTopBtn = document.querySelector(".btn.nav-top");
const overlayMenu = document.querySelector(".header__top_overlay");
const contactForm = document.querySelector(".contact-form__form");
const navMenuBtn = document.querySelectorAll(".nav-menu");
const overlay = document.querySelector(".overlay");

function closeMenu() {
  overlay.style.height == "100%"
    ? (overlay.style.height = "0%")
    : (overlay.style.height = "100%");
}

overlayMenu.addEventListener("click", (event) => {
  if (event.target.nodeName == "A") {
    closeMenu();
  }
});

navMenuBtn.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    closeMenu();
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  data = new FormData(contactForm);
  for (let value of data.entries()) {
    console.log(`${value[0]}:${value[1]}`);
  }
});

window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    navTopBtn.style.display = "block";
  } else {
    navTopBtn.style.display = "none";
  }
};

navTopBtn.addEventListener("click", (event) => {
  document.querySelector("header.header").scrollIntoView({
    behavior: "smooth",
  });
});

/*Add smooth scroll for anchor links with offset for small screen sizes top-background*/
document.querySelectorAll("a[href^='#']").forEach((a) => {
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
