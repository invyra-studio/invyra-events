/**
 * INVYRA - Wedding Legacy Demo 02
 * Version 2.0.0
 * Server-side RSVP validation through Google Sheets / Apps Script
 * Update: Activity 14 Legacy RSVP microinteractions, autosave/restore and server-side duplicate validation
 */

document.body.classList.add("js-enabled", "splash-active");

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzW977LTZkwhYL5oXAaTbixYbCVHOtIGyMFz80uZw7HNpKNVdHtRUmooUm0941D1LZR/exec";

const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Feb 14, 2027 17:30:00";
const EVENTO_NOMBRE = "Boda Aurora & Matteo";
const RSVP_STORAGE_KEY = "invyra_wedding_aurora_matteo_rsvp_v2";
const RSVP_DRAFT_STORAGE_KEY = `${RSVP_STORAGE_KEY}_draft`;
let rsvpSubmissionCompleted = false;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let experienceAlreadyOpened = false;
let countdownInterval = null;

/* ==============================
   INIT
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
    initGsapRegistration();
    initStartExperience();
    initCountdown();
    initRsvpState();
    initRsvpMicrointeractions();
    initRsvpDraftAutosave();
    initModalClose();
    initImageFallbacks();
    initGalleryLightbox();
    initLegacyPremiumMotion();
});

function initGsapRegistration() {
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);
    }
}

/* ==============================
   SPLASH → HERO
   ============================== */

function initStartExperience() {
    const startButton = document.querySelector(".btn-start-experience");

    if (startButton) {
        startButton.addEventListener("click", entrarExperiencia);
    }
}

function entrarExperiencia() {
    const splash = document.getElementById("splash-screen");
    const startButton = document.querySelector(".btn-start-experience");
    const music = document.getElementById("bg-music");

    if (!splash || experienceAlreadyOpened) return;

    experienceAlreadyOpened = true;

    if (startButton) {
        startButton.disabled = true;
    }

    splash.classList.add("opening");

    playMusicSafely(music);

    const splashDuration = prefersReducedMotion ? 450 : 1650;

    window.setTimeout(() => {
        splash.classList.add("is-hidden");

        document.body.classList.remove("splash-active");
        document.body.classList.add("experience-opened");

        window.scrollTo({
            top: 0,
            behavior: "auto"
        });

        revealHero();
        initScrollReveal();

        window.setTimeout(() => {
            splash.style.display = "none";

            if (typeof ScrollTrigger !== "undefined") {
                ScrollTrigger.refresh();
            }
        }, prefersReducedMotion ? 80 : 720);
    }, splashDuration);
}

function playMusicSafely(music) {
    if (!music) return;

    music.volume = 0;

    music.play().then(() => {
        if (typeof gsap !== "undefined" && !prefersReducedMotion) {
            gsap.to(music, {
                volume: 0.34,
                duration: 3.2,
                ease: "power1.inOut"
            });
        } else {
            music.volume = 0.34;
        }
    }).catch(error => {
        console.warn("La música requiere interacción del usuario:", error);
    });
}

window.entrarExperiencia = entrarExperiencia;

/* ==============================
   HERO REVEAL
   ============================== */

