document.body.classList.add("js-enabled");

function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = document.querySelectorAll(".site-nav a");

  if (!navToggle || !siteNav) return;

  function setNavState(isOpen) {
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function closeNav() {
    setNavState(false);
  }

  navToggle.addEventListener("click", event => {
    event.stopPropagation();
    setNavState(!document.body.classList.contains("nav-open"));
  });

  navLinks.forEach(link => link.addEventListener("click", closeNav));

  document.addEventListener("click", event => {
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) closeNav();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeNav();
  });
}

function initPortfolioFilters() {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".demo-card[data-category]");
  const status = document.getElementById("filter-status");

  if (!chips.length || !cards.length) return;

  const filterLabels = {
    all: "todas las experiencias disponibles",
    essential: "las experiencias Essential",
    signature: "las experiencias Signature",
    legacy: "las experiencias Legacy"
  };

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter || "all";
      let visibleCount = 0;

      chips.forEach(item => {
        const isActive = item === chip;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      cards.forEach(card => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
        if (shouldShow) visibleCount += 1;
      });

      if (status) {
        status.textContent = `Mostrando ${filterLabels[filter] || "experiencias filtradas"}: ${visibleCount} ${visibleCount === 1 ? "demo" : "demos"}.`;
      }
    });
  });
}

function initHeaderScrollState() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

function initImageFallbacks() {
  document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
      image.closest(".demo-visual, .feature-preview-image")?.classList.add("image-missing");
      image.remove();
    });
  });
}

function initRevealAnimations() {
  const criticalSections = document.querySelectorAll(".demos-section.section-reveal");
  criticalSections.forEach(section => section.classList.add("is-visible"));

  const items = Array.from(document.querySelectorAll(
    ".section-reveal, .demo-card, .feature-preview, .reading-grid article, .mood-strip article, .decision-steps article"
  )).filter(item => !item.matches(".demos-section.section-reveal"));

  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px 40px 0px" }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
    observer.observe(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initPortfolioFilters();
  initHeaderScrollState();
  initImageFallbacks();
  initRevealAnimations();
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
