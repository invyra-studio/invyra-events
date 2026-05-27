/**
 * INVYRA - Landing Page
 * Version preview-1.0.40
 * Premium Digital Events
 */
document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const INVYRA_WHATSAPP_NUMBER = "525535690278";
const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwvkuj1XGIoV6nxZhq2YPdpytfAaftlEXJElHnRy-hcGHZKM5jF2ERaF7JFSNwiCOBD/exec";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const QUOTE_FORM_STORAGE_KEY = "invyra_landing_preview_quote_draft";

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
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    if (!faqItems.length) return;
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        if (!question) return;
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            faqItems.forEach(otherItem => otherItem.classList.remove("active"));
            if (!isActive) item.classList.add("active");
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

function initActiveNavLinks() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
    if (!sections.length || !navLinks.length) return;
    function updateActiveLink() {
        let currentSectionId = "inicio";
        const scrollReference = window.scrollY + 180;
        sections.forEach(section => {
            if (scrollReference >= section.offsetTop) {
                currentSectionId = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            link.classList.toggle("active", href === `#${currentSectionId}`);
        });
    }
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink, { passive: true });
}

function setVisibleFallback() {
    document
        .querySelectorAll(".reveal-item, .reveal-title, .section-reveal")
        .forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.filter = "blur(0px)";
        });
}

function initAnimations() {
    if (typeof gsap === "undefined" || prefersReducedMotion) {
        setVisibleFallback();
        return;
    }
    gsap.set(".reveal-item", { opacity: 0, y: 28, filter: "blur(8px)" });
    gsap.set(".reveal-title", { opacity: 0, y: 38, scale: 0.96, filter: "blur(10px)" });
    const heroTimeline = gsap.timeline({ delay: 0.18, defaults: { ease: "power3.out" } });
    heroTimeline
        .to(".reveal-item", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12 })
        .to(".reveal-title", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.15 }, "-=0.72");
    if (typeof ScrollTrigger === "undefined") {
        setVisibleFallback();
        return;
    }
    gsap.utils.toArray(".section-reveal").forEach(section => {
        gsap.fromTo(section, { opacity: 0, y: 64, filter: "blur(10px)" }, {
            scrollTrigger: { trigger: section, start: "top 86%", toggleActions: "play none none none" },
            opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, ease: "power3.out"
        });
    });
    gsap.utils
        .toArray(".package-mini-card, .demo-card, .process-card, .faq-item, .problem-card, .include-feature-card, .mobile-proof-list article, .mobile-feature-phone, .mobile-proof-card, .lived-experience-card, .lived-experience-closing")
        .forEach((card, index) => {
            gsap.fromTo(card, { opacity: 0, y: 28 }, {
                scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
                opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay: Math.min(index * 0.04, 0.24)
            });
        });
    initSubtleMotion();
    ScrollTrigger.refresh();
}

