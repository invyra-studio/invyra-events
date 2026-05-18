/**
 * INVYRA - Baby Shower Demo
 * Version 1.0.1
 * Nivel: Legacy emocional
 * Celestial Baby Luxury
 * RSVP automático por Google Sheets / Apps Script
 */

document.body.classList.add("js-enabled");

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reemplaza esta URL por la URL /exec del Apps Script de babyshower-demo-01.
 */
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeqwH1PtkO5Uvf17IrPu2V5gCOMQlVYkWIVFTG0U_8YzglZyL6nUAyEq-prqYoJ7cP/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Jul 20, 2026 16:00:00";
const EVENTO_NOMBRE = "Baby Shower de Yeison";

/* ==============================
   PREMIUM MOTION HELPERS
   ============================== */

function revealFallback() {
    document
        .querySelectorAll(
            ".hero-atmosphere, .reveal-item, .reveal-title, .hero-info-card, .section-reveal"
        )
        .forEach(el => {
            el.style.opacity = "1";
            el.style.filter = "blur(0px)";
            el.style.transform = "none";
        });
}

function initSplashIdleMotion() {
    if (typeof gsap === "undefined") return;

    gsap.to(".splash-content", {
        y: -8,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-logo", {
        scale: 1.04,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-title", {
        textShadow:
            "0 14px 34px rgba(23,40,70,0.14), 0 0 46px rgba(255,255,255,0.72)",
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".splash-moon", {
        scale: 1.06,
        opacity: 0.92,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

function initHeroReveal() {
    if (typeof gsap === "undefined") {
        revealFallback();
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
            duration: 1.6,
            stagger: 0.08
        })
        .fromTo(
            ".hero-moon-wrap",
            {
                opacity: 0,
                y: 28,
                scale: 0.88,
                filter: "blur(18px)"
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.7
            },
            "-=1.25"
        )
        .to(
            ".brand-logo-img",
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.1
            },
            "-=1.05"
        )
        .to(
            ".hero-kicker",
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1
            },
            "-=0.82"
        )
        .to(
            ".reveal-title",
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.55
            },
            "-=0.72"
        )
        .to(
            ".hero-phrase",
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.1
            },
            "-=0.88"
        )
        .to(
            ".hero-info-card",
            {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.15
            },
            "-=0.82"
        );

    initHeroIdleMotion();
}

function initHeroIdleMotion() {
    if (typeof gsap === "undefined") return;

    gsap.to(".hero-content", {
        y: -8,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-moon-wrap", {
        y: -14,
        scale: 1.04,
        duration: 6.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".main-title", {
        textShadow:
            "0 16px 34px rgba(23,40,70,0.14), 0 0 44px rgba(255,255,255,0.72), 0 0 28px rgba(143,199,236,0.34)",
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-phrase", {
        textShadow:
            "0 0 28px rgba(255,255,255,0.78), 0 0 24px rgba(230,201,143,0.34)",
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-info-card", {
        boxShadow:
            "0 28px 82px rgba(23,40,70,0.22), 0 0 42px rgba(143,199,236,0.22), inset 0 0 0 1px rgba(255,255,255,0.48)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
}

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
                y: 64,
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
                duration: 1.35,
                ease: "power3.out"
            }
        );
    });

    document
        .querySelectorAll(
            ".celestial-card, .detail-card, .theme-card, .gift-card, .wish-card, .rsvp-card, .countdown-card"
        )
        .forEach((card, index) => {
            gsap.to(card, {
                y: index % 2 === 0 ? -6 : -4,
                duration: 4.8 + index * 0.15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.08
            });
        });

    gsap.to(".section-star-orbit", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none"
    });

    gsap.to(".gift-stars, .wish-constellation, .rsvp-stars", {
        opacity: 0.78,
        scale: 1.03,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    ScrollTrigger.refresh();
}

/* ==============================
   OPEN EXPERIENCE
   ============================== */

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
                volume: 0.32,
                duration: 4,
                ease: "power1.inOut"
            });
        } else {
            music.volume = 0.32;
        }
    }

    if (typeof gsap !== "undefined") {
        const openTL = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            },
            onComplete: () => {
                splash.style.display = "none";
                initHeroReveal();
                initScrollReveal();
            }
        });

        openTL
            .to(".splash-cloud", {
                x: index => (index % 2 === 0 ? 80 : -80),
                opacity: 0.18,
                duration: 0.9,
                stagger: 0.05
            })
            .to(
                ".splash-moon",
                {
                    scale: 1.18,
                    opacity: 0,
                    filter: "blur(16px)",
                    duration: 0.9
                },
                "-=0.85"
            )
            .to(
                ".splash-content",
                {
                    opacity: 0,
                    y: 28,
                    scale: 0.96,
                    filter: "blur(10px)",
                    duration: 0.75
                },
                "-=0.78"
            )
            .to(
                splash,
                {
                    opacity: 0,
                    duration: 0.7
                },
                "-=0.25"
            );
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

    initSplashIdleMotion();
});

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

updateCountdown();
setInterval(updateCountdown, 1000);

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
                scale: 0.82,
                y: 18,
                filter: "blur(8px)"
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.55,
                ease: "back.out(1.7)"
            }
        );

        gsap.to(".modal-stars", {
            opacity: 0.78,
            scale: 1.04,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

function hideModal(delay = 3800) {
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
        if (!SCRIPT_URL || SCRIPT_URL === "PEGA_AQUI_LA_URL_DEL_APPS_SCRIPT_BABYSHOWER") {
            reject(new Error("Falta configurar la URL del Apps Script de Baby Shower."));
            return;
        }

        const callbackName = `invyraBabyCallback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
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
   RSVP
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
    const pases = inputPases.value.trim();
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

        inputNombre.style.border = "1px solid #c99b4a";

        setTimeout(() => {
            inputNombre.style.border = "1px solid rgba(201, 155, 74, 0.30)";
        }, 2000);

        return;
    }

    btnConfirmar.innerText = "Procesando...";
    btnConfirmar.disabled = true;

    try {
        const response = await sendRsvpToAppsScript({
            nombre,
            asistencia,
            pases,
            mensaje: mensajeInvitado,
            evento: EVENTO_NOMBRE
        });

        if (response && response.status === "duplicate") {
            setModalContent(
                "ASISTENCIA YA REGISTRADA",
                "Ya existe una respuesta registrada con este nombre para este evento."
            );

            showModal();

            btnConfirmar.innerText = "Asistencia ya registrada";
            btnConfirmar.disabled = true;

            hideModal(5200);
            return;
        }

        if (response && response.status === "success") {
            setModalContent(
                "¡RESPUESTA REGISTRADA!",
                "Gracias por confirmar. En un momento abriremos WhatsApp para completar tu mensaje."
            );

            showModal();

            btnConfirmar.innerText = "¡Todo listo!";

            const mensajeWhatsApp = encodeURIComponent(
                `¡Hola! Confirmo mi respuesta para el Baby Shower de Yeison.\n\n` +
                `*Invitado:* ${nombre}\n` +
                `*Asistencia:* ${asistencia}\n` +
                `*Pases:* ${pases}\n` +
                `*Deseo para el bebé:* ${mensajeInvitado || "Sin mensaje"}`
            );

            setTimeout(() => {
                window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");

                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                btnConfirmar.innerText = "Asistencia ya registrada";
                btnConfirmar.disabled = true;
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
        btnConfirmar.innerText = "CONFIRMAR ASISTENCIA";

        hideModal(4200);
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