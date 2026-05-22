/**
 * INVYRA - Bautizo Demo 01
 * Version 1.3.0
 * Signature Baptism Experience
 * Activity 13: Signature celestial motion upgrade + RSVP Google Sheets
 */

document.body.classList.add("js-enabled", "splash-active");

const RSVP_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwQfL0MtbBi-dyQO0zH9DwHX-_QSAgepdLJsIhGZEebvaXUoNVIT2fI3YJ0pUsQOBMI/exec";

const EVENT_NAME = "Bautizo de Mateo";
const RSVP_STORAGE_KEY = "invyra_bautizo_mateo_rsvp";
const RSVP_DRAFT_STORAGE_KEY = "invyra_bautizo_mateo_rsvp_draft";
const EVENT_DATE = new Date("2026-05-24T12:30:00").getTime();
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let experienceAlreadyOpened = false;

document.addEventListener("DOMContentLoaded", () => {
    initGsapRegistration();
    initCountdown();
    initScrollReveal();
    initAttendanceToggle();
    initRsvpAutosaveRestore();
    initImageFallbacks();
    initModalClose();
    initSignatureMotionPolish();
});

function initGsapRegistration() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }
}

function entrarExperiencia() {
    const splash = document.getElementById("splash-screen");
    const trigger = document.querySelector(".envelope-trigger");
    const startButton = document.querySelector(".btn-start-experience");
    const music = document.getElementById("bg-music");

    if (!splash || experienceAlreadyOpened) return;

    experienceAlreadyOpened = true;

    if (trigger) trigger.disabled = true;
    if (startButton) startButton.disabled = true;

    splash.classList.add("opening");
    playMusicSafely(music);

    if (prefersReducedMotion || typeof gsap === "undefined") {
        window.setTimeout(() => finalizeExperienceTransition(splash), 520);
        return;
    }

    const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => finalizeExperienceTransition(splash)
    });

    gsap.set([".envelope", ".envelope-flap", ".envelope-letter"], {
        transformPerspective: 1400,
        transformStyle: "preserve-3d"
    });

    tl
        .to([".splash-logo-img", ".splash-kicker", ".splash-copy", ".btn-start-experience"], {
            opacity: 0,
            y: 16,
            duration: 0.32,
            stagger: 0.035
        }, 0)
        .to(".envelope", {
            y: -8,
            scale: 1.018,
            duration: 0.42,
            ease: "power2.out"
        }, 0.06)
        .to(".envelope-seal", {
            opacity: 0,
            scale: 0.55,
            duration: 0.24
        }, 0.14)
        .to(".envelope-flap", {
            rotateX: -172,
            opacity: 0.82,
            duration: 0.68,
            ease: "power2.inOut"
        }, 0.24)
        .to(".envelope-letter", {
            opacity: 1,
            y: -72,
            scale: 1,
            duration: 0.6,
            ease: "power3.out"
        }, 0.58)
        .to([".splash-cathedral-glow", ".splash-arch-frame", ".splash-platinum-ring"], {
            opacity: 0.76,
            scale: 1.035,
            duration: 0.66,
            stagger: 0.04
        }, 0.42)
        .to(".envelope-stage", {
            y: 22,
            scale: 0.94,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.58,
            ease: "power3.in"
        }, 1.06)
        .to([".splash-clouds", ".splash-bg-glow", ".splash-cross", ".splash-water-drops", ".splash-dove-line", ".splash-platinum-ring", ".splash-arch-frame", ".splash-cathedral-glow"], {
            opacity: 0,
            scale: 1.08,
            filter: "blur(10px)",
            duration: 0.56,
            stagger: 0.02,
            ease: "power3.in"
        }, 1.15)
        .to(splash, {
            opacity: 0,
            duration: 0.34,
            pointerEvents: "none"
        }, 1.42);
}