function initSubtleMotion() {
    if (typeof gsap === "undefined" || prefersReducedMotion) return;
    gsap.to(".bg-orb-one", { x: 28, y: 18, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".bg-orb-two", { x: -30, y: -20, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-card", { y: -8, duration: 5.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-decoration-left", { y: -18, rotate: 20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-decoration-right", { y: 18, rotate: 14, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
}

function initQuoteFormEnhancements() {
    initNameInputRules();
    initPhoneInputRules();
    initEventDateRules();
    initPackageExtrasRules();
}

function initNameInputRules() {
    const nameInput = document.getElementById("clientName");
    if (!nameInput) return;
    nameInput.addEventListener("input", () => {
        nameInput.value = nameInput.value
            .replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]/g, "")
            .replace(/\s+/g, " ")
            .replace(/^\s+/g, "");
    });
    nameInput.addEventListener("blur", () => {
        nameInput.value = toTitleCase(nameInput.value.trim());
    });
}

function initPhoneInputRules() {
    const phoneInput = document.getElementById("clientPhone");
    if (!phoneInput) return;
    phoneInput.addEventListener("input", () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    });
}

function initEventDateRules() {
    const eventDateInput = document.getElementById("eventDate");
    if (!eventDateInput) return;
    const today = getTodayISODate();
    eventDateInput.min = today;
    if (eventDateInput.value && eventDateInput.value < today) eventDateInput.value = "";
}

function initPackageExtrasRules() {
    const packageSelect = document.getElementById("packageType");
    if (!packageSelect) return;
    packageSelect.addEventListener("change", updateExtrasByPackage);
    updateExtrasByPackage();
}

function updateExtrasByPackage() {
    const packageSelect = document.getElementById("packageType");
    const hint = document.getElementById("extrasHint");
    const selectedPackage = packageSelect ? packageSelect.value : "";
    const options = document.querySelectorAll(".check-option[data-packages]");
    options.forEach(option => {
        const input = option.querySelector('input[type="checkbox"]');
        const allowedPackages = (option.dataset.packages || "").split(",").map(value => value.trim()).filter(Boolean);
        const isAllowed = selectedPackage && allowedPackages.includes(selectedPackage);
        option.classList.toggle("is-disabled", !isAllowed);
        if (input) {
            input.disabled = !isAllowed;
            if (!isAllowed) input.checked = false;
        }
    });
    if (!hint) return;
    if (!selectedPackage) {
        hint.textContent = "Selecciona primero un paquete para ver qué adicionales aplican.";
        return;
    }
    if (selectedPackage === "Legacy") {
        hint.textContent = "Legacy Experience concentra la mayoría de funciones premium. Solo se muestran adicionales realmente aplicables.";
        return;
    }
    if (selectedPackage === "Signature") {
        hint.textContent = "Estos adicionales complementan Signature Experience sin repetir funciones ya incluidas.";
        return;
    }
    if (selectedPackage === "Esencial") {
        hint.textContent = "Puedes agregar funciones extra para elevar Essential Experience según tu evento.";
        return;
    }
    hint.textContent = "Selecciona los adicionales que te interesen o marca “Aún no lo sé”.";
}


/* ==============================
   QUOTE FORM AUTOSAVE / RESTORE
   ============================== */

function initQuoteFormAutosave() {
    const form = document.getElementById("quote-form");
    if (!form) return;

    restoreQuoteDraft(form);

    form.addEventListener("input", () => {
        saveQuoteDraft(form);
    });

    form.addEventListener("change", () => {
        saveQuoteDraft(form);
    });
}

function getQuoteDraftData(form) {
    const draft = {};

    Array.from(form.elements).forEach(field => {
        if (!field.name || field.type === "submit" || field.type === "button") return;

        if (field.type === "checkbox") {
            if (!draft[field.name]) draft[field.name] = [];
            if (field.checked) draft[field.name].push(field.value);
            return;
        }

        if (field.type === "radio") {
            if (field.checked) draft[field.name] = field.value;
            return;
        }

        draft[field.name] = field.value;
    });

    return draft;
}

function saveQuoteDraft(form) {
    try {
        const draft = getQuoteDraftData(form);
        const hasContent = Object.values(draft).some(value => {
            if (Array.isArray(value)) return value.length > 0;
            return String(value || "").trim().length > 0;
        });

        if (!hasContent) {
            clearQuoteDraft();
            return;
        }

        localStorage.setItem(QUOTE_FORM_STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
        console.warn("No se pudo guardar el borrador de cotización:", error);
    }
}

function restoreQuoteDraft(form) {
    try {
        const savedDraft = localStorage.getItem(QUOTE_FORM_STORAGE_KEY);
        if (!savedDraft) return;

        const draft = JSON.parse(savedDraft);

        Object.entries(draft).forEach(([name, value]) => {
            const fields = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);
            if (!fields.length) return;

            fields.forEach(field => {
                if (field.type === "checkbox") {
                    field.checked = Array.isArray(value) && value.includes(field.value);
                    return;
                }

                if (field.type === "radio") {
                    field.checked = field.value === value;
                    return;
                }

                field.value = value;
            });
        });

        updateExtrasByPackage();
    } catch (error) {
        console.warn("No se pudo restaurar el borrador de cotización:", error);
    }
}

function clearQuoteDraft() {
    try {
        localStorage.removeItem(QUOTE_FORM_STORAGE_KEY);
    } catch (error) {
        console.warn("No se pudo limpiar el borrador de cotización:", error);
    }
}

function initQuoteForm() {
    const form = document.getElementById("quote-form");
    if (!form) return;
    form.addEventListener("submit", async event => {
        event.preventDefault();
        const submitButton = form.querySelector(".form-submit");
        const leadData = getLeadFormData();
        const validation = validateLeadData(leadData);
        if (!validation.isValid) {
            showFormFeedback(validation.message, "error");
            highlightFields(validation.fields);
            return;
        }
        setFormLoading(true, submitButton);
        try {
            showFormFeedback("Preparando tu solicitud de experiencia...", "warning");
            const response = await submitLeadToGoogleSheets(leadData);
            if (response.status === "success") {
                showFormFeedback("Solicitud registrada. Abriendo WhatsApp para continuar la cotización...", "success");
                setTimeout(() => {
                    window.open(buildWhatsAppUrl(buildWhatsappMessage(leadData)), "_blank");
                    resetQuoteForm(form);
                    clearQuoteDraft();
                    updateExtrasByPackage();
                    initEventDateRules();
                    setFormLoading(false, submitButton);
                }, 750);
                return;
            }
            if (response.status === "duplicate") {
                showFormFeedback(
                    "Ya existe una solicitud con este WhatsApp para ese tipo de evento. Abriremos WhatsApp para darle seguimiento.",
                    "warning"
                );
                setTimeout(() => {
                    window.open(buildWhatsAppUrl(buildWhatsappMessage(leadData)), "_blank");
                    setFormLoading(false, submitButton);
                }, 950);
                return;
            }
            showFormFeedback(response.message || "No pudimos registrar la solicitud, pero puedes continuar por WhatsApp.", "error");
            setTimeout(() => {
                window.open(buildWhatsAppUrl(buildWhatsappMessage(leadData)), "_blank");
                setFormLoading(false, submitButton);
            }, 1200);
        } catch (error) {
            console.error("Error al registrar lead:", error);
            showFormFeedback("Hubo un detalle al guardar la solicitud, pero abriremos WhatsApp para continuar.", "error");
            setTimeout(() => {
                window.open(buildWhatsAppUrl(buildWhatsappMessage(leadData)), "_blank");
                setFormLoading(false, submitButton);
            }, 1200);
        }
    });
}

function getLeadFormData() {
    return {
        nombre: getInputValue("clientName"),
        whatsapp: normalizePhone(getInputValue("clientPhone")),
        correo: getInputValue("clientEmail"),
        tipoEvento: getInputValue("eventType"),
        fechaEvento: getInputValue("eventDate"),
        ciudadLugar: getInputValue("eventLocation"),
        paquete: getInputValue("packageType"),
        adicionales: getCheckedValues("extras"),
        coloresTematica: getInputValue("themeColors"),
        ideaEvento: getInputValue("eventIdea"),
        comoConocio: getInputValue("referralSource")
    };
}

function validateLeadData(data) {
    const missingFields = [];
    if (!data.nombre) missingFields.push("clientName");
    if (!data.whatsapp) missingFields.push("clientPhone");
    if (!data.tipoEvento) missingFields.push("eventType");
    if (!data.paquete) missingFields.push("packageType");
    if (missingFields.length) {
        return { isValid: false, fields: missingFields, message: "Completa nombre, WhatsApp, tipo de evento y nivel de experiencia de interés." };
    }
    if (!isValidName(data.nombre)) {
        return { isValid: false, fields: ["clientName"], message: "El nombre solo debe incluir letras y espacios." };
    }
    if (!/^\d{10}$/.test(data.whatsapp)) {
        return { isValid: false, fields: ["clientPhone"], message: "El WhatsApp debe tener exactamente 10 dígitos." };
    }
    if (data.fechaEvento && data.fechaEvento < getTodayISODate()) {
        return { isValid: false, fields: ["eventDate"], message: "La fecha del evento no puede ser anterior al día de hoy." };
    }
    return { isValid: true, fields: [], message: "" };
}

function submitLeadToGoogleSheets(data) {
    return new Promise((resolve, reject) => {
        const callbackName = `invyraLeadCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        const script = document.createElement("script");
        const params = new URLSearchParams({
            callback: callbackName,
            nombre: data.nombre,
            whatsapp: data.whatsapp,
            correo: data.correo,
            tipoEvento: data.tipoEvento,
            fechaEvento: data.fechaEvento,
            ciudadLugar: data.ciudadLugar,
            paquete: data.paquete,
            adicionales: data.adicionales,
            coloresTematica: data.coloresTematica,
            ideaEvento: data.ideaEvento,
            comoConocio: data.comoConocio
        });
        const timeout = window.setTimeout(() => {
            cleanup();
            reject(new Error("Tiempo de espera agotado al registrar la solicitud."));
        }, 12000);
        function cleanup() {
            window.clearTimeout(timeout);
            if (script.parentNode) script.parentNode.removeChild(script);
            try { delete window[callbackName]; } catch (error) { window[callbackName] = undefined; }
        }
        window[callbackName] = response => {
            cleanup();
            resolve(response);
        };
        script.onerror = () => {
            cleanup();
            reject(new Error("No se pudo conectar con Google Sheets."));
        };
        script.src = `${SCRIPT_URL}?${params.toString()}`;
        document.body.appendChild(script);
    });
}

function buildWhatsappMessage(data) {
    const formattedDate = formatDate(data.fechaEvento);
    return (
        `Hola INVYRA, quiero cotizar una experiencia digital.\n\n` +
        `*Solicitud:* Briefing inicial de cotización\n` +
        `*Nombre:* ${data.nombre || "No especificado"}\n` +
        `*WhatsApp:* ${data.whatsapp || "No especificado"}\n` +
        `*Correo:* ${data.correo || "No especificado"}\n` +
        `*Tipo de evento:* ${data.tipoEvento || "No especificado"}\n` +
        `*Fecha del evento:* ${formattedDate || "No definida"}\n` +
        `*Ciudad / zona:* ${data.ciudadLugar || "No especificado"}\n` +
        `*Nivel de experiencia de interés:* ${data.paquete || "No especificado"}\n` +
        `*Adicionales de interés:* ${data.adicionales || "No especificado"}\n` +
        `*Estilo visual / temática:* ${data.coloresTematica || "No definido"}\n` +
        `*Objetivo o idea del evento:* ${data.ideaEvento || "Sin detalles adicionales"}\n` +
        `*Cómo conocí INVYRA:* ${data.comoConocio || "No especificado"}\n\n` +
        `Me gustaría que me orienten para elegir la opción que mejor se adapte al evento.`
    );
}

function buildWhatsAppUrl(message) {
    return `https://wa.me/${INVYRA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getInputValue(id) {
    const input = document.getElementById(id);
    return input ? input.value.trim() : "";
}

function getCheckedValues(name) {
    const checkedInputs = document.querySelectorAll(`input[name="${name}"]:checked:not(:disabled)`);
    if (!checkedInputs.length) return "";
    return Array.from(checkedInputs).map(input => input.value.trim()).filter(Boolean).join(", ");
}

function normalizePhone(phone) {
    return phone.toString().trim().replace(/\D/g, "").slice(0, 10);
}

function isValidName(name) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(name.trim());
}

function toTitleCase(text) {
    return text.toLowerCase().split(" ").filter(Boolean).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function getTodayISODate() {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60000;
    const localDate = new Date(today.getTime() - timezoneOffset);
    return localDate.toISOString().split("T")[0];
}

function formatDate(dateValue) {
    if (!dateValue) return "";
    const [year, month, day] = dateValue.split("-");
    if (!year || !month || !day) return dateValue;
    return `${day}/${month}/${year}`;
}

function setFormLoading(isLoading, submitButton) {
    const form = document.getElementById("quote-form");
    if (!form || !submitButton) return;
    form.classList.toggle("is-submitting", isLoading);
    submitButton.disabled = isLoading;
    submitButton.classList.toggle("is-loading", isLoading);
    submitButton.textContent = isLoading ? "Enviando solicitud..." : "Solicitar orientación";
}

function resetQuoteForm(form) {
    if (!form) return;
    form.reset();
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
    feedback.classList.remove("success", "error", "warning");
    feedback.classList.add(type);
    if (type !== "warning") {
        setTimeout(() => {
            feedback.textContent = "";
            feedback.classList.remove("success", "error", "warning");
        }, 5200);
    }
}

function highlightFields(fieldIds) {
    const fields = fieldIds.map(id => document.getElementById(id)).filter(Boolean);
    fields.forEach(field => {
        field.classList.add("field-warning");
        setTimeout(() => field.classList.remove("field-warning"), 1800);
    });
}

function initWhatsappLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("nav-open");
        });
    });
}

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

function initKeyboardHelpers() {
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") document.body.classList.remove("nav-open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initFaqAccordion();
    initHeaderScrollState();
    initActiveNavLinks();
    initQuoteFormEnhancements();
    initQuoteFormAutosave();
    initQuoteForm();
    initWhatsappLinks();
    initImageFallbacks();
    initKeyboardHelpers();
    initAnimations();
});