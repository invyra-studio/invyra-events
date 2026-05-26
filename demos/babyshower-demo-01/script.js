/**
 * INVYRA - Baby Shower Demo
 * Version 1.5.0
 * Nivel: Signature
 * Celestial Cradle Experience
 * Update: Signature Premium responsive editorial upgrade
 */

document.body.classList.add("js-enabled", "splash-active");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeqwH1PtkO5Uvf17IrPu2V5gCOMQlVYkWIVFTG0U_8YzglZyL6nUAyEq-prqYoJ7cP/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Jul 20, 2026 16:00:00";
const EVENTO_NOMBRE = "Baby Shower de Yeison";
const RSVP_DRAFT_STORAGE_KEY = "invyra_baby_yeison_rsvp_draft";

const isMobile = window.matchMedia("(max-width: 768px)").matches;
let experienceOpening = false;
let experienceStarted = false;
let suppressDraftSaveAfterSubmit = false;

/* ==============================
   FALLBACKS
   ============================== */

function revealFallback() {
    document
        .querySelectorAll(".reveal-item, .reveal-title, .section-reveal")
        .forEach(element => {
            element.style.opacity = "1";
            element.style.filter = "blur(0px)";
            element.style.transform = "none";
        });
}

function safeSetVisible(selector) {
    document.querySelectorAll(selector).forEach(element => {
        element.style.opacity = "1";
        element.style.filter = "blur(0px)";
        element.style.transform = "none";
    });
}

/* ==============================
   SPLASH IDLE MOTION
   ============================== */

function initSplashIdleMotion() {
    const splash = document.getElementById("splash-screen");

    if (splash) {
        setTimeout(() => {
            splash.classList.add("is-ready");
        }, 450);
    }

    if (typeof gsap === "undefined" || isMobile) return;

    gsap.to(".splash-content", {
        y: -6,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-logo", {
        scale: 1.035,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-halo", {
        scale: 1.055,
        opacity: 0.96,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-cradle", {
        y: -8,
        duration: 6.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".cradle-star", {
        opacity: 1,
        scale: 1.12,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.35
    });

    gsap.to(".splash-light-ribbon", {
        x: 18,
        y: -12,
        opacity: 0.78,
        duration: 7.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.45
    });

    gsap.to(".baby-charm", {
        y: -14,
        rotate: 5,
        opacity: 0.95,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.42
    });
}

function killSplashTweens() {
    if (typeof gsap === "undefined") return;

    gsap.killTweensOf(".splash-content");
    gsap.killTweensOf(".splash-logo");
    gsap.killTweensOf(".splash-halo");
    gsap.killTweensOf(".splash-cradle");
    gsap.killTweensOf(".cradle-star");
    gsap.killTweensOf(".splash-light-ribbon");
    gsap.killTweensOf(".baby-charm");
}

/* ==============================
   OPEN EXPERIENCE
   ============================== */

function finishOpeningExperience() {
    const splash = document.getElementById("splash-screen");

    if (splash) {
        splash.style.display = "none";
        splash.style.opacity = "0";
        splash.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("splash-active");
    document.body.classList.add("experience-opened");

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });

    if (experienceStarted) return;

    experienceStarted = true;

    initHeroReveal();
    initScrollReveal();
}

function startMusic() {
    const music = document.getElementById("bg-music");

    if (!music) return;

    music.volume = 0;

    music.play().catch(error => {
        console.log("Audio requiere interacción:", error);
    });

    if (typeof gsap !== "undefined") {
        gsap.to(music, {
            volume: 0.32,
            duration: 4,
            ease: "power1.inOut"
        });
    } else {
        music.volume = 0.32;
    }
}

