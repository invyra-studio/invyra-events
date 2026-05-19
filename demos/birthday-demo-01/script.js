/**
 * INVYRA - Birthday Demo 01
 * Midnight Gala RSVP Premium
 * Version 1.1.8
 * Server-side RSVP validation through Google Sheets / Apps Script
 * Update: Standardized Essential RSVP flow
 */

document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpV7Xn9bgxBkV2B6x6YJ1wfxPfXPB3g8IWI-IhlpXBEk6IFFT8Ay0sfhHLLr58yVoc/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Aug 16, 2026 21:00:00";
const EVENTO_NOMBRE = "Birthday Demo 01 - Midnight Gala Erza";

function initParticles() {
    const commonConfig = (direction) => ({
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
                direction: direction,
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

initParticles();

function entrarGala() {
    const splash = document.getElementById("splash-screen");
    const music = document.getElementById("bg-music");

    if (!splash) return;

    if (typeof gsap !== "undefined") {
        gsap.to(splash, {
            opacity: 0,
            duration: 1.2,
            onComplete: () => {
                splash.style.display = "none";
                initScrollReveal();
            }
        });
    } else {
        splash.style.display = "none";
        initScrollReveal();
    }

    if (music) {
        music.volume = 0;
        music.play().catch(err => console.log("Interacción requerida:", err));

        if (typeof gsap !== "undefined") {
            gsap.to(music, {
                volume: 0.35,
                duration: 4,
                ease: "power1.inOut"
            });
        } else {
            music.volume = 0.35;
        }
    }

    if (typeof gsap === "undefined") {
        document.querySelectorAll(".hero-atmosphere, .reveal-item, .reveal-title").forEach(el => {
            el.style.opacity = "1";
            el.style.filter = "blur(0px)";
            el.style.transform = "none";
        });
        return;
    }

    const revealTL = gsap.timeline({
        defaults: {
            ease: "power3.out",
            duration: 1.25
        }
    });

    revealTL
        .to(".hero-atmosphere", {
            opacity: 1,
            duration: 1.5
        })
        .to(".brand-logo-img", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2
        }, "-=1.0")
        .to(".pre-title", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0
        }, "-=0.8")
        .to(".reveal-title", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6
        }, "-=0.7")
        .to(".celebrant-name", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1
        }, "-=1.0")
        .to(".hero-subtitle", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1
        }, "-=0.9");
}

window.entrarGala = entrarGala;

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".btn-start-experience");

    if (startButton) {
        startButton.addEventListener("click", entrarGala);
    }

    initRsvpState();
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

const targetDate = new Date(FECHA_EVENTO).getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const mins = document.getElementById("mins");
        const secs = document.getElementById("secs");

        if (!days || !hours || !mins || !secs) return;

        days.innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
        hours.innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
        mins.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
        secs.innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, "0");
    }
}, 1000);

function initRsvpState() {
    const radios = document.querySelectorAll('input[name="asistencia"]');

    radios.forEach(radio => {
        radio.addEventListener("change", actualizarEstadoAsistencia);
    });

    actualizarEstadoAsistencia();
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

    const nombre = inputNombre.value.trim();
    const mensajeInvitado = inputMensaje.value.trim();
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
    } else {
        if (splash && splash.style.display === "none") {
            music.play().catch(err => console.log("Error al reanudar:", err));
        }
    }
});