document.body.classList.add("js-enabled");

function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");
  if (!navToggle || !siteNav) return;
  function closeNav() {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-label", "Abrir menú");
  }
  navToggle.addEventListener("click", event => {
    event.stopPropagation();
    document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-label", document.body.classList.contains("nav-open") ? "Cerrar menú" : "Abrir menú");
  });
  navLinks.forEach(link => link.addEventListener("click", closeNav));
  document.addEventListener("click", event => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeNav();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
});