function entrarExperiencia() {
    const splash = document.getElementById("splash-screen");
    const startButton = document.getElementById("btn-start-experience");

    if (!splash || experienceOpening) return;

    experienceOpening = true;

    if (startButton) startButton.disabled = true;

    startMusic();

    const emergencyClose = setTimeout(() => {
        finishOpeningExperience();
    }, 2800);

    if (typeof gsap === "undefined") {
        clearTimeout(emergencyClose);
        finishOpeningExperience();
        return;
    }

    killSplashTweens();

    const openTL = gsap.timeline({
        defaults: {
            ease: "power3.inOut"
        },
        onComplete: () => {
            clearTimeout(emergencyClose);
            finishOpeningExperience();
        }
    });

    splash.classList.add("opening");

    openTL
        .to(".btn-start-experience", {
            opacity: 0,
            y: 12,
            duration: 0.28
        })
        .to(".splash-logo, .splash-kicker, .splash-title, .splash-subtitle", {
            opacity: 0,
            y: -14,
            filter: "blur(8px)",
            duration: 0.48,
            stagger: 0.035
        }, "-=0.08")
        .to(".curtain-left", {
            x: isMobile ? -188 : -260,
            scale: 1.06,
            opacity: 0.22,
            duration: 0.88
        }, "-=0.30")
        .to(".curtain-right", {
            x: isMobile ? 188 : 260,
            scale: 1.06,
            opacity: 0.22,
            duration: 0.88
        }, "<")
        .to(".splash-cloud-left", {
            x: isMobile ? -170 : -230,
            opacity: 0.18,
            duration: 0.84
        }, "<")
        .to(".splash-cloud-right", {
            x: isMobile ? 170 : 230,
            opacity: 0.18,
            duration: 0.84
        }, "<")
        .to(".splash-cloud-bottom", {
            y: isMobile ? 138 : 178,
            opacity: 0.14,
            duration: 0.84
        }, "<")
        .to(".splash-cradle", {
            y: -30,
            scale: 1.12,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.72
        }, "-=0.56")
        .to(".splash-halo", {
            scale: 1.2,
            opacity: 0,
            duration: 0.72
        }, "<")
        .to(".splash-dawn-wash", {
            opacity: 1,
            scale: 1.08,
            duration: 0.42
        }, "-=0.54")
        .to("#splash-screen", {
            opacity: 0,
            duration: 0.42
        }, "-=0.08");
}

/* ==============================
   HERO REVEAL
   ============================== */

function initHeroReveal() {
    if (typeof gsap === "undefined") {
        safeSetVisible(".reveal-item, .reveal-title");
        return;
    }

    const heroTL = gsap.timeline({
        delay: 0.12,
        defaults: {
            ease: "power3.out",
            duration: 1.08
        }
    });

    heroTL
        .fromTo(".hero-dawn-rays", {
            opacity: 0,
            scale: 1.08
        }, {
            opacity: 0.78,
            scale: 1,
            duration: 1.05
        })
        .fromTo(".hero-cloud-curtain", {
            opacity: 0,
            y: 26,
            filter: "blur(18px)"
        }, {
            opacity: 0.78,
            y: 0,
            filter: "blur(10px)",
            stagger: 0.08,
            duration: 1.0
        }, "-=0.78")
        .fromTo(".hero-charm", {
            opacity: 0,
            y: 18,
            scale: 0.82
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.85
        }, "-=0.70")
        .to(".brand-logo-img", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        })
        .to(".hero-kicker", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.72")
        .to(".reveal-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.25
        }, "-=0.62")
        .to(".hero-phrase", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.82")
        .to(".hero-info-card", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)"
        }, "-=0.72");

    initHeroIdleMotion();
}

/* ==============================
   HERO IDLE MOTION
   ============================== */

