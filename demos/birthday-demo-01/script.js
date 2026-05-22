/**
 * INVYRA - Birthday Demo 01
 * Midnight Gala RSVP Premium
 * Version 1.3.1
 * Server-side RSVP validation through Google Sheets / Apps Script
 * Update: Activity 13 cinematic gala splash + unique hero transition
 */

document.body.classList.add("js-enabled", "splash-active");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpV7Xn9bgxBkV2B6x6YJ1wfxPfXPB3g8IWI-IhlpXBEk6IFFT8Ay0sfhHLLr58yVoc/exec";
const TELEFONO_RSVP = "525516986744";
const EVENTO_NOMBRE = "Birthday Demo 01 - Midnight Gala Erza";
const RSVP_STORAGE_KEY = "invyra_birthday_demo_01_rsvp_registered";
const RSVP_DRAFT_KEY = "invyra_birthday_demo_01_rsvp_draft";

let galaAlreadyOpened = false;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initParticles() {
    const commonConfig = direction => ({
        particles: {
            number: {
                value: 120,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#c5a059"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.8,
                random: false,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.4,
                    sync: false
                }
            },
            size: {
                value: 1.5,
                random: true,
                anim: {
                    enable: false
                }
            },
            line_linked: {
                enable: false
            },
            move: {
                enable: true,
                speed: 0.7,
                direction,
                random: true,
                straight: false,
                out_mode: "out"
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: false
                }
            }
        },
        retina_detect: true
    });

    if (typeof particlesJS !== "undefined") {
        particlesJS("particles-top", commonConfig("bottom"));
        particlesJS("particles-bottom", commonConfig("top"));
    }
}


function entrarGala() {
    const splash = document.getElementById("splash-screen");
    const music = document.getElementById("bg-music");
    const startButton = document.querySelector(".btn-start-experience");

    if (!splash || galaAlreadyOpened) return;

    galaAlreadyOpened = true;

    if (startButton) {
        startButton.disabled = true;
        startButton.textContent = "ABRIENDO EXPERIENCIA...";
    }

    playMusicWithFade(music);

    if (prefersReducedMotion || typeof gsap === "undefined") {
        splash.style.display = "none";
        document.body.classList.remove("splash-active");
        document.body.classList.add("experience-opened");
        revealHeroFallback();
        initScrollReveal();
        return;
    }

    const openTL = gsap.timeline({
        defaults: {
            ease: "power3.inOut"
        },
        onComplete: () => {
            splash.style.display = "none";
            document.body.classList.remove("splash-active");
            document.body.classList.add("experience-opened");
            window.scrollTo({ top: 0, behavior: "auto" });
            revealHeroCinematic();
            initScrollReveal();
        }
    });

    openTL
        .to(".splash-orbit", {
            scale: 1.26,
            opacity: 0.18,
            duration: 0.75
        })
        .to(".splash-logo", {
            y: -18,
            scale: 0.92,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.72
        }, "-=0.62")
        .to(".splash-eyebrow, .splash-title, .splash-subtitle, .loader-bar, .btn-start-experience", {
            y: 24,
            opacity: 0,
            filter: "blur(8px)",
            stagger: 0.045,
            duration: 0.62
        }, "-=0.54")
        .to("#splash-screen", {
            opacity: 0,
            scale: 1.035,
            duration: 0.68,
            ease: "power2.inOut"
        }, "-=0.18");
}

function playMusicWithFade(music) {
    if (!music) return;

    music.volume = 0;
    music.play().catch(err => console.log("Interacción requerida:", err));

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.to(music, {
            volume: 0.35,
            duration: 3.2,
            ease: "power1.inOut"
        });
    } else {
        music.volume = 0.35;
    }
}

function revealHeroFallback() {
    document.querySelectorAll(".hero-atmosphere, .reveal-item, .reveal-title").forEach(element => {
        element.style.opacity = "1";
        element.style.filter = "blur(0px)";
        element.style.transform = "none";
    });
}

