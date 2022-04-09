function openMenu() {
  document.querySelector(".overlay").style.height = "100%";
}

function closeMenu() {
  document.querySelector(".overlay").style.height = "0%";
}

let navTopBtn = document.querySelector(".btn.nav-top");

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