function initHeroIdleMotion() {
    if (typeof gsap === "undefined") return;

    gsap.to(".hero-content", {
        y: isMobile ? -3 : -7,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-sky-glow", {
        scale: isMobile ? 1.025 : 1.06,
        opacity: isMobile ? 0.9 : 1,
        duration: 6.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-orbit", {
        y: isMobile ? -4 : -8,
        scale: isMobile ? 1.01 : 1.025,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    if (!isMobile) {
        gsap.to(".main-title", {
            textShadow:
                "0 16px 34px rgba(23,40,70,0.14), 0 0 42px rgba(255,255,255,0.72), 0 0 26px rgba(143,199,236,0.32)",
            duration: 4.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(".hero-info-card", {
            boxShadow:
                "0 28px 82px rgba(23,40,70,0.22), 0 0 42px rgba(143,199,236,0.22), inset 0 0 0 1px rgba(255,255,255,0.50)",
            duration: 4.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    gsap.to(".hero-charm", {
        y: isMobile ? -6 : -12,
        rotate: isMobile ? 3 : 7,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.38
    });

    gsap.to(".hero-dawn-rays", {
        opacity: isMobile ? 0.42 : 0.72,
        duration: 5.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

/* ==============================
   SCROLL REVEAL
   ============================== */

function initScrollReveal() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        revealFallback();
        return;
    }

    document.querySelectorAll(".section-reveal").forEach(section => {
        gsap.fromTo(
            section,
            {
                opacity: 0,
                y: 58,
                filter: "blur(8px)"
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 88%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.18,
                ease: "power3.out"
            }
        );
    });

    if (!isMobile) {
        document
            .querySelectorAll(".celestial-card, .detail-card, .theme-card, .gift-card, .wish-card, .rsvp-card, .countdown-card")
            .forEach((card, index) => {
                gsap.to(card, {
                    y: index % 2 === 0 ? -4 : -2,
                    duration: 5.4 + index * 0.1,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.08
                });
            });
    }

    ScrollTrigger.refresh();
}

/* ==============================
   COUNTDOWN
   ============================== */

const targetDate = new Date(FECHA_EVENTO).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const mins = document.getElementById("mins");
    const secs = document.getElementById("secs");

    if (!days || !hours || !mins || !secs) return;

    if (diff <= 0) {
        days.innerText = "00";
        hours.innerText = "00";
        mins.innerText = "00";
        secs.innerText = "00";
        return;
    }

    days.innerText = Math.floor(diff / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");

    hours.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0");

    mins.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");

    secs.innerText = Math.floor((diff % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");
}


/* ==============================
   ACTIVITY 14 RSVP MICROINTERACTIONS
   ============================== */

function setRsvpLiveMessage(message) {
    const liveMessage = document.getElementById("rsvp-live-message");

    if (liveMessage) {
        liveMessage.textContent = message;
    }
}

function updateFieldState(field) {
    if (!field) return;

    field.classList.toggle("has-value", Boolean(String(field.value || "").trim()));
}

function initRsvpFieldMicrointeractions() {
    const fields = [
        document.getElementById("nombreInvitado"),
        document.getElementById("mensajeInvitado"),
        document.getElementById("pasesInvitado")
    ].filter(Boolean);

    fields.forEach(field => {
        updateFieldState(field);

        field.addEventListener("input", () => updateFieldState(field));
        field.addEventListener("change", () => updateFieldState(field));
        field.addEventListener("focus", () => {
            const rsvpCard = document.querySelector(".rsvp-card");
            if (rsvpCard) rsvpCard.classList.add("is-interacting");
        });
        field.addEventListener("blur", () => {
            const rsvpCard = document.querySelector(".rsvp-card");
            if (rsvpCard) rsvpCard.classList.remove("is-interacting");
        });
    });
}

function setButtonLoading(button, isLoading, asistencia = "Asistiré") {
    if (!button) return;

    button.disabled = isLoading;
    button.classList.toggle("is-loading", isLoading);
    button.setAttribute("aria-busy", isLoading ? "true" : "false");

    if (isLoading) {
        button.innerText = "GUARDANDO RESPUESTA...";
        return;
    }

    button.innerText = asistencia === "No asistiré" ? "ENVIAR RESPUESTA" : "CONFIRMAR ASISTENCIA";
}

function pulseRsvpCard() {
    const rsvpCard = document.querySelector(".rsvp-card");

    if (!rsvpCard || typeof gsap === "undefined") return;

    gsap.fromTo(
        rsvpCard,
        { scale: 0.992 },
        { scale: 1, duration: 0.42, ease: "power2.out" }
    );
}

/* ==============================
   RSVP UI
   ============================== */

function initRsvpControls() {
    const attendanceRadios = document.querySelectorAll('input[name="asistencia"]');

    attendanceRadios.forEach(radio => {
        radio.addEventListener("change", updateRsvpState);
    });

    updateRsvpState();
}

function updateRsvpState() {
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const companionsField = document.getElementById("companions-field");
    const inputPases = document.getElementById("pasesInvitado");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const rsvpCard = document.querySelector(".rsvp-card");

    if (!asistenciaSeleccionada || !companionsField || !inputPases) return;

    const noAsistira = asistenciaSeleccionada.value === "No asistiré";

    if (noAsistira) {
        inputPases.value = "Solo yo";
        inputPases.disabled = true;
        inputPases.setAttribute("aria-disabled", "true");
        companionsField.classList.add("is-disabled");
        companionsField.setAttribute("aria-hidden", "true");
        setRsvpLiveMessage("Gracias por avisarnos. Puedes enviar tu respuesta con un deseo para Yeison si lo deseas.");
    } else {
        inputPases.disabled = false;
        inputPases.setAttribute("aria-disabled", "false");
        companionsField.classList.remove("is-disabled");
        companionsField.setAttribute("aria-hidden", "false");
        setRsvpLiveMessage("Qué emoción. Indica si asistirás con acompañantes para preparar cada detalle.");
    }

    updateFieldState(inputPases);

    if (rsvpCard) {
        rsvpCard.classList.toggle("rsvp-not-attending", noAsistira);
        rsvpCard.classList.add("state-just-changed");
        window.setTimeout(() => rsvpCard.classList.remove("state-just-changed"), 520);
    }

    if (btnConfirmar && !btnConfirmar.disabled) {
        setButtonLoading(btnConfirmar, false, asistenciaSeleccionada.value);
    }

    pulseRsvpCard();
}

/* ==============================
   RSVP DRAFT AUTOSAVE
   ============================== */

function getRsvpDraftData() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const inputPases = document.getElementById("pasesInvitado");
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');

    return {
        nombre: inputNombre ? inputNombre.value : "",
        mensaje: inputMensaje ? inputMensaje.value : "",
        pases: inputPases ? inputPases.value : "",
        asistencia: asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré"
    };
}

function saveRsvpDraft() {
    const draft = getRsvpDraftData();

    try {
        if (suppressDraftSaveAfterSubmit || isEmptyBabyDraft(draft)) {
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
        console.warn("No se pudo restaurar el borrador RSVP:", error);
    }

    if (!draft) return;

    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const inputPases = document.getElementById("pasesInvitado");

    if (inputNombre && typeof draft.nombre === "string") {
        inputNombre.value = draft.nombre;
    }

    if (inputMensaje && typeof draft.mensaje === "string") {
        inputMensaje.value = draft.mensaje;
    }

    if (inputPases && typeof draft.pases === "string") {
        const hasOption = Array.from(inputPases.options).some(option => option.value === draft.pases);
        if (hasOption) inputPases.value = draft.pases;
    }

    if (draft.asistencia) {
        const radio = Array.from(document.querySelectorAll('input[name="asistencia"]'))
            .find(option => option.value === draft.asistencia);

        if (radio) radio.checked = true;
    }

    [inputNombre, inputMensaje, inputPases].forEach(updateFieldState);
    updateRsvpState();
}

function clearRsvpDraft() {
    try {
        localStorage.removeItem(RSVP_DRAFT_STORAGE_KEY);
    } catch (error) {
        console.warn("No se pudo limpiar el borrador RSVP:", error);
    }
}

function isEmptyBabyDraft(draft) {
    return !cleanText(draft.nombre) &&
        !cleanText(draft.mensaje) &&
        draft.asistencia === "Asistiré" &&
        (!draft.pases || draft.pases === "Solo yo");
}

function resetBabyRsvpFormAfterSuccess() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const inputPases = document.getElementById("pasesInvitado");
    const asistirRadio = document.querySelector('input[name="asistencia"][value="Asistiré"]');
    const btnConfirmar = document.getElementById("btn-confirmar");

    if (inputNombre) {
        inputNombre.value = "";
        inputNombre.disabled = false;
        updateFieldState(inputNombre);
    }

    if (inputMensaje) {
        inputMensaje.value = "";
        inputMensaje.disabled = false;
        updateFieldState(inputMensaje);
    }

    if (inputPases) {
        inputPases.value = "Solo yo";
        inputPases.disabled = false;
        updateFieldState(inputPases);
    }

    if (asistirRadio) asistirRadio.checked = true;

    document.querySelectorAll('input[name="asistencia"]').forEach(radio => {
        radio.disabled = false;
    });

    if (btnConfirmar) {
        btnConfirmar.disabled = false;
        btnConfirmar.classList.remove("is-loading");
        btnConfirmar.setAttribute("aria-busy", "false");
        btnConfirmar.innerText = "CONFIRMAR ASISTENCIA";
    }

    updateRsvpState();
    clearRsvpDraft();
}
function initRsvpDraftPersistence() {
    const fields = [
        document.getElementById("nombreInvitado"),
        document.getElementById("mensajeInvitado"),
        document.getElementById("pasesInvitado")
    ].filter(Boolean);

    const radios = Array.from(document.querySelectorAll('input[name="asistencia"]'));

    restoreRsvpDraft();

    fields.forEach(field => {
        field.addEventListener("input", saveRsvpDraft);
        field.addEventListener("change", saveRsvpDraft);
    });

    radios.forEach(radio => {
        radio.addEventListener("change", saveRsvpDraft);
    });

    window.addEventListener("pagehide", saveRsvpDraft);

    fields.forEach(updateFieldState);
}

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

    if (typeof gsap !== "undefined") {
        gsap.fromTo(
            ".modal-content",
            {
                opacity: 0,
                scale: 0.86,
                y: 18
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: "back.out(1.7)"
            }
        );
    }
}

function hideModal(delay = 4000) {
    const modal = document.getElementById("rsvp-modal");

    if (!modal) return;

    setTimeout(() => {
        modal.classList.add("hidden");
    }, delay);
}

/* ==============================
   APPS SCRIPT JSONP
   ============================== */

function sendRsvpToAppsScript(data) {
    return new Promise((resolve, reject) => {
        if (!SCRIPT_URL || !SCRIPT_URL.includes("script.google.com/macros/s/")) {
            reject(new Error("URL de Apps Script inválida."));
            return;
        }

        const callbackName = `invyraBabyCallback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const script = document.createElement("script");

        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("Tiempo de espera agotado al conectar con Apps Script."));
        }, 15000);

        function cleanup() {
            clearTimeout(timeout);

            try {
                delete window[callbackName];
            } catch (error) {
                window[callbackName] = undefined;
            }

            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        }

        window[callbackName] = response => {
            cleanup();
            resolve(response);
        };

        const params = new URLSearchParams({
            callback: callbackName,
            nombre: data.nombre,
            asistencia: data.asistencia,
            pases: data.pases,
            mensaje: data.mensaje,
            evento: data.evento
        });

        script.src = `${SCRIPT_URL}?${params.toString()}`;

        script.onerror = () => {
            cleanup();
            reject(new Error("No se pudo conectar con Apps Script."));
        };

        document.body.appendChild(script);
    });
}

/* ==============================
   RSVP LOCK
   ============================== */

function bloquearFormularioComoRegistrado() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const inputPases = document.getElementById("pasesInvitado");
    const companionsField = document.getElementById("companions-field");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const radios = document.querySelectorAll('input[name="asistencia"]');

    if (inputNombre) inputNombre.disabled = true;
    if (inputMensaje) inputMensaje.disabled = true;
    if (inputPases) inputPases.disabled = true;

    if (companionsField) {
        companionsField.classList.add("is-disabled");
    }

    radios.forEach(radio => {
        radio.disabled = true;
    });

    if (btnConfirmar) {
        btnConfirmar.innerText = "RESPUESTA YA REGISTRADA";
        btnConfirmar.disabled = true;
        btnConfirmar.classList.remove("is-loading");
        btnConfirmar.setAttribute("aria-busy", "false");
    }

    const rsvpCard = document.querySelector(".rsvp-card");
    if (rsvpCard) rsvpCard.classList.add("is-registered");

    setRsvpLiveMessage("Tu respuesta ya quedó registrada para esta dulce espera.");
}

function restoreRegisteredState() {
    // La validación real de duplicados se realiza en Google Sheets con nombre + evento.
    // No se bloquea el formulario por localStorage.
}

function marcarCampoInvalido(campo) {
    if (!campo) return;

    if (typeof gsap !== "undefined") {
        gsap.to(campo, {
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true
        });
    }

    campo.classList.add("field-warning");
    setRsvpLiveMessage("Falta escribir el nombre del invitado o familia para continuar.");

    setTimeout(() => {
        campo.classList.remove("field-warning");
    }, 1800);
}

/* ==============================
   RSVP SUBMIT
   ============================== */

async function confirmarAsistencia() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const inputPases = document.getElementById("pasesInvitado");
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const btnConfirmar = document.getElementById("btn-confirmar");

    if (!inputNombre || !inputMensaje || !inputPases || !btnConfirmar) return;

    const nombre = inputNombre.value.trim().replace(/\s+/g, " ");
    const mensajeInvitado = inputMensaje.value.trim().replace(/\s+/g, " ");
    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";
    const noAsistira = asistencia === "No asistiré";
    const acompanantes = noAsistira ? "No aplica" : inputPases.value.trim();

    if (!nombre) {
        marcarCampoInvalido(inputNombre);

        setModalContent(
            "FALTA TU NOMBRE",
            "Escribe el nombre del invitado o familia para registrar la confirmación."
        );

        showModal();
        hideModal(3600);
        return;
    }

    setButtonLoading(btnConfirmar, true, asistencia);
    setRsvpLiveMessage("Estamos guardando tu respuesta con mucho cuidado...");

    try {
        const response = await sendRsvpToAppsScript({
            nombre,
            asistencia,
            pases: acompanantes,
            mensaje: mensajeInvitado,
            evento: EVENTO_NOMBRE
        });

        if (response && response.status === "duplicate") {
            clearRsvpDraft();

            setModalContent(
                "RESPUESTA YA REGISTRADA",
                "Google Sheets ya detectó una respuesta con ese nombre para este evento. Puedes revisar el nombre o avisar directamente a los anfitriones."
            );

            showModal();
            setRsvpLiveMessage("Respuesta duplicada detectada por Google Sheets. El formulario queda disponible por si necesitas corregir el nombre.");

            setButtonLoading(btnConfirmar, false, asistencia);
            hideModal(5200);
            return;
        }

        if (response && response.status === "success") {
            clearRsvpDraft();

            setModalContent(
                "¡RESPUESTA REGISTRADA!",
                "Gracias por confirmar. Tu respuesta quedó guardada con cariño; en un momento abriremos WhatsApp para completar tu mensaje."
            );

            showModal();

            btnConfirmar.classList.remove("is-loading");
            btnConfirmar.setAttribute("aria-busy", "false");
            btnConfirmar.innerText = "¡TODO LISTO!";
            setRsvpLiveMessage("Tu confirmación quedó registrada en Google Sheets. Gracias por acompañar a Yeison.");

            const mensajeWhatsApp = encodeURIComponent(
                `¡Hola! Confirmo mi respuesta para el Baby Shower de Yeison.\n\n` +
                `*Invitado:* ${nombre}\n` +
                `*Asistencia:* ${asistencia}\n` +
                `*Acompañantes:* ${acompanantes}\n` +
                `*Deseo para el bebé:* ${mensajeInvitado || "Sin mensaje"}`
            );

            suppressDraftSaveAfterSubmit = true;
            clearRsvpDraft();

            setTimeout(() => {
                resetBabyRsvpFormAfterSuccess();
                window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");

                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                setTimeout(() => {
                    suppressDraftSaveAfterSubmit = false;
                }, 1800);
            }, 3200);

            return;
        }

        throw new Error(response && response.message ? response.message : "Respuesta inesperada de Apps Script.");
    } catch (error) {
        console.error("Error:", error);

        setModalContent(
            "NO SE PUDO REGISTRAR",
            "No pudimos conectar con el registro. Inténtalo nuevamente en unos segundos."
        );

        showModal();

        setButtonLoading(btnConfirmar, false, asistencia);
        setRsvpLiveMessage("No pudimos guardar la respuesta. Puedes intentarlo nuevamente en unos segundos.");

        hideModal(5200);
    }
}

window.confirmarAsistencia = confirmarAsistencia;
window.entrarExperiencia = entrarExperiencia;

/* ==============================
   AUDIO VISIBILITY
   ============================== */

document.addEventListener("visibilitychange", () => {
    const music = document.getElementById("bg-music");
    const splash = document.getElementById("splash-screen");

    if (!music) return;

    if (document.hidden) {
        saveRsvpDraft();
        music.pause();
        return;
    }

    const experienceIsOpen =
        document.body.classList.contains("experience-opened") ||
        (splash && splash.style.display === "none");

    if (experienceIsOpen) {
        music.play().catch(error => console.log("Error al reanudar:", error));
    }
});

/* ==============================
   MODAL CLOSE
   ============================== */

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
   DOM READY
   ============================== */

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("btn-start-experience");
    const confirmButton = document.getElementById("btn-confirmar");

    if (startButton) {
        startButton.addEventListener("click", entrarExperiencia);

        startButton.addEventListener("touchstart", event => {
            event.preventDefault();
            entrarExperiencia();
        }, { passive: false });
    }

    if (confirmButton) {
        confirmButton.addEventListener("click", confirmarAsistencia);
    }

    initSplashIdleMotion();
    initRsvpControls();
    initRsvpDraftPersistence();
    initRsvpFieldMicrointeractions();
    initModalClose();
    restoreRegisteredState();
    updateCountdown();

    setInterval(updateCountdown, 1000);
});
