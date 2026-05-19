/**
 * INVYRA - Landing Page
 * Version 1.0.0
 * Premium Digital Events
 * Main landing interactions
 */

document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/* ==============================
   CONFIG
   ============================== */

const INVYRA_WHATSAPP_NUMBER = "525535690278";

const WHATSAPP_BASE_MESSAGE =
    "Hola INVYRA, quiero crear mi experiencia digital. Me gustaría cotizar una invitación.";

/* ==============================
   MOBILE NAV
   ============================== */

function initMobileNav() {
    const navToggle = document.getElementById("nav-toggle");
    const siteNav = document.getElementById("site-nav");
    const navLinks = document.querySelectorAll(".site-nav a");

    if (!navToggle || !siteNav) return;

    navToggle.addEventListener("click", () => {
        document.body.classList.toggle("nav-open");

        const isOpen = document.body.classList.contains("nav-open");

        navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
            navToggle.setAttribute("aria-label", "Abrir menú");
        });
    });

    document.addEventListener("click", event => {
        const clickedInsideNav = siteNav.contains(event.target);
        const clickedToggle = navToggle.contains(event.target);

        if (!clickedInsideNav && !clickedToggle) {
            document.body.classList.remove("nav-open");
            navToggle.setAttribute("aria-label", "Abrir menú");
        }
    });
}

/* ==============================
   FAQ ACCORDION
   ============================== */

function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            faqItems.forEach(otherItem => {
                otherItem.classList.remove("active");
            });

            if (!isActive) {
                item.classList.add("active");
            }
        });
    });
}

/* ==============================
   SCROLL HEADER
   ============================== */

function initHeaderScrollState() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    function updateHeader() {
        const isScrolled = window.scrollY > 20;
        header.classList.toggle("is-scrolled", isScrolled);
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });
}

/* ==============================
   ACTIVE NAV LINK
   ============================== */

function initActiveNavLinks() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

    if (!sections.length || !navLinks.length) return;

    function updateActiveLink() {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute("href");

            link.classList.toggle("active", href === `#${currentSectionId}`);
        });
    }

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });
}

/* ==============================
   REVEAL ANIMATIONS
   ============================== */

function initAnimations() {
    if (typeof gsap === "undefined") {
        document
            .querySelectorAll(".reveal-item, .reveal-title, .section-reveal")
            .forEach(element => {
                element.style.opacity = "1";
                element.style.transform = "none";
                element.style.filter = "blur(0px)";
            });

        return;
    }

    gsap.set(".reveal-item", {
        opacity: 0,
        y: 28,
        filter: "blur(8px)"
    });

    gsap.set(".reveal-title", {
        opacity: 0,
        y: 38,
        scale: 0.96,
        filter: "blur(10px)"
    });

    const heroTimeline = gsap.timeline({
        delay: 0.18,
        defaults: {
            ease: "power3.out"
        }
    });

    heroTimeline
        .to(".reveal-item", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.12
        })
        .to(".reveal-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.15
        }, "-=0.72");

    if (typeof ScrollTrigger === "undefined") {
        document.querySelectorAll(".section-reveal").forEach(section => {
            section.style.opacity = "1";
            section.style.transform = "none";
            section.style.filter = "blur(0px)";
        });

        return;
    }

    gsap.utils.toArray(".section-reveal").forEach(section => {
        gsap.fromTo(
            section,
            {
                opacity: 0,
                y: 64,
                filter: "blur(10px)"
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 86%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.1,
                ease: "power3.out"
            }
        );
    });

    gsap.utils.toArray(".package-mini-card, .demo-card, .process-card, .faq-item").forEach((card, index) => {
        gsap.fromTo(
            card,
            {
                opacity: 0,
                y: 28
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 92%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                delay: Math.min(index * 0.04, 0.24)
            }
        );
    });

    initSubtleMotion();

    ScrollTrigger.refresh();
}

