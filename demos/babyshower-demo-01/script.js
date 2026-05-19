/**
 * INVYRA - Baby Shower Demo
 * Version 1.0.2
 * Nivel: Signature
 * Celestial Cradle Experience
 * Update: Standardized Signature RSVP flow with companions
 */

document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeqwH1PtkO5Uvf17IrPu2V5gCOMQlVYkWIVFTG0U_8YzglZyL6nUAyEq-prqYoJ7cP/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Jul 20, 2026 16:00:00";
const EVENTO_NOMBRE = "Baby Shower de Yeison";

const isMobile = window.matchMedia("(max-width: 768px)").matches;
let experienceOpening = false;
let experienceStarted = false;

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

    if (typeof gsap === "undefined") return;

    if (isMobile) {
        return;
    }

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
}

function killSplashTweens() {
    if (typeof gsap === "undefined") return;

    gsap.killTweensOf(".splash-content");
    gsap.killTweensOf(".splash-logo");
    gsap.killTweensOf(".splash-halo");
    gsap.killTweensOf(".splash-cradle");
    gsap.killTweensOf(".cradle-star");
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

    if (!splash || experienceOpening) return;

    experienceOpening = true;
    startMusic();

    const emergencyClose = setTimeout(() => {
        finishOpeningExperience();
    }, 2600);

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

    openTL
        .to(".splash-content", {
            opacity: 0,
            y: -18,
            scale: 0.985,
            duration: 0.58
        })
        .to(".splash-cloud-left", {
            x: isMobile ? -150 : -210,
            opacity: 0.22,
            duration: 0.95
        }, "-=0.18")
        .to(".splash-cloud-right", {
            x: isMobile ? 150 : 210,
            opacity: 0.22,
            duration: 0.95
        }, "<")
        .to(".splash-cloud-bottom", {
            y: isMobile ? 130 : 170,
            opacity: 0.18,
            duration: 0.95
        }, "<")
        .to(".splash-cradle", {
            y: -24,
            scale: 1.08,
            opacity: 0,
            duration: 0.85
        }, "-=0.72")
        .to(".splash-halo", {
            scale: 1.12,
            opacity: 0,
            duration: 0.8
        }, "<")
        .to("#splash-screen", {
            opacity: 0,
            duration: 0.52
        }, "-=0.26");
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
    } else {
        inputPases.disabled = false;
        inputPases.setAttribute("aria-disabled", "false");
        companionsField.classList.remove("is-disabled");
    }

    if (rsvpCard) {
        rsvpCard.classList.toggle("rsvp-not-attending", noAsistira);
    }

    if (btnConfirmar && !btnConfirmar.disabled) {
        btnConfirmar.innerText = noAsistira ? "ENVIAR RESPUESTA" : "CONFIRMAR ASISTENCIA";
    }
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
            delete window[callbackName];

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
    }
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

    campo.style.border = "1px solid #c99b4a";

    setTimeout(() => {
        campo.style.border = "1px solid rgba(201, 155, 74, 0.32)";
    }, 2000);
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

    const nombre = inputNombre.value.trim();
    const mensajeInvitado = inputMensaje.value.trim();
    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";
    const noAsistira = asistencia === "No asistiré";
    const acompanantes = noAsistira ? "No aplica" : inputPases.value.trim();

    if (!nombre) {
        marcarCampoInvalido(inputNombre);
        return;
    }

    btnConfirmar.innerText = "PROCESANDO...";
    btnConfirmar.disabled = true;

    try {
        const response = await sendRsvpToAppsScript({
            nombre,
            asistencia,
            pases: acompanantes,
            mensaje: mensajeInvitado,
            evento: EVENTO_NOMBRE
        });

        if (response && response.status === "duplicate") {
            setModalContent(
                "RESPUESTA YA REGISTRADA",
                "Ya tenemos una respuesta asociada a este nombre. Gracias por formar parte de esta celebración."
            );

            showModal();

            setTimeout(() => {
                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                bloquearFormularioComoRegistrado();
            }, 5200);

            return;
        }

        if (response && response.status === "success") {
            setModalContent(
                "¡RESPUESTA REGISTRADA!",
                "Gracias por confirmar. En un momento abriremos WhatsApp para completar tu mensaje."
            );

            showModal();

            btnConfirmar.innerText = "¡TODO LISTO!";

            const mensajeWhatsApp = encodeURIComponent(
                `¡Hola! Confirmo mi respuesta para el Baby Shower de Yeison.\n\n` +
                `*Invitado:* ${nombre}\n` +
                `*Asistencia:* ${asistencia}\n` +
                `*Acompañantes:* ${acompanantes}\n` +
                `*Deseo para el bebé:* ${mensajeInvitado || "Sin mensaje"}`
            );

            setTimeout(() => {
                window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");

                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                bloquearFormularioComoRegistrado();
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

        btnConfirmar.disabled = false;
        btnConfirmar.innerText = asistencia === "No asistiré" ? "ENVIAR RESPUESTA" : "CONFIRMAR ASISTENCIA";

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
        music.pause();
    } else if (splash && splash.style.display === "none") {
        music.play().catch(error => console.log("Error al reanudar:", error));
    }
});

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
    updateCountdown();

    setInterval(updateCountdown, 1000);
});