/**
 * INVYRA - Bautizo Demo 01
 * Version 1.0.5
 * Signature Baptism Experience
 * Splash envelope + RSVP Google Sheets
 */

document.body.classList.add("js-enabled", "splash-active");

const RSVP_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwQfL0MtbBi-dyQO0zH9DwHX-_QSAgepdLJsIhGZEebvaXUoNVIT2fI3YJ0pUsQOBMI/exec";

const EVENT_NAME = "Bautizo de Mateo";
const RSVP_STORAGE_KEY = "invyra_bautizo_mateo_rsvp";
const EVENT_DATE = new Date("2026-05-24T12:30:00").getTime();
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let experienceAlreadyOpened = false;

document.addEventListener("DOMContentLoaded", () => {
    initGsapRegistration();
    initCountdown();
    initScrollReveal();
    initAttendanceToggle();
    initImageFallbacks();
    initModalClose();
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

    const splashDuration = prefersReducedMotion ? 450 : 3200;

    window.setTimeout(() => {
        splash.classList.add("is-hidden");
        document.body.classList.remove("splash-active");
        document.body.classList.add("experience-opened");

        window.scrollTo({ top: 0, behavior: "auto" });

        window.setTimeout(revealHero, 180);

        window.setTimeout(() => {
            splash.style.display = "none";
        }, 850);
    }, splashDuration);
}

function playMusicSafely(music) {
    if (!music) return;
    music.volume = 0.36;
    music.play().catch(() => {
        console.warn("La música no pudo iniciar automáticamente.");
    });
}

function revealHero() {
    const heroAtmosphere = document.querySelectorAll(".hero-atmosphere");
    const heroItems = document.querySelectorAll(
        ".hero-section .reveal-item, .hero-section .reveal-title"
    );

    if (prefersReducedMotion || typeof gsap === "undefined") {
        heroAtmosphere.forEach(element => {
            element.style.opacity = "1";
        });

        heroItems.forEach(element => {
            element.style.opacity = "1";
            element.style.transform = "none";
            element.style.filter = "none";
        });

        return;
    }

    gsap.to(heroAtmosphere, {
        opacity: 1,
        duration: 1.15,
        ease: "power2.out",
        stagger: 0.08
    });

    gsap.to(heroItems, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.18
    });

    if (typeof ScrollTrigger !== "undefined") {
        window.setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
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
    const sectionElements = document.querySelectorAll(
        ".section-reveal, .event-card, .timeline-item, .gallery-item"
    );

    if (!sectionElements.length) return;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
        sectionElements.forEach(showElement);
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                showElement(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    sectionElements.forEach(element => {
        observer.observe(element);
    });
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