function finalizeExperienceTransition(splash) {
    if (!splash) return;

    splash.classList.add("is-hidden");
    document.body.classList.remove("splash-active");
    document.body.classList.add("experience-opened");

    window.scrollTo({ top: 0, behavior: "auto" });
    revealHero();

    window.setTimeout(() => {
        splash.style.display = "none";
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    }, prefersReducedMotion ? 90 : 260);
}

function playMusicSafely(music) {
    if (!music) return;
    music.volume = 0;
    music.play().then(() => {
        if (typeof gsap !== "undefined" && !prefersReducedMotion) {
            gsap.to(music, { volume: 0.34, duration: 2.6, ease: "power1.inOut" });
        } else {
            music.volume = 0.34;
        }
    }).catch(() => {
        console.warn("La música no pudo iniciar automáticamente.");
    });
}

function revealHero() {
    const heroAtmosphere = document.querySelectorAll(".hero-atmosphere");

    if (prefersReducedMotion || typeof gsap === "undefined") {
        heroAtmosphere.forEach(element => { element.style.opacity = "1"; });
        document.querySelectorAll(".hero-section .reveal-item, .hero-section .reveal-title").forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.filter = "none";
        });
        return;
    }

    gsap.set(heroAtmosphere, { opacity: 0 });
    gsap.set(".brand-logo-img", { opacity: 0, y: 24, scale: 0.84, filter: "blur(10px)" });
    gsap.set(".hero-kicker", { opacity: 0, y: 22, filter: "blur(8px)" });
    gsap.set(".main-title", { opacity: 0, y: 48, scale: 0.9, filter: "blur(14px)" });
    gsap.set(".hero-script", { opacity: 0, y: 24, scale: 0.92, filter: "blur(10px)" });
    gsap.set(".hero-info-card", { opacity: 0, y: 30, scale: 0.96, filter: "blur(10px)" });

    const revealTL = gsap.timeline({ delay: 0.06, defaults: { ease: "power3.out", duration: 0.95 } });

    revealTL
        .to(heroAtmosphere, { opacity: 1, duration: 1.1, stagger: 0.04 })
        .to(".brand-logo-img", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, "-=0.82")
        .to(".hero-kicker", { opacity: 1, y: 0, filter: "blur(0px)" }, "-=0.72")
        .to(".main-title", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.08 }, "-=0.62")
        .to(".hero-script", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, "-=0.7")
        .to(".hero-info-card", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, "-=0.68");

    gsap.to(".hero-content", { y: -7, duration: 7.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-arch-frame", { scale: 1.025, opacity: 0.72, duration: 8.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".hero-water-shimmer", { y: -16, opacity: 0.78, duration: 7.6, repeat: -1, yoyo: true, ease: "sine.inOut" });

    if (typeof ScrollTrigger !== "undefined") {
        window.setTimeout(() => { ScrollTrigger.refresh(); }, 380);
    }
}

function initCountdown() {
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const mins = document.getElementById("mins");
    const secs = document.getElementById("secs");

    if (!days || !hours || !mins || !secs) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = EVENT_DATE - now;

        if (distance <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            mins.textContent = "00";
            secs.textContent = "00";
            return;
        }

        const totalDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        const totalHours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const totalMinutes = Math.floor((distance / (1000 * 60)) % 60);
        const totalSeconds = Math.floor((distance / 1000) % 60);

        days.textContent = String(totalDays).padStart(2, "0");
        hours.textContent = String(totalHours).padStart(2, "0");
        mins.textContent = String(totalMinutes).padStart(2, "0");
        secs.textContent = String(totalSeconds).padStart(2, "0");
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
}

function initScrollReveal() {
    const sections = Array.from(document.querySelectorAll(".section-reveal"));

    if (!sections.length) return;

    if (!prefersReducedMotion && typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        sections.forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: "top 86%",
                once: true,
                onEnter: () => revealBaptismSection(section)
            });
        });
        ScrollTrigger.refresh();
        return;
    }

    const sectionElements = document.querySelectorAll(".section-reveal, .event-card, .timeline-item, .gallery-item");

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
        sectionElements.forEach(showElement);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            showElement(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.14, rootMargin: "0px 0px -70px 0px" });

    sectionElements.forEach(element => observer.observe(element));
}

