function openMenu() {
  document.querySelector(".overlay").style.height = "100%";
}

function closeMenu() {
  document.querySelector(".overlay").style.height = "0%";
}

function goToTop() {
  document.querySelector(".header").scrollIntoView({
    behavior: "smooth",
  });
}

document.querySelectorAll("a[href^='#']").forEach((a) => {
  a.addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