function initSubtleMotion() {
    if (typeof gsap === "undefined") return;

    gsap.to(".bg-orb-one", {
        x: 28,
        y: 18,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".bg-orb-two", {
        x: -30,
        y: -20,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-card", {
        y: -8,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-decoration-left", {
        y: -18,
        rotate: 20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-decoration-right", {
        y: 18,
        rotate: 14,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

/* ==============================
   QUOTE FORM → WHATSAPP
   ============================== */

function initQuoteForm() {
    const form = document.getElementById("quote-form");

    if (!form) return;

    form.addEventListener("submit", event => {
        event.preventDefault();

        const clientName = getInputValue("clientName");
        const eventType = getInputValue("eventType");
        const packageType = getInputValue("packageType");
        const eventDate = getInputValue("eventDate");
        const message = getInputValue("message");

        const hasUsefulData =
            clientName ||
            eventType ||
            packageType ||
            eventDate ||
            message;

        if (!hasUsefulData) {
            showFormFeedback("Agrega al menos un dato para preparar tu mensaje.", "error");
            highlightEmptyForm();
            return;
        }

        const formattedDate = formatDate(eventDate);

        const whatsappMessage =
            `Hola INVYRA, quiero cotizar una invitación digital.\n\n` +
            `*Nombre:* ${clientName || "No especificado"}\n` +
            `*Tipo de evento:* ${eventType || "No especificado"}\n` +
            `*Paquete de interés:* ${packageType || "No especificado"}\n` +
            `*Fecha del evento:* ${formattedDate || "No especificada"}\n` +
            `*Detalles adicionales:* ${message || "Sin detalles adicionales"}`;

        const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

        showFormFeedback("Mensaje preparado. Abriendo WhatsApp...", "success");

        setTimeout(() => {
            window.open(whatsappUrl, "_blank");
        }, 650);
    });
}

function getInputValue(id) {
    const input = document.getElementById(id);

    if (!input) return "";

    return input.value.trim();
}

function buildWhatsAppUrl(message) {
    return `https://wa.me/${INVYRA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatDate(dateValue) {
    if (!dateValue) return "";

    const [year, month, day] = dateValue.split("-");

    if (!year || !month || !day) return dateValue;

    return `${day}/${month}/${year}`;
}

function showFormFeedback(message, type = "success") {
    const form = document.getElementById("quote-form");

    if (!form) return;

    let feedback = form.querySelector(".form-feedback");

    if (!feedback) {
        feedback = document.createElement("p");
        feedback.className = "form-feedback";
        form.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.classList.remove("success", "error");
    feedback.classList.add(type);

    setTimeout(() => {
        feedback.textContent = "";
        feedback.classList.remove("success", "error");
    }, 4200);
}

function highlightEmptyForm() {
    const fields = [
        document.getElementById("clientName"),
        document.getElementById("eventType"),
        document.getElementById("packageType"),
        document.getElementById("eventDate"),
        document.getElementById("message")
    ].filter(Boolean);

    fields.forEach(field => {
        field.classList.add("field-warning");

        setTimeout(() => {
            field.classList.remove("field-warning");
        }, 1800);
    });
}

/* ==============================
   WHATSAPP LINKS
   ============================== */

function initWhatsappLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');

    whatsappLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
        });
    });
}

/* ==============================
   IMAGE SAFETY
   ============================== */

function initImageFallbacks() {
    const images = document.querySelectorAll("img");

    images.forEach(image => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");

            if (!image.dataset.failedOnce) {
                image.dataset.failedOnce = "true";
                console.warn("No se pudo cargar la imagen:", image.src);
            }
        });
    });
}

/* ==============================
   ACCESSIBILITY HELPERS
   ============================== */

function initKeyboardHelpers() {
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.body.classList.remove("nav-open");
        }
    });
}

/* ==============================
   DOM READY
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initFaqAccordion();
    initHeaderScrollState();
    initActiveNavLinks();
    initQuoteForm();
    initWhatsappLinks();
    initImageFallbacks();
    initKeyboardHelpers();
    initAnimations();
});