function revealBaptismSection(section) {
    if (!section || typeof gsap === "undefined") return;

    const tl = gsap.timeline();
    const label = section.querySelectorAll(".section-label, .quote-symbol, .rsvp-package-label");
    const titles = section.querySelectorAll(".section-title, .blessing-text, .dress-card h2, .gift-card h2, .rsvp-card h2");
    const copy = section.querySelectorAll(".section-copy, .rsvp-copy");
    const cards = section.querySelectorAll(".parents-card, .countdown-card, .event-card, .godparents-card, .timeline-card, .dress-card, .gift-card, .rsvp-card");
    const gallery = section.querySelectorAll(".gallery-item");
    const timelineItems = section.querySelectorAll(".timeline-item");
    const formItems = section.querySelectorAll(".rsvp-form > *");

    tl.to(section, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" })
      .fromTo(label, { opacity: 0, y: 14, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, stagger: 0.05, ease: "power2.out" }, "-=0.55")
      .fromTo(titles, { opacity: 0, y: 24, scale: 0.96, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.78, stagger: 0.06, ease: "power3.out" }, "-=0.42")
      .fromTo(copy, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.58, stagger: 0.04, ease: "power2.out" }, "-=0.45")
      .fromTo(cards, { opacity: 0, y: 32, scale: 0.965, filter: "blur(10px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.86, stagger: 0.08, ease: "power3.out" }, "-=0.42")
      .fromTo(timelineItems, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.06, ease: "power2.out" }, "-=0.5")
      .fromTo(gallery, { opacity: 0, y: 34, scale: 0.94, filter: "blur(12px)" }, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.82, stagger: 0.09, ease: "power3.out" }, "-=0.48")
      .fromTo(formItems, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.48, stagger: 0.04, ease: "power2.out" }, "-=0.5");
}

function showElement(element) {
    if (!element) return;

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.to(element, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out"
        });
        return;
    }

    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.filter = "none";
}

function initAttendanceToggle() {
    const radios = document.querySelectorAll('input[name="asistencia"]');
    const rsvpCard = document.querySelector(".rsvp-card");
    const detalleGroup = document.getElementById("detalleAsistenciaGroup");
    const acompanantesGroup = document.getElementById("acompanantesGroup");

    if (!radios.length) return;

    function updateAttendanceFields() {
        const selected = document.querySelector('input[name="asistencia"]:checked');
        const selectedValue = selected ? selected.value : "";
        const willAttend =
            selectedValue === "Asistiré" || selectedValue === "Sí asistiré";

        if (detalleGroup) {
            detalleGroup.style.display = willAttend ? "grid" : "none";
            detalleGroup.classList.toggle("is-disabled", !willAttend);
        }

        if (acompanantesGroup) {
            acompanantesGroup.style.display = willAttend ? "grid" : "none";
            acompanantesGroup.classList.toggle("is-disabled", !willAttend);
        }

        if (rsvpCard) {
            rsvpCard.classList.toggle("rsvp-not-attending", !willAttend);
        }
    }

    radios.forEach(radio => {
        radio.addEventListener("change", updateAttendanceFields);
    });

    updateAttendanceFields();
}

/* RSVP AUTOSAVE / RESTORE */

function initRsvpAutosaveRestore() {
    restoreRsvpDraft();

    const fields = getRsvpDraftFields();
    const radios = document.querySelectorAll('input[name="asistencia"]');

    fields.forEach(field => {
        if (!field) return;
        field.addEventListener("input", saveRsvpDraft);
        field.addEventListener("change", saveRsvpDraft);
    });

    radios.forEach(radio => {
        radio.addEventListener("change", saveRsvpDraft);
    });

    window.addEventListener("pagehide", saveRsvpDraft);
    window.addEventListener("beforeunload", saveRsvpDraft);
}

function getRsvpDraftFields() {
    return [
        document.getElementById("nombreInvitado"),
        document.getElementById("detalleAsistenciaInvitado"),
        document.getElementById("acompanantesInvitado"),
        document.getElementById("mensajeInvitado")
    ];
}