function revealHero() {
    const heroAtmosphere = document.querySelectorAll(".hero-atmosphere");
    const heroItems = document.querySelectorAll(
        ".brand-logo-img, .hero-kicker, .pre-title, .reveal-title, .hero-info-card"
    );

    if (prefersReducedMotion || typeof gsap === "undefined") {
        heroAtmosphere.forEach(showElement);
        heroItems.forEach(showElement);
        return;
    }

    const revealTL = gsap.timeline({
        delay: 0.12,
        defaults: {
            ease: "power3.out",
            duration: 1.15
        }
    });

    revealTL
        .to(heroAtmosphere, {
            opacity: 1,
            duration: 1.35,
            stagger: 0.05
        })
        .to(".brand-logo-img", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.95")
        .to(".hero-kicker", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.8")
        .to(".pre-title", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.75")
        .to(".reveal-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.45
        }, "-=0.75")
        .to(".hero-info-card", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.95");

    gsap.to(".hero-content", {
        y: -6,
        duration: 6.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".legacy-hero-frame", {
        scale: 1.025,
        opacity: 0.86,
        duration: 7.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

/* ==============================
   SCROLL REVEAL
   ============================== */

function initScrollReveal() {
    const sections = document.querySelectorAll(".section-reveal");

    if (!sections.length) return;

    if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        sections.forEach(showElement);
        return;
    }

    sections.forEach(section => {
        gsap.fromTo(section,
            {
                opacity: 0,
                y: 55
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power3.out"
            }
        );
    });

    ScrollTrigger.refresh();
}

function showElement(element) {
    if (!element) return;

    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.filter = "none";
}

/* ==============================
   COUNTDOWN
   ============================== */

function initCountdown() {
    const targetDate = new Date(FECHA_EVENTO).getTime();

    function updateCountdown() {
        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const mins = document.getElementById("mins");
        const secs = document.getElementById("secs");

        if (!days || !hours || !mins || !secs) return;

        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            mins.textContent = "00";
            secs.textContent = "00";

            if (countdownInterval) {
                window.clearInterval(countdownInterval);
            }

            return;
        }

        days.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
        hours.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        mins.textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        secs.textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
    }

    updateCountdown();
    countdownInterval = window.setInterval(updateCountdown, 1000);
}

/* ==============================
   RSVP STATE
   ============================== */

function initRsvpState() {
    const radios = document.querySelectorAll('input[name="asistencia"]');

    radios.forEach(radio => {
        radio.addEventListener("change", actualizarEstadoAsistencia);
    });

    actualizarEstadoAsistencia();
}

function actualizarEstadoAsistencia() {
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const detalleAsistencia = document.getElementById("detalleAsistenciaInvitado");
    const menuInvitado = document.getElementById("menuInvitado");
    const detalleGroup = document.getElementById("detalleAsistenciaGroup");
    const menuGroup = document.getElementById("menuInvitadoGroup");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const rsvpCard = document.querySelector(".rsvp-card");
    const liveMessage = document.getElementById("rsvp-live-message");

    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";
    const noAsiste = asistencia === "No asistiré";

    if (detalleAsistencia) {
        detalleAsistencia.disabled = noAsiste;
        if (noAsiste) detalleAsistencia.value = "Ceremonia y recepción";
    }

    if (menuInvitado) {
        menuInvitado.disabled = noAsiste;
        if (noAsiste) menuInvitado.value = "Sin preferencia";
    }

    [detalleGroup, menuGroup].forEach(group => {
        if (!group) return;
        group.classList.toggle("is-disabled", noAsiste);
        group.classList.toggle("is-collapsed", noAsiste);
        group.setAttribute("aria-hidden", noAsiste ? "true" : "false");
    });

    if (rsvpCard) {
        rsvpCard.classList.toggle("rsvp-not-attending", noAsiste);
        rsvpCard.classList.add("rsvp-state-pulse");
        window.setTimeout(() => rsvpCard.classList.remove("rsvp-state-pulse"), 420);
    }

    if (liveMessage) {
        liveMessage.textContent = noAsiste
            ? "Gracias por avisarnos. Puedes enviar tu respuesta sin completar menú ni asistencia al evento."
            : "Perfecto, prepararemos tu confirmación para ceremonia, recepción y preferencia de menú.";
    }

    if (btnConfirmar && !btnConfirmar.disabled) {
        btnConfirmar.textContent = noAsiste ? "Enviar respuesta" : "Confirmar asistencia";
    }
}

function initRsvpMicrointeractions() {
    const fields = [
        document.getElementById("nombreInvitado"),
        document.getElementById("mensajeInvitado"),
        document.getElementById("detalleAsistenciaInvitado"),
        document.getElementById("menuInvitado")
    ].filter(Boolean);

    fields.forEach(field => {
        const updateFieldState = () => {
            field.classList.toggle("has-value", cleanText(field.value).length > 0);
        };

        field.addEventListener("input", updateFieldState);
        field.addEventListener("change", updateFieldState);
        field.addEventListener("focus", () => field.classList.add("is-focused"));
        field.addEventListener("blur", () => field.classList.remove("is-focused"));
        updateFieldState();
    });
}

/* ==============================
   RSVP SUBMIT
   ============================== */

async function confirmarAsistencia() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const detalleAsistenciaInput = document.getElementById("detalleAsistenciaInvitado");
    const menuInput = document.getElementById("menuInvitado");
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const btnConfirmar = document.getElementById("btn-confirmar");

    if (!inputNombre || !inputMensaje || !btnConfirmar) return;

    const nombre = cleanText(inputNombre.value);
    const mensajeInvitado = cleanText(inputMensaje.value);
    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";

    const detalleAsistencia = asistencia === "No asistiré"
        ? "No aplica"
        : detalleAsistenciaInput
            ? cleanText(detalleAsistenciaInput.value)
            : "Ceremonia y recepción";

    const menu = asistencia === "No asistiré"
        ? "No aplica"
        : menuInput
            ? cleanText(menuInput.value)
            : "Sin preferencia";

    if (!nombre) {
        setModalContent(
            "FALTA TU NOMBRE",
            "Escribe el nombre del invitado o familia para registrar la confirmación."
        );
        showModal();
        marcarCampoInvalido(inputNombre);
        hideModal(3200);
        return;
    }

    setButtonLoading(btnConfirmar, true);

    try {
        const response = await sendRsvpToAppsScript({
            nombre,
            asistencia,
            mensaje: mensajeInvitado,
            evento: EVENTO_NOMBRE,
            detalleAsistencia,
            menu
        });

        setButtonLoading(btnConfirmar, false);

        if (response && response.status === "duplicate") {
            setModalContent(
                "ASISTENCIA YA REGISTRADA",
                "Ya tenemos una respuesta asociada a este nombre y evento. Puedes corregir el nombre o confirmar con los anfitriones."
            );

            showModal();
            hideModal(5200);

            btnConfirmar.disabled = false;
            btnConfirmar.classList.remove("is-loading");
            btnConfirmar.textContent = asistencia === "No asistiré" ? "Enviar respuesta" : "Confirmar asistencia";

            return;
        }

        if (response && response.status === "success") {
            rsvpSubmissionCompleted = true;
            clearRsvpDraft();

            setModalContent(
                "¡RESPUESTA REGISTRADA!",
                "Gracias por confirmar. En un momento abriremos WhatsApp para completar tu mensaje."
            );

            showModal();

            btnConfirmar.textContent = "¡Todo listo!";

            const mensajeWhatsApp = encodeURIComponent(
                `¡Hola! Confirmo mi respuesta para la boda de Aurora & Matteo.\n\n` +
                `*Invitado:* ${nombre}\n` +
                `*Asistencia:* ${asistencia}\n` +
                `*Confirmación para:* ${detalleAsistencia}\n` +
                `*Preferencia de menú:* ${menu}\n` +
                `*Mensaje:* ${mensajeInvitado || "Sin mensaje"}`
            );

            window.setTimeout(() => {
                window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");
                hideModal(0);
                resetRsvpForm();
                rsvpSubmissionCompleted = false;
            }, 3200);

            return;
        }

        throw new Error(response && response.message ? response.message : "Respuesta inesperada de Apps Script.");
    } catch (error) {
        console.error("Error RSVP:", error);

        setModalContent(
            "NO SE PUDO REGISTRAR",
            "Ocurrió un detalle al guardar tu respuesta. Inténtalo nuevamente en unos segundos."
        );

        showModal();

        btnConfirmar.disabled = false;
        btnConfirmar.classList.remove("is-loading");
        btnConfirmar.textContent = asistencia === "No asistiré" ? "Enviar respuesta" : "Confirmar asistencia";

        hideModal(3600);
    }
}

function sendRsvpToAppsScript(data) {
    return new Promise((resolve, reject) => {
        const callbackName = `invyraCallback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const script = document.createElement("script");

        const timeout = window.setTimeout(() => {
            cleanup();
            reject(new Error("Tiempo de espera agotado al conectar con Apps Script."));
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

        const params = new URLSearchParams({
            callback: callbackName,
            nombre: data.nombre,
            asistencia: data.asistencia,
            mensaje: data.mensaje,
            evento: data.evento,
            detalleAsistencia: data.detalleAsistencia,
            menu: data.menu
        });

        script.onerror = () => {
            cleanup();
            reject(new Error("No se pudo conectar con Apps Script."));
        };

        script.src = `${SCRIPT_URL}?${params.toString()}`;
        document.body.appendChild(script);
    });
}

window.confirmarAsistencia = confirmarAsistencia;

/* ==============================
   MODAL
   ============================== */

function setModalContent(title, message) {
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");

    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.textContent = message;
}

function showModal() {
    const modal = document.getElementById("rsvp-modal");

    if (!modal) return;

    modal.classList.remove("hidden");

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.from(".modal-content", {
            opacity: 0,
            scale: 0.86,
            duration: 0.42,
            ease: "back.out(1.7)"
        });
    }
}

function hideModal(delay = 2800) {
    const modal = document.getElementById("rsvp-modal");

    if (!modal) return;

    window.setTimeout(() => {
        modal.classList.add("hidden");
    }, delay);
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


/* ==============================
   RSVP AUTOSAVE / RESTORE
   ============================== */

function initRsvpDraftAutosave() {
    const fields = getRsvpDraftFields();

    if (!fields.nombre || !fields.mensaje) return;

    restoreRsvpDraft();

    const elementsToWatch = [
        fields.nombre,
        fields.mensaje,
        fields.detalleAsistencia,
        fields.menuInvitado,
        ...document.querySelectorAll('input[name="asistencia"]')
    ].filter(Boolean);

    elementsToWatch.forEach(element => {
        element.addEventListener("input", saveRsvpDraft);
        element.addEventListener("change", saveRsvpDraft);
    });

    window.addEventListener("pagehide", saveRsvpDraft);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            saveRsvpDraft();
        }
    });
}

function getRsvpDraftFields() {
    return {
        nombre: document.getElementById("nombreInvitado"),
        mensaje: document.getElementById("mensajeInvitado"),
        detalleAsistencia: document.getElementById("detalleAsistenciaInvitado"),
        menuInvitado: document.getElementById("menuInvitado")
    };
}

function getCurrentRsvpDraftData() {
    const fields = getRsvpDraftFields();
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');

    return {
        nombre: fields.nombre ? fields.nombre.value : "",
        mensaje: fields.mensaje ? fields.mensaje.value : "",
        asistencia: asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré",
        detalleAsistencia: fields.detalleAsistencia ? fields.detalleAsistencia.value : "Ceremonia y recepción",
        menu: fields.menuInvitado ? fields.menuInvitado.value : "Sin preferencia",
        updatedAt: new Date().toISOString()
    };
}

function saveRsvpDraft() {
    if (rsvpSubmissionCompleted) {
        clearRsvpDraft();
        return;
    }

    const draft = getCurrentRsvpDraftData();
    const isEmptyDraft =
        !cleanText(draft.nombre) &&
        !cleanText(draft.mensaje) &&
        draft.asistencia === "Asistiré" &&
        draft.detalleAsistencia === "Ceremonia y recepción" &&
        draft.menu === "Sin preferencia";

    if (isEmptyDraft) {
        clearRsvpDraft();
        return;
    }

    try {
        localStorage.setItem(RSVP_DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
        console.warn("No se pudo guardar el borrador RSVP:", error);
    }
}

function restoreRsvpDraft() {
    try {
        localStorage.removeItem(RSVP_STORAGE_KEY);
    } catch (error) {
        console.warn("No se pudo limpiar estado local heredado de RSVP:", error);
    }

    let draft = null;

    try {
        draft = JSON.parse(localStorage.getItem(RSVP_DRAFT_STORAGE_KEY) || "null");
    } catch (error) {
        clearRsvpDraft();
        return;
    }

    if (!draft) return;

    const fields = getRsvpDraftFields();

    if (fields.nombre && typeof draft.nombre === "string") {
        fields.nombre.value = draft.nombre;
    }

    if (fields.mensaje && typeof draft.mensaje === "string") {
        fields.mensaje.value = draft.mensaje;
    }

    const radioToRestore = Array.from(document.querySelectorAll('input[name="asistencia"]'))
        .find(radio => radio.value === (draft.asistencia || "Asistiré"));

    if (radioToRestore) {
        radioToRestore.checked = true;
    }

    if (fields.detalleAsistencia && draft.detalleAsistencia) {
        fields.detalleAsistencia.value = draft.detalleAsistencia;
    }

    if (fields.menuInvitado && draft.menu) {
        fields.menuInvitado.value = draft.menu;
    }

    actualizarEstadoAsistencia();
}

function clearRsvpDraft() {
    try {
        localStorage.removeItem(RSVP_DRAFT_STORAGE_KEY);
    } catch (error) {
        console.warn("No se pudo limpiar el borrador RSVP:", error);
    }
}

/* ==============================
   HELPERS
   ============================== */

function resetRsvpForm() {
    const fields = getRsvpDraftFields();
    const asistenciaSi = document.querySelector('input[name="asistencia"][value="Asistiré"]');
    const btnConfirmar = document.getElementById("btn-confirmar");

    if (fields.nombre) fields.nombre.value = "";
    if (fields.mensaje) fields.mensaje.value = "";
    if (fields.detalleAsistencia) fields.detalleAsistencia.value = "Ceremonia y recepción";
    if (fields.menuInvitado) fields.menuInvitado.value = "Sin preferencia";
    if (asistenciaSi) asistenciaSi.checked = true;

    document.querySelectorAll('input[name="asistencia"]').forEach(radio => {
        radio.disabled = false;
    });

    Object.values(fields).forEach(field => {
        if (!field) return;
        field.disabled = false;
        field.classList.remove("has-value", "is-focused", "field-warning");
    });

    if (btnConfirmar) {
        btnConfirmar.disabled = false;
        btnConfirmar.classList.remove("is-loading");
        btnConfirmar.textContent = "Confirmar asistencia";
    }

    clearRsvpDraft();
    actualizarEstadoAsistencia();
}

function bloquearFormularioComoRegistrado() {
    const fields = [
        document.getElementById("nombreInvitado"),
        document.getElementById("mensajeInvitado"),
        document.getElementById("detalleAsistenciaInvitado"),
        document.getElementById("menuInvitado")
    ];

    const btnConfirmar = document.getElementById("btn-confirmar");
    const radios = document.querySelectorAll('input[name="asistencia"]');

    fields.forEach(field => {
        if (field) field.disabled = true;
    });

    radios.forEach(radio => {
        radio.disabled = true;
    });

    if (btnConfirmar) {
        btnConfirmar.textContent = "Asistencia ya registrada";
        btnConfirmar.disabled = true;
        btnConfirmar.classList.remove("is-loading");
    }
}

function setButtonLoading(button, isLoading) {
    if (!button) return;

    button.disabled = isLoading;
    button.classList.toggle("is-loading", isLoading);
    button.textContent = isLoading ? "Guardando respuesta..." : "Confirmar asistencia";
}

function marcarCampoInvalido(campo) {
    if (!campo) return;

    campo.classList.add("field-warning");
    campo.style.borderColor = "#b65b5b";

    window.setTimeout(() => {
        campo.classList.remove("field-warning");
        campo.style.borderColor = "";
    }, 1800);
}

function cleanText(value) {
    return String(value || "")
        .trim()
        .replace(/\s+/g, " ");
}

function initImageFallbacks() {
    const images = document.querySelectorAll("img");

    images.forEach(image => {
        image.addEventListener("error", () => {
            const fallbackSrc = image.dataset.fallbackSrc || getAlternativeImagePath(image.getAttribute("src"));

            if (fallbackSrc && image.dataset.fallbackTried !== "true") {
                image.dataset.fallbackTried = "true";
                image.src = fallbackSrc;
                return;
            }

            image.classList.add("image-error");
            console.warn("No se pudo cargar la imagen:", image.src);
        });
    });

    initGalleryBackgroundFallbacks();
}

function getAlternativeImagePath(src) {
    if (!src) return "";

    const cleanSrc = String(src).trim();
    const fileName = cleanSrc.split("/").pop().split("?")[0];

    if (cleanSrc.includes("/assets/") && fileName) {
        const baseName = fileName.replace(/\.(jpeg|jpg)$/i, "");
        const currentExtension = fileName.match(/\.(jpeg|jpg)$/i);
        const alternateExtension = currentExtension && currentExtension[1].toLowerCase() === "jpeg" ? "jpg" : "jpeg";
        return `./assets/${baseName}.${alternateExtension}`;
    }

    if (/\.jpeg(\?.*)?$/i.test(cleanSrc)) return cleanSrc.replace(/\.jpeg(\?.*)?$/i, ".jpg");
    if (/\.jpg(\?.*)?$/i.test(cleanSrc)) return cleanSrc.replace(/\.jpg(\?.*)?$/i, ".jpeg");

    return "";
}

function initGalleryBackgroundFallbacks() {
    const galleryItems = document.querySelectorAll(".gallery-item[data-bg-base]");

    galleryItems.forEach(item => {
        const baseName = item.dataset.bgBase;

        if (!baseName) return;

        const candidates = [
            `./assets/${baseName}.jpeg`,
            `./assets/${baseName}.jpg`,
            `../wedding-demo-02/assets/${baseName}.jpeg`,
            `../wedding-demo-02/assets/${baseName}.jpg`,
            `../wedding-demo-01/assets/${baseName}.jpeg`,
            `../wedding-demo-01/assets/${baseName}.jpg`
        ];

        findFirstLoadableImage(candidates).then(src => {
            if (src) {
                item.style.backgroundImage = `url("${src}")`;
            }
        });
    });
}

function findFirstLoadableImage(candidates) {
    return new Promise(resolve => {
        let currentIndex = 0;

        function tryNextImage() {
            if (currentIndex >= candidates.length) {
                resolve("");
                return;
            }

            const src = candidates[currentIndex];
            const testImage = new Image();

            currentIndex += 1;

            testImage.onload = () => resolve(src);
            testImage.onerror = tryNextImage;
            testImage.src = src;
        }

        tryNextImage();
    });
}




/* ==============================
   GALLERY LIGHTBOX
   ============================== */

function initGalleryLightbox() {
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = lightbox ? lightbox.querySelector(".gallery-lightbox-image") : null;
    const lightboxTitle = lightbox ? lightbox.querySelector(".gallery-lightbox-title") : null;
    const closeButton = lightbox ? lightbox.querySelector(".gallery-lightbox-close") : null;
    const galleryItems = document.querySelectorAll(".gallery-item[data-bg-base]");

    if (!lightbox || !lightboxImage || !galleryItems.length) return;

    const closeLightbox = () => {
        lightbox.classList.add("hidden");
        lightboxImage.style.backgroundImage = "";
        if (lightboxTitle) lightboxTitle.textContent = "";
    };

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const title = item.dataset.galleryTitle || item.textContent.trim() || "Galería";
            const bgBase = item.dataset.bgBase;
            const inlineBg = item.style.backgroundImage;

            if (inlineBg && inlineBg !== "none") {
                lightboxImage.style.backgroundImage = inlineBg;
            } else if (bgBase) {
                lightboxImage.style.backgroundImage = `url("./assets/${bgBase}.jpeg")`;
            }

            if (lightboxTitle) lightboxTitle.textContent = title;
            lightbox.classList.remove("hidden");
        });
    });

    if (closeButton) closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !lightbox.classList.contains("hidden")) {
            closeLightbox();
        }
    });
}

/* ==============================
   LEGACY PREMIUM MOTION POLISH
   ============================== */

function initLegacyPremiumMotion() {
    if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.utils.toArray(".gallery-item").forEach(item => {
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

    gsap.utils.toArray(".wedding-menu-card, .rsvp-card, .guest-info-card, .paper-card, .itinerary-card").forEach(card => {
        gsap.to(card, {
            y: -8,
            ease: "none",
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.05
            }
        });
    });

    gsap.to(".wedding-rings-mark", {
        rotate: 2,
        y: -5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-brand-badge", {
        y: -3,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

/* ==============================
   AUDIO VISIBILITY CONTROL
   ============================== */

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
