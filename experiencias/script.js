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

  function toggleNav() {
    document.body.classList.toggle("nav-open");
    const isOpen = document.body.classList.contains("nav-open");
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  }

  navToggle.addEventListener("click", event => {
    event.stopPropagation();
    toggleNav();
  });

  navLinks.forEach(link => link.addEventListener("click", closeNav));

  document.addEventListener("click", event => {
    const clickedInsideNav = siteNav.contains(event.target);
    const clickedToggle = navToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) closeNav();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeNav();
  });
}

function initImageToggles() {
  const toggles = [
    {
      buttonId: "togglePackagesImage",
      panelId: "packagesImagePanel",
      openText: "Ocultar comparativa visual",
      closedText: "Ver comparativa visual"
    },
    {
      buttonId: "toggleExtrasImage",
      panelId: "extrasImagePanel",
      openText: "Ocultar imagen de adicionales",
      closedText: "Ver imagen de adicionales"
    }
  ];

  toggles.forEach(({ buttonId, panelId, openText, closedText }) => {
    const button = document.getElementById(buttonId);
    const panel = document.getElementById(panelId);

    if (!button || !panel) return;

    button.addEventListener("click", () => {
      const isOpen = panel.classList.toggle("is-open");
      panel.classList.toggle("is-collapsed", !isOpen);
      button.textContent = isOpen ? openText : closedText;
    });
  });
}

function initSubtleCardFocus() {
  const cards = document.querySelectorAll(".level-card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      cards.forEach(other => {
        if (other !== card) other.style.opacity = "0.78";
      });
    });

    card.addEventListener("mouseleave", () => {
      cards.forEach(other => {
        other.style.opacity = "";
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initImageToggles();
  initSubtleCardFocus();
});


/* INVYRA HOTFIX 1.0.49 — aria state sync for hamburger menu */
function initHamburgerA11ySync() {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");

  if (!navToggle || !siteNav) return;

  function syncMenuState() {
    const isOpen = document.body.classList.contains("nav-open");
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  navToggle.setAttribute("aria-controls", "site-nav");
  syncMenuState();

  navToggle.addEventListener("click", () => {
    window.setTimeout(syncMenuState, 0);
  });

  document.addEventListener("click", () => {
    window.setTimeout(syncMenuState, 0);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") window.setTimeout(syncMenuState, 0);
  });
}

document.addEventListener("DOMContentLoaded", initHamburgerA11ySync);