function revealHeroCinematic() {
    const revealTL = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1.05
        }
    });

    revealTL
        .fromTo(".hero-section", {
            scale: 1.035,
            filter: "brightness(0.72)"
        }, {
            scale: 1,
            filter: "brightness(1)",
            duration: 1.25,
            ease: "power2.out"
        })
        .to(".hero-atmosphere", {
            opacity: 1,
            duration: 1.15,
            stagger: 0.045
        }, "-=1.05")
        .fromTo(".gala-light-beam", {
            opacity: 0,
            xPercent: -18,
            rotate: -8
        }, {
            opacity: 0.42,
            xPercent: 0,
            rotate: 0,
            duration: 1.2,
            stagger: 0.08
        }, "-=0.9")
        .to(".hero-logo-wrap", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9
        }, "-=0.82")
        .to(".pre-title", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.85
        }, "-=0.68")
        .to(".reveal-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "expo.out"
        }, "-=0.5")
        .to(".celebrant-name", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82
        }, "-=0.74")
        .to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82
        }, "-=0.66");
}
window.entrarGala = entrarGala;

document.addEventListener("DOMContentLoaded", () => {
    initParticles();

    const startButton = document.querySelector(".btn-start-experience");

    if (startButton) {
        startButton.addEventListener("click", entrarGala);
    }

    initRsvpState();
    initRsvpAutosave();
    restoreRsvpDraft();
    initModalClose();
});

function initScrollReveal() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        document.querySelectorAll(".section-reveal").forEach(section => {
            section.style.opacity = "1";
            section.style.transform = "none";
        });
        return;
    }

    document.querySelectorAll(".section-reveal").forEach(section => {
        gsap.fromTo(section,
            {
                opacity: 0,
                y: 50
            },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out"
            }
        );
    });

    gsap.to(".location-link", {
        scrollTrigger: {
            trigger: ".location-container",
            start: "top 95%"
        },
        y: -5,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut"
    });

    ScrollTrigger.refresh();
}

function initRsvpState() {
    const radios = document.querySelectorAll('input[name="asistencia"]');

    radios.forEach(radio => {
        radio.addEventListener("change", actualizarEstadoAsistencia);
    });

    actualizarEstadoAsistencia();
}

function initRsvpAutosave() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const radios = document.querySelectorAll('input[name="asistencia"]');

    const saveDraft = () => {
        if (localStorage.getItem(RSVP_STORAGE_KEY) === "true") return;

        const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');

        const draft = {
            nombre: inputNombre ? inputNombre.value : "",
            mensaje: inputMensaje ? inputMensaje.value : "",
            asistencia: asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré",
            updatedAt: new Date().toISOString()
        };

        try {
            localStorage.setItem(RSVP_DRAFT_KEY, JSON.stringify(draft));
        } catch (error) {
            console.warn("No se pudo guardar el borrador RSVP:", error);
        }
    };

    if (inputNombre) inputNombre.addEventListener("input", saveDraft);
    if (inputMensaje) inputMensaje.addEventListener("input", saveDraft);

    radios.forEach(radio => {
        radio.addEventListener("change", saveDraft);
    });

    window.addEventListener("pagehide", saveDraft);

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            saveDraft();
        }
    });
}

function restoreRsvpDraft() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");

    if (localStorage.getItem(RSVP_STORAGE_KEY) === "true") {
        bloquearFormularioComoRegistrado();
        return;
    }

    try {
        const draft = JSON.parse(localStorage.getItem(RSVP_DRAFT_KEY) || "null");

        if (!draft) return;

        if (inputNombre && draft.nombre) inputNombre.value = draft.nombre;
        if (inputMensaje && draft.mensaje) inputMensaje.value = draft.mensaje;

        if (draft.asistencia) {
            const radio = document.querySelector(`input[name="asistencia"][value="${draft.asistencia}"]`);

            if (radio) radio.checked = true;
        }

        actualizarEstadoAsistencia();
    } catch (error) {
        console.warn("No se pudo restaurar el borrador RSVP:", error);
    }
}

function clearRsvpDraft() {
    try {
        localStorage.removeItem(RSVP_DRAFT_KEY);
    } catch (error) {
        console.warn("No se pudo limpiar el borrador RSVP:", error);
    }
}

