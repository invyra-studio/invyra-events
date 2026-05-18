/**
 * INVYRA - Wedding Legacy Demo
 * Version 1.0.7
 * Updates:
 * - Premium RSVP modal
 * - Local visual lock after confirmation
 * - RSVP complete payload for Google Sheets
 * - Safer open invitation flow
 */

document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_r0T5FmXnHC5QUI6-talG8sXVywgmxvisnGtW9g26Xt-2ni1uk1Ffy-arETKwYmPt/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Feb 14, 2027 17:30:00";

const RSVP_STORAGE_KEY = "invyra_rsvp_boda_aurora_matteo";

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
            duration: 1.5
        })
        .to(".brand-logo-img", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2
        }, "-=1.0")
        .to(".hero-kicker", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.0
        }, "-=0.8")
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
        .to(".hero-info-card", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1
        }, "-=1.0");
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
                duration: 1.45,
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
            duration: 1.15,
            delay: 0.55,
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

/* ==============================
   RSVP LOCAL STATUS
   ============================== */

function hasAlreadyConfirmed() {
    return localStorage.getItem(RSVP_STORAGE_KEY) === "true";
}

function lockRsvpForm() {
    const form = document.querySelector(".rsvp-form");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const radios = document.querySelectorAll('input[name="asistencia"]');

    if (form) {
        form.classList.add("rsvp-locked");
    }

    if (btnConfirmar) {
        btnConfirmar.innerText = "ASISTENCIA YA REGISTRADA";
        btnConfirmar.disabled = true;
        btnConfirmar.classList.add("rsvp-disabled");
    }

    if (inputNombre) {
        inputNombre.disabled = true;
    }

    if (inputMensaje) {
        inputMensaje.disabled = true;
    }

    radios.forEach(radio => {
        radio.disabled = true;
    });
}

function markRsvpAsConfirmed() {
    localStorage.setItem(RSVP_STORAGE_KEY, "true");
    lockRsvpForm();
}

document.addEventListener("DOMContentLoaded", () => {
    if (hasAlreadyConfirmed()) {
        lockRsvpForm();
    }
});

/* ==============================
   COUNTDOWN
   ============================== */

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

/* ==============================
   RSVP FLOW
   ============================== */

async function confirmarAsistencia() {
    if (hasAlreadyConfirmed()) {
        lockRsvpForm();
        return;
    }

    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const btnConfirmar = document.getElementById("btn-confirmar");
    const modal = document.getElementById("rsvp-modal");

    if (!inputNombre || !inputMensaje || !btnConfirmar || !modal) return;

    const nombre = inputNombre.value.trim();
    const mensajeInvitado = inputMensaje.value.trim();
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

        inputNombre.style.border = "1px solid #b65b5b";

        setTimeout(() => {
            inputNombre.style.border = "1px solid #111";
        }, 2000);

        return;
    }

    modal.classList.remove("hidden");

    if (typeof gsap !== "undefined") {
        gsap.from(".modal-content", {
            opacity: 0,
            scale: 0.86,
            duration: 0.55,
            ease: "back.out(1.7)"
        });
    }

    btnConfirmar.innerText = "Procesando...";
    btnConfirmar.disabled = true;

    try {
        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({
                nombre: nombre,
                asistencia: asistencia,
                mensaje: mensajeInvitado,
                evento: "Boda Aurora & Matteo"
            })
        });

        btnConfirmar.innerText = "¡Todo listo!";
        markRsvpAsConfirmed();

        const mensajeWhatsApp = encodeURIComponent(
            `¡Hola! Confirmo mi respuesta para la boda de Aurora & Matteo.\n\n` +
            `*Invitado:* ${nombre}\n` +
            `*Asistencia:* ${asistencia}\n` +
            `*Mensaje:* ${mensajeInvitado || "Sin mensaje"}`
        );

        setTimeout(() => {
            window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");
            modal.classList.add("hidden");
        }, 2400);

    } catch (error) {
        console.error("Error:", error);

        modal.classList.add("hidden");
        btnConfirmar.disabled = false;
        btnConfirmar.innerText = "Confirmar asistencia";
        btnConfirmar.classList.remove("rsvp-disabled");
    }
}

window.confirmarAsistencia = confirmarAsistencia;

/* ==============================
   AUDIO VISIBILITY
   ============================== */

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

/* 
   QA helper para pruebas locales:
   Pega esto en consola si necesitas volver a probar el RSVP:

   localStorage.removeItem("invyra_rsvp_boda_aurora_matteo");
*/