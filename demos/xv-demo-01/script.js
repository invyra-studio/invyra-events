/**
 * INVYRA - XV Glam Demo
 * Nivel: Signature
 */

document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_r0T5FmXnHC5QUI6-talG8sXVywgmxvisnGtW9g26Xt-2ni1uk1Ffy-arETKwYmPt/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Nov 21, 2026 20:00:00";
const EVENTO_NOMBRE = "XV Glam Valentina";

function initHeroReveal() {
    if (typeof gsap === "undefined") {
        document.querySelectorAll(".hero-atmosphere, .reveal-item, .reveal-title, .hero-info-card").forEach(el => {
            el.style.opacity = "1";
            el.style.filter = "blur(0px)";
            el.style.transform = "none";
        });
        return;
    }

    const revealTL = gsap.timeline({
        delay: 0.2,
        defaults: {
            ease: "power3.out",
            duration: 1.25
        }
    });

    revealTL
        .to(".hero-atmosphere", {
            opacity: 1,
            duration: 1.4
        })
        .to(".brand-logo-img", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1
        }, "-=0.9")
        .to(".hero-kicker", {
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
            duration: 1.4
        }, "-=0.7")
        .to(".celebrant-name", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1
        }, "-=0.9")
        .to(".hero-info-card", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1
        }, "-=0.8");
}

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
                duration: 1.3,
                ease: "power3.out"
            }
        );
    });

    ScrollTrigger.refresh();
}

function entrarExperiencia() {
    const splash = document.getElementById("splash-screen");
    const music = document.getElementById("bg-music");

    if (!splash) return;

    splash.classList.add("opening");

    if (music) {
        music.volume = 0;
        music.play().catch(err => console.log("Audio requiere interacción:", err));

        if (typeof gsap !== "undefined") {
            gsap.to(music, {
                volume: 0.34,
                duration: 4,
                ease: "power1.inOut"
            });
        } else {
            music.volume = 0.34;
        }
    }

    if (typeof gsap !== "undefined") {
        gsap.to(splash, {
            opacity: 0,
            duration: 1.1,
            delay: 0.45,
            ease: "power2.inOut",
            onComplete: () => {
                splash.style.display = "none";
                initHeroReveal();
                initScrollReveal();
            }
        });
    } else {
        splash.style.display = "none";
        initHeroReveal();
        initScrollReveal();
    }
}

window.entrarExperiencia = entrarExperiencia;

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector(".btn-start-experience");

    if (startButton) {
        startButton.addEventListener("click", entrarExperiencia);
    }
});

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

async function confirmarAsistencia() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const btnConfirmar = document.getElementById("btn-confirmar");
    const modal = document.getElementById("rsvp-modal");

    if (!inputNombre || !btnConfirmar || !modal) return;

    const nombre = inputNombre.value.trim();
    const mensajeInvitado = inputMensaje ? inputMensaje.value.trim() : "";
    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";

    if (!nombre) {
        if (typeof gsap !== "undefined") {
            gsap.to(inputNombre, {
                x: 10,
                duration: 0.1,
                repeat: 5,
                yoyo: true
            });
        }

        inputNombre.style.border = "1px solid #ff6fbd";

        setTimeout(() => {
            inputNombre.style.border = "1px solid rgba(216, 180, 106, 0.28)";
        }, 2000);

        return;
    }

    modal.classList.remove("hidden");

    if (typeof gsap !== "undefined") {
        gsap.from(".modal-content", {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
    }

    btnConfirmar.innerText = "Procesando...";
    btnConfirmar.disabled = true;

    const payload = {
        nombre: nombre,
        asistencia: asistencia,
        mensaje: mensajeInvitado,
        evento: EVENTO_NOMBRE
    };

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(payload)
        });

        btnConfirmar.innerText = "¡Todo listo!";

        const mensajeWhatsApp = encodeURIComponent(
            `¡Hola! Confirmo mi respuesta para los XV de Valentina.\n\n` +
            `*Invitado:* ${nombre}\n` +
            `*Asistencia:* ${asistencia}\n` +
            `*Mensaje:* ${mensajeInvitado || "Sin mensaje"}`
        );

        setTimeout(() => {
            window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");

            modal.classList.add("hidden");
            btnConfirmar.disabled = false;
            btnConfirmar.innerText = "CONFIRMAR ASISTENCIA";

            inputNombre.value = "";
            if (inputMensaje) inputMensaje.value = "";

            const asistirRadio = document.querySelector('input[name="asistencia"][value="Asistiré"]');
            if (asistirRadio) asistirRadio.checked = true;
        }, 2200);

    } catch (error) {
        console.error("Error:", error);

        modal.classList.add("hidden");
        btnConfirmar.disabled = false;
        btnConfirmar.innerText = "CONFIRMAR ASISTENCIA";
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