function getRsvpDraftData() {
    const nombreInput = document.getElementById("nombreInvitado");
    const detalleInput = document.getElementById("detalleAsistenciaInvitado");
    const acompanantesInput = document.getElementById("acompanantesInvitado");
    const mensajeInput = document.getElementById("mensajeInvitado");
    const asistenciaInput = document.querySelector('input[name="asistencia"]:checked');

    return {
        nombre: nombreInput ? nombreInput.value : "",
        asistencia: asistenciaInput ? asistenciaInput.value : "Asistiré",
        detalle: detalleInput ? detalleInput.value : "",
        acompanantes: acompanantesInput ? acompanantesInput.value : "",
        mensaje: mensajeInput ? mensajeInput.value : "",
        updatedAt: new Date().toISOString()
    };
}

function saveRsvpDraft() {
    const draft = getRsvpDraftData();
    const hasContent =
        cleanText(draft.nombre) ||
        cleanText(draft.mensaje) ||
        cleanText(draft.detalle) ||
        cleanText(draft.acompanantes) ||
        draft.asistencia !== "Asistiré";

    try {
        if (!hasContent) {
            localStorage.removeItem(RSVP_DRAFT_STORAGE_KEY);
            return;
        }

        localStorage.setItem(RSVP_DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
        console.warn("No se pudo guardar el borrador RSVP:", error);
    }
}

function restoreRsvpDraft() {
    let draft = null;

    try {
        draft = JSON.parse(localStorage.getItem(RSVP_DRAFT_STORAGE_KEY) || "null");
    } catch (error) {
        localStorage.removeItem(RSVP_DRAFT_STORAGE_KEY);
        return;
    }

    if (!draft) return;

    const nombreInput = document.getElementById("nombreInvitado");
    const detalleInput = document.getElementById("detalleAsistenciaInvitado");
    const acompanantesInput = document.getElementById("acompanantesInvitado");
    const mensajeInput = document.getElementById("mensajeInvitado");
    const asistenciaInput = Array.from(
        document.querySelectorAll('input[name="asistencia"]')
    ).find(radio => radio.value === (draft.asistencia || "Asistiré"));

    if (nombreInput && draft.nombre) nombreInput.value = draft.nombre;
    if (detalleInput && draft.detalle) detalleInput.value = draft.detalle;
    if (acompanantesInput && draft.acompanantes) acompanantesInput.value = draft.acompanantes;
    if (mensajeInput && draft.mensaje) mensajeInput.value = draft.mensaje;

    if (asistenciaInput) {
        asistenciaInput.checked = true;
        asistenciaInput.dispatchEvent(new Event("change"));
    }
}

function clearRsvpDraft() {
    try {
        localStorage.removeItem(RSVP_DRAFT_STORAGE_KEY);
    } catch (error) {
        console.warn("No se pudo limpiar el borrador RSVP:", error);
    }
}

function confirmarAsistencia() {
    const button = document.getElementById("btn-confirmar");
    const nombreInput = document.getElementById("nombreInvitado");
    const asistenciaInput = document.querySelector('input[name="asistencia"]:checked');
    const detalleInput = document.getElementById("detalleAsistenciaInvitado");
    const acompanantesInput = document.getElementById("acompanantesInvitado");
    const mensajeInput = document.getElementById("mensajeInvitado");

    const nombre = nombreInput ? cleanText(nombreInput.value) : "";
    const asistenciaRaw = asistenciaInput ? cleanText(asistenciaInput.value) : "";
    const asistencia = normalizeAttendanceForAppsScript(asistenciaRaw);
    const detalle = detalleInput ? cleanText(detalleInput.value) : "";
    const acompanantesRaw = acompanantesInput ? cleanText(acompanantesInput.value) : "";
    const acompanantes = normalizeGuestsForAppsScript(acompanantesRaw);
    const mensaje = mensajeInput ? cleanText(mensajeInput.value) : "";

    if (!nombre) {
        showModal("Falta tu nombre", "Escribe el nombre del invitado o familia para registrar la confirmación.");
        highlightField(nombreInput);
        return;
    }

    if (!isValidName(nombre)) {
        showModal("Revisa el nombre", "El nombre solo debe incluir letras y espacios.");
        highlightField(nombreInput);
        return;
    }

    if (!asistencia) {
        showModal("Selecciona tu asistencia", "Indica si podrás acompañarnos en este día especial.");
        return;
    }

    const finalMessage = buildFinalMessage({
        asistencia,
        detalle,
        acompanantes,
        mensaje
    });

    const rsvpData = {
        nombre,
        asistencia,
        acompanantes: asistencia === "Sí asistiré" ? acompanantes : "0",
        mensaje: finalMessage,
        evento: EVENT_NAME
    };

    setButtonLoading(button, true);

    submitRsvpToGoogleSheets(rsvpData)
        .then(response => {
            setButtonLoading(button, false);

            if (response.status === "success") {
                localStorage.setItem(RSVP_STORAGE_KEY, "true");
                clearRsvpDraft();
                showModal("¡Respuesta registrada!", "Gracias por confirmar. Tu respuesta quedó guardada correctamente.");
                resetRsvpFields();
                return;
            }

            if (response.status === "duplicate") {
                showModal("Confirmación ya registrada", "Ya existe una respuesta con ese nombre para este evento. Si necesitas ajustar algo, puedes avisar directamente a los anfitriones.");
                return;
            }

            showModal("No se pudo registrar", response.message || "Hubo un detalle al guardar tu respuesta. Inténtalo nuevamente.");
        })
        .catch(error => {
            console.error("Error RSVP:", error);
            setButtonLoading(button, false);
            showModal("Error de conexión", "No pudimos guardar tu confirmación. Revisa tu conexión e inténtalo nuevamente.");
        });
}

function submitRsvpToGoogleSheets(data) {
    return new Promise((resolve, reject) => {
        const callbackName = `invyraBautizoCallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
        const script = document.createElement("script");

        const params = new URLSearchParams({
            callback: callbackName,
            nombre: data.nombre,
            asistencia: data.asistencia,
            acompanantes: data.acompanantes,
            mensaje: data.mensaje,
            evento: data.evento
        });

        const timeout = window.setTimeout(() => {
            cleanup();
            reject(new Error("Tiempo de espera agotado."));
        }, 12000);

        function cleanup() {
            window.clearTimeout(timeout);

            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }

            try {
                delete window[callbackName];
            } catch (error) {
                window[callbackName] = undefined;
            }
        }

        window[callbackName] = response => {
            cleanup();
            resolve(response || {
                status: "error",
                message: "Respuesta vacía del servidor."
            });
        };

        script.onerror = () => {
            cleanup();
            reject(new Error("No se pudo conectar con Google Sheets."));
        };

        script.src = `${RSVP_SCRIPT_URL}?${params.toString()}`;
        document.body.appendChild(script);
    });
}

function showModal(title, message) {
    const modal = document.getElementById("rsvp-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");

    if (!modal || !modalTitle || !modalMessage) {
        alert(`${title}\n\n${message}`);
        return;
    }

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.remove("hidden");

    window.clearTimeout(showModal.timeout);
    showModal.timeout = window.setTimeout(() => {
        modal.classList.add("hidden");
    }, 4200);
}

function initModalClose() {
    const modal = document.getElementById("rsvp-modal");
    if (!modal) return;

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.add("hidden");
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            modal.classList.add("hidden");
        }
    });
}

function normalizeAttendanceForAppsScript(value) {
    const normalized = cleanText(value).toLowerCase();

    if (
        normalized === "asistiré" ||
        normalized === "asistire" ||
        normalized === "sí asistiré" ||
        normalized === "si asistire"
    ) {
        return "Sí asistiré";
    }

    if (
        normalized === "no asistiré" ||
        normalized === "no asistire" ||
        normalized === "no podré asistir" ||
        normalized === "no podre asistir"
    ) {
        return "No podré asistir";
    }

    if (normalized === "tal vez") {
        return "Tal vez";
    }

    return "";
}

function normalizeGuestsForAppsScript(value) {
    const digits = String(value || "").replace(/\D/g, "");
    if (!digits) return "0";
    return String(Math.min(Number(digits), 99));
}

function buildFinalMessage(data) {
    if (data.asistencia === "No podré asistir") {
        return data.mensaje || "No podré asistir, pero envío mis mejores deseos.";
    }

    const parts = [
        data.detalle ? `Confirmación: ${data.detalle}` : "",
        data.acompanantes ? `Acompañantes: ${data.acompanantes}` : "",
        data.mensaje ? `Mensaje: ${data.mensaje}` : ""
    ];

    return parts.filter(Boolean).join(" | ") || "Sin mensaje adicional.";
}

function resetRsvpFields() {
    const nombreInput = document.getElementById("nombreInvitado");
    const mensajeInput = document.getElementById("mensajeInvitado");
    const detalleInput = document.getElementById("detalleAsistenciaInvitado");
    const acompanantesInput = document.getElementById("acompanantesInvitado");
    const asistirRadio =
        document.querySelector('input[name="asistencia"][value="Asistiré"]') ||
        document.querySelector('input[name="asistencia"][value="Sí asistiré"]');

    if (nombreInput) nombreInput.value = "";
    if (mensajeInput) mensajeInput.value = "";
    if (detalleInput) detalleInput.selectedIndex = 0;
    if (acompanantesInput) acompanantesInput.selectedIndex = 0;

    if (asistirRadio) {
        asistirRadio.checked = true;
        asistirRadio.dispatchEvent(new Event("change"));
    }

    initAttendanceToggle();
}

function setButtonLoading(button, isLoading) {
    if (!button) return;
    button.disabled = isLoading;
    button.classList.toggle("is-loading", isLoading);
    button.textContent = isLoading ? "Enviando..." : "Confirmar asistencia";
}

function cleanText(value) {
    return String(value || "").trim().replace(/\s+/g, " ");
}

function isValidName(value) {
    return /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(value.trim());
}

function highlightField(field) {
    if (!field) return;

    field.classList.add("field-warning");

    window.setTimeout(() => {
        field.classList.remove("field-warning");
    }, 1800);
}

function initImageFallbacks() {
    const images = document.querySelectorAll("img");

    images.forEach(image => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");
            console.warn("No se pudo cargar la imagen:", image.src);
        });
    });
}


function initSignatureMotionPolish() {
    if (prefersReducedMotion || typeof gsap === "undefined") return;

    gsap.utils.toArray(".gallery-item").forEach(item => {
        if (typeof ScrollTrigger === "undefined") return;
        gsap.to(item, {
            backgroundPosition: "50% 42%",
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8
            }
        });
    });

    gsap.utils.toArray(".event-card, .godparents-card, .dress-card, .gift-card, .rsvp-card").forEach(card => {
        card.addEventListener("pointermove", event => {
            const rect = card.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width - 0.5) * 7;
            const y = ((event.clientY - rect.top) / rect.height - 0.5) * -7;
            gsap.to(card, { rotateX: y, rotateY: x, duration: 0.35, ease: "power2.out" });
        });

        card.addEventListener("pointerleave", () => {
            gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.45, ease: "power2.out" });
        });
    });
}

/* AUDIO VISIBILITY CONTROL */

document.addEventListener("visibilitychange", () => {
    const music = document.getElementById("bg-music");
    const splash = document.getElementById("splash-screen");

    if (!music) return;

    if (document.hidden) {
        music.pause();
        return;
    }

    const experienceIsOpen =
        document.body.classList.contains("experience-opened") ||
        (splash && splash.style.display === "none");

    if (experienceIsOpen) {
        music.play().catch(error => {
            console.warn("No se pudo reanudar la música:", error);
        });
    }
});