function actualizarEstadoAsistencia() {
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const btnConfirmar = document.getElementById("btn-confirmar");
    const rsvpCard = document.querySelector(".rsvp-card");

    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";
    const noAsiste = asistencia === "No asistiré";

    if (rsvpCard) {
        rsvpCard.classList.toggle("rsvp-not-attending", noAsiste);
    }

    if (btnConfirmar && !btnConfirmar.disabled) {
        btnConfirmar.innerText = noAsiste ? "ENVIAR RESPUESTA" : "CONFIRMAR ASISTENCIA";
    }
}

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
        gsap.from(".modal-content", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }
}

function hideModal(delay = 2800) {
    const modal = document.getElementById("rsvp-modal");

    if (!modal) return;

    setTimeout(() => {
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

function sendRsvpToAppsScript(data) {
    return new Promise((resolve, reject) => {
        const callbackName = `invyraBirthdayCallback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const script = document.createElement("script");

        const timeout = setTimeout(() => {
            cleanup();
            reject(new Error("Tiempo de espera agotado al conectar con Apps Script."));
        }, 12000);

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

function bloquearFormularioComoRegistrado() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const radios = document.querySelectorAll('input[name="asistencia"]');

    if (inputNombre) inputNombre.disabled = true;
    if (inputMensaje) inputMensaje.disabled = true;

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
    } else {
        campo.classList.add("field-warning");

        setTimeout(() => {
            campo.classList.remove("field-warning");
        }, 900);
    }

    campo.style.border = "1px solid #ff4444";

    setTimeout(() => {
        campo.style.border = "1px solid rgba(214, 179, 106, 0.34)";
    }, 2000);
}

async function confirmarAsistencia() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const btnConfirmar = document.getElementById("btn-confirmar");

    if (!inputNombre || !inputMensaje || !btnConfirmar) return;

    const nombre = inputNombre.value.trim().replace(/\s+/g, " ");
    const mensajeInvitado = inputMensaje.value.trim().replace(/\s+/g, " ");
    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";

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
            mensaje: mensajeInvitado,
            evento: EVENTO_NOMBRE
        });

        if (response && response.status === "duplicate") {
            localStorage.setItem(RSVP_STORAGE_KEY, "true");
            clearRsvpDraft();

            setModalContent(
                "RESPUESTA YA REGISTRADA",
                "Ya tenemos una respuesta asociada a este nombre. Gracias por formar parte de esta noche especial."
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
            localStorage.setItem(RSVP_STORAGE_KEY, "true");
            clearRsvpDraft();

            setModalContent(
                "¡RESPUESTA REGISTRADA!",
                "Gracias por confirmar tu respuesta. En un momento abriremos WhatsApp para completar tu mensaje."
            );

            showModal();

            btnConfirmar.innerText = "¡TODO LISTO!";

            const mensajeWhatsApp = encodeURIComponent(
                `¡Hola! Confirmo mi respuesta para la Midnight Gala.\n\n` +
                `*Invitado:* ${nombre}\n` +
                `*Asistencia:* ${asistencia}\n` +
                `*Mensaje:* ${mensajeInvitado || "Sin mensaje"}`
            );

            setTimeout(() => {
                window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");

                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                bloquearFormularioComoRegistrado();
            }, 3200);

            return;
        }

        throw new Error("Respuesta inesperada de Apps Script.");
    } catch (error) {
        console.error("Error:", error);

        setModalContent(
            "NO SE PUDO REGISTRAR",
            "Ocurrió un detalle al guardar tu respuesta. Inténtalo nuevamente en unos segundos."
        );

        showModal();

        btnConfirmar.disabled = false;
        btnConfirmar.innerText = asistencia === "No asistiré" ? "ENVIAR RESPUESTA" : "CONFIRMAR ASISTENCIA";

        hideModal(3600);
    }
}

window.confirmarAsistencia = confirmarAsistencia;

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
        music.play().catch(err => console.log("Error al reanudar:", err));
    }
});
