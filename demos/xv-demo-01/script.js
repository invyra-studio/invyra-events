/**
 * INVYRA - XV Glam Demo
 * Version 1.3.0
 * Nivel: Signature Glam / Legacy visual
 * Update: Signature Glam runway reveal, cinematic stage transitions, RSVP autosave/restore and audio visibility control
 */

document.body.classList.add("js-enabled", "splash-active");

/* ==============================
   CONFIG
   ============================== */

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzJz6sBTdrgkDSQwTD3Gcl3gzDOj4qE3HYBjSfMbWo99uRUM_DAluFzH5uNhcm2UKIxVw/exec";

const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Nov 21, 2026 20:00:00";
const EVENTO_NOMBRE = "XV de Valentina";
const RSVP_STORAGE_KEY = "invyra_xv_valentina_rsvp_registered";
const RSVP_DRAFT_KEY = "invyra_xv_valentina_rsvp_draft";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let experienceAlreadyOpened = false;

/* ==============================
   INIT
   ============================== */

if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener("DOMContentLoaded", () => {
    initCountdown();
    initRsvpState();
    initRsvpAutosave();
    initModalClose();
  initImageFallbacks();
});

/* ==============================
   SPLASH → HERO
   ============================== */

function entrarExperiencia() {
    const splash = document.getElementById("splash-screen");
    const startButton = document.querySelector(".btn-start-experience");
    const music = document.getElementById("bg-music");

    if (!splash || experienceAlreadyOpened) return;

    experienceAlreadyOpened = true;

    if (startButton) startButton.disabled = true;

    playMusicSafely(music);

    if (prefersReducedMotion || typeof gsap === "undefined") {
        splash.classList.add("opening");

        window.setTimeout(() => {
            splash.classList.add("is-hidden");

            document.body.classList.remove("splash-active");
            document.body.classList.add("experience-opened");

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

            window.setTimeout(() => {
                splash.style.display = "none";
                revealHero();
                initScrollReveal();
            }, 420);
        }, 560);

        return;
    }

    splash.classList.add("opening");

    const openTL = gsap.timeline({
        defaults: {
            ease: "power3.inOut"
        },
        onComplete: () => {
            splash.classList.add("is-hidden");

            document.body.classList.remove("splash-active");
            document.body.classList.add("experience-opened");

            window.scrollTo({
                top: 0,
                behavior: "auto"
            });

            window.setTimeout(() => {
                splash.style.display = "none";
                revealHero();
                initScrollReveal();
            }, 180);
        }
    });

    openTL
        .to(".splash-diamond-frame", {
            scale: 1.08,
            opacity: 0.72,
            duration: 0.38
        })
        .to(".stage-beam", {
            opacity: 0.95,
            filter: "blur(8px)",
            duration: 0.42,
            stagger: 0.04
        }, "<")
        .to(".splash-content", {
            y: -18,
            scale: 1.035,
            filter: "blur(0px)",
            duration: 0.34
        }, "<")
        .to(".curtain-left", {
            xPercent: -105,
            rotate: -4,
            opacity: 0.75,
            duration: 0.78
        }, "-=0.02")
        .to(".curtain-right", {
            xPercent: 105,
            rotate: 4,
            opacity: 0.75,
            duration: 0.78
        }, "<")
        .to(".runway-floor", {
            opacity: 0,
            y: 70,
            scale: 1.08,
            duration: 0.58
        }, "-=0.48")
        .to(".splash-content", {
            opacity: 0,
            y: -58,
            scale: 0.92,
            filter: "blur(10px)",
            duration: 0.58
        }, "-=0.46")
        .to(".glam-orb, .glitter-layer, .diamond-rain, .stage-beam, .splash-diamond-frame", {
            opacity: 0,
            scale: 1.12,
            duration: 0.48,
            stagger: 0.02
        }, "-=0.34")
        .to("#splash-screen", {
            opacity: 0,
            scale: 1.02,
            duration: 0.36
        }, "-=0.24");
}

window.entrarExperiencia = entrarExperiencia;

function playMusicSafely(music) {
    if (!music) return;

    music.volume = 0;

    music.play()
        .then(() => {
            if (typeof gsap !== "undefined" && !prefersReducedMotion) {
                gsap.to(music, {
                    volume: 0.34,
                    duration: 3,
                    ease: "power1.inOut"
                });
            } else {
                music.volume = 0.34;
            }
        })
        .catch(error => {
            console.warn("La música requiere interacción del usuario:", error);
        });
}

/* ==============================
   HERO / SCROLL REVEAL
   ============================== */

function revealHero() {
    const fallbackElements = document.querySelectorAll(
        ".hero-atmosphere, .reveal-item, .reveal-title, .hero-info-card, .hero-runway, .hero-light-bars, .hero-diamond-frame, .hero-lens-flare"
    );

    if (prefersReducedMotion || typeof gsap === "undefined") {
        fallbackElements.forEach(showElementImmediately);
        return;
    }

    const revealTL = gsap.timeline({
        delay: 0.12,
        defaults: {
            ease: "power3.out",
            duration: 1.1
        }
    });

    revealTL
        .to(".hero-atmosphere", {
            opacity: 1,
            duration: 0.78
        })
        .fromTo(".hero-diamond-frame", {
            opacity: 0,
            scale: 0.72,
            rotate: -4
        }, {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.92,
            ease: "power4.out"
        }, "-=0.45")
        .to(".hero-lens-flare", {
            opacity: 1,
            x: "28%",
            duration: 0.58,
            ease: "power2.out"
        }, "-=0.62")
        .to(".brand-logo-img", {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.72
        }, "-=0.36")
        .to(".hero-kicker", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.68
        }, "-=0.48")
        .fromTo(".reveal-title", {
            opacity: 0,
            y: 62,
            scale: 1.18,
            filter: "blur(16px)",
            letterSpacing: "0.18em"
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            letterSpacing: "0.02em",
            duration: 1.05,
            ease: "expo.out"
        }, "-=0.28")
        .to(".celebrant-name", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.82
        }, "-=0.72")
        .to(".hero-info-card", {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.78
        }, "-=0.58")
        .to(".hero-lens-flare", {
            opacity: 0,
            x: "70%",
            duration: 0.8
        }, "-=0.56");

    gsap.to(".hero-content", {
        y: -6,
        duration: 5.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-diamond-frame", {
        scale: 1.025,
        opacity: 0.86,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero-runway span", {
        opacity: 0.82,
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.16
    });

    if (typeof ScrollTrigger !== "undefined") {
        window.setTimeout(() => {
            ScrollTrigger.refresh();
        }, 450);
    }
}

function initScrollReveal() {
    const sections = document.querySelectorAll(".section-reveal");

    if (!sections.length) return;

    if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
        sections.forEach(showElementImmediately);
        return;
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                showSection(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    sections.forEach(section => observer.observe(section));
}

function showSection(section) {
    if (!section) return;

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "power3.out"
        });

        return;
    }

    showElementImmediately(section);
}

function showElementImmediately(element) {
    if (!element) return;

    element.style.opacity = "1";
    element.style.transform = "none";
    element.style.filter = "none";
}

/* ==============================
   COUNTDOWN
   ============================== */

function initCountdown() {
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const mins = document.getElementById("mins");
    const secs = document.getElementById("secs");

    if (!days || !hours || !mins || !secs) return;

    const targetDate = new Date(FECHA_EVENTO).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            mins.textContent = "00";
            secs.textContent = "00";
            return;
        }

        days.textContent = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0");
        hours.textContent = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, "0");
        mins.textContent = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
        secs.textContent = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
}

/* ==============================
   RSVP STATE
   ============================== */

function initRsvpState() {
    const radios = document.querySelectorAll('input[name="asistencia"]');

    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            actualizarEstadoAsistencia();
            saveRsvpDraft();
        });
    });

    actualizarEstadoAsistencia();

    if (localStorage.getItem(RSVP_STORAGE_KEY) === "true") {
        bloquearFormularioComoRegistrado();
    }
}

function actualizarEstadoAsistencia() {
    const asistenciaSeleccionada = document.querySelector('input[name="asistencia"]:checked');
    const detalleAsistencia = document.getElementById("detalleAsistenciaInvitado");
    const detalleGroup = document.getElementById("detalleAsistenciaGroup");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const rsvpCard = document.querySelector(".rsvp-card");

    const asistencia = asistenciaSeleccionada ? asistenciaSeleccionada.value : "Asistiré";
    const noAsiste = asistencia === "No asistiré";

    if (detalleAsistencia) {
        detalleAsistencia.disabled = noAsiste;

        if (noAsiste) {
            detalleAsistencia.value = "Todo el evento";
        }
    }

    if (detalleGroup) {
        detalleGroup.classList.toggle("is-disabled", noAsiste);
    }

    if (rsvpCard) {
        rsvpCard.classList.toggle("rsvp-not-attending", noAsiste);
    }

    if (btnConfirmar && !btnConfirmar.disabled) {
        btnConfirmar.textContent = noAsiste ? "Enviar respuesta" : "Confirmar asistencia";
    }
}

/* ==============================
   RSVP AUTOSAVE / RESTORE
   ============================== */

function initRsvpAutosave() {
    restoreRsvpDraft();

    const fields = [
        document.getElementById("nombreInvitado"),
        document.getElementById("mensajeInvitado"),
        document.getElementById("detalleAsistenciaInvitado")
    ].filter(Boolean);

    const radios = Array.from(document.querySelectorAll('input[name="asistencia"]'));

    fields.forEach(field => {
        field.addEventListener("input", saveRsvpDraft);
        field.addEventListener("change", saveRsvpDraft);
    });

    radios.forEach(radio => {
        radio.addEventListener("change", saveRsvpDraft);
    });
}

function getRsvpDraftData() {
    const nombreInput = document.getElementById("nombreInvitado");
    const mensajeInput = document.getElementById("mensajeInvitado");
    const detalleInput = document.getElementById("detalleAsistenciaInvitado");
    const asistenciaInput = document.querySelector('input[name="asistencia"]:checked');

    return {
        nombre: nombreInput ? nombreInput.value : "",
        mensaje: mensajeInput ? mensajeInput.value : "",
        detalleAsistencia: detalleInput ? detalleInput.value : "Todo el evento",
        asistencia: asistenciaInput ? asistenciaInput.value : "Asistiré"
    };
}

function saveRsvpDraft() {
    if (localStorage.getItem(RSVP_STORAGE_KEY) === "true") return;

    try {
        localStorage.setItem(RSVP_DRAFT_KEY, JSON.stringify(getRsvpDraftData()));
    } catch (error) {
        console.warn("No se pudo guardar el borrador RSVP:", error);
    }
}

function restoreRsvpDraft() {
    if (localStorage.getItem(RSVP_STORAGE_KEY) === "true") return;

    try {
        const savedDraft = localStorage.getItem(RSVP_DRAFT_KEY);

        if (!savedDraft) return;

        const data = JSON.parse(savedDraft);

        const nombreInput = document.getElementById("nombreInvitado");
        const mensajeInput = document.getElementById("mensajeInvitado");
        const detalleInput = document.getElementById("detalleAsistenciaInvitado");
        const asistenciaInput = document.querySelector(
            `input[name="asistencia"][value="${data.asistencia || "Asistiré"}"]`
        );

        if (nombreInput && data.nombre) nombreInput.value = data.nombre;
        if (mensajeInput && data.mensaje) mensajeInput.value = data.mensaje;
        if (detalleInput && data.detalleAsistencia) detalleInput.value = data.detalleAsistencia;

        if (asistenciaInput) {
            asistenciaInput.checked = true;
        }

        actualizarEstadoAsistencia();
    } catch (error) {
        console.warn("No se pudo restaurar el borrador RSVP:", error);
        clearRsvpDraft();
    }
}

function clearRsvpDraft() {
  try {
    localStorage.removeItem(RSVP_DRAFT_KEY);
  } catch (error) {
    console.warn("No se pudo limpiar el borrador RSVP:", error);
  }
}

/* ==============================
   MODAL HELPERS
   ============================== */

function setModalContent(title, message) {
    const modalTitle = document.getElementById("modal-title");
    const modalMessage = document.getElementById("modal-message");

    if (modalTitle) modalTitle.textContent = title;
    if (modalMessage) modalMessage.textContent = message;
}

function showModal(title, message) {
    const modal = document.getElementById("rsvp-modal");

    if (!modal) {
        alert(`${title}\n\n${message}`);
        return;
    }

    setModalContent(title, message);
    modal.classList.remove("hidden");

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.from(".modal-content", {
            opacity: 0,
            scale: 0.86,
            duration: 0.45,
            ease: "back.out(1.7)"
        });
    }
}

function hideModal(delay = 3600) {
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
   APPS SCRIPT JSONP
   ============================== */

function sendRsvpToAppsScript(data) {
    return new Promise((resolve, reject) => {
        if (!SCRIPT_URL || SCRIPT_URL === "PEGA_AQUI_LA_URL_DEL_APPS_SCRIPT_DE_XV") {
            reject(new Error("Falta configurar la URL del Apps Script de XV."));
            return;
        }

        const callbackName = `invyraXVCallback_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        const script = document.createElement("script");

        const timeout = window.setTimeout(() => {
            cleanup();
            reject(new Error("Tiempo de espera agotado al conectar con Apps Script."));
        }, 12000);

        function cleanup() {
            window.clearTimeout(timeout);

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

            resolve(
                response || {
                    status: "error",
                    message: "Respuesta vacía del servidor."
                }
            );
        };

        const params = new URLSearchParams({
            callback: callbackName,
            nombre: data.nombre,
            asistencia: data.asistencia,
            mensaje: data.mensaje,
            evento: data.evento,
            detalleAsistencia: data.detalleAsistencia
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
   RSVP FLOW
   ============================== */

function bloquearFormularioComoRegistrado() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const detalleAsistencia = document.getElementById("detalleAsistenciaInvitado");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const radios = document.querySelectorAll('input[name="asistencia"]');

    if (inputNombre) inputNombre.disabled = true;
    if (inputMensaje) inputMensaje.disabled = true;
    if (detalleAsistencia) detalleAsistencia.disabled = true;

    radios.forEach(radio => {
        radio.disabled = true;
    });

    if (btnConfirmar) {
        btnConfirmar.textContent = "Asistencia ya registrada";
        btnConfirmar.disabled = true;
    }
}

function marcarCampoInvalido(campo) {
    if (!campo) return;

    campo.classList.add("field-warning");

    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
        gsap.to(campo, {
            x: 8,
            duration: 0.08,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
                campo.style.transform = "none";
            }
        });
    }

    window.setTimeout(() => {
        campo.classList.remove("field-warning");
    }, 1800);
}

async function confirmarAsistencia() {
    const inputNombre = document.getElementById("nombreInvitado");
    const inputMensaje = document.getElementById("mensajeInvitado");
    const detalleAsistenciaInput = document.getElementById("detalleAsistenciaInvitado");
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
            : "Todo el evento";

    if (!nombre) {
        showModal(
            "Falta tu nombre",
            "Escribe el nombre del invitado o familia para registrar la respuesta."
        );
        marcarCampoInvalido(inputNombre);
        return;
    }

    btnConfirmar.textContent = "Guardando respuesta...";
    btnConfirmar.disabled = true;

    try {
        const response = await sendRsvpToAppsScript({
            nombre,
            asistencia,
            mensaje: mensajeInvitado,
            evento: EVENTO_NOMBRE,
            detalleAsistencia
        });

        if (response && response.status === "duplicate") {
            showModal(
                "Asistencia ya registrada",
                "Ya tenemos una respuesta asociada a este nombre. Gracias por ser parte de esta noche tan especial."
            );

            window.setTimeout(() => {
                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                localStorage.setItem(RSVP_STORAGE_KEY, "true");
                clearRsvpDraft();

                bloquearFormularioComoRegistrado();
            }, 5200);

            return;
        }

        if (response && response.status === "success") {
            showModal(
                "¡Respuesta registrada!",
                "Gracias por confirmar. Tu respuesta quedó guardada correctamente. En un momento abriremos WhatsApp para completar tu mensaje."
            );

            btnConfirmar.textContent = "¡Todo listo!";

            localStorage.setItem(RSVP_STORAGE_KEY, "true");
            clearRsvpDraft();

            const mensajeWhatsApp = encodeURIComponent(
                `¡Hola! Confirmo mi respuesta para los XV de Valentina.\n\n` +
                `*Invitado:* ${nombre}\n` +
                `*Asistencia:* ${asistencia}\n` +
                `*Confirmación para:* ${detalleAsistencia}\n` +
                `*Mensaje:* ${mensajeInvitado || "Sin mensaje"}`
            );

            window.setTimeout(() => {
                window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWhatsApp}`, "_blank");

                const modal = document.getElementById("rsvp-modal");
                if (modal) modal.classList.add("hidden");

                bloquearFormularioComoRegistrado();
            }, 3200);

            return;
        }

        throw new Error(response?.message || "Respuesta inesperada de Apps Script.");
    } catch (error) {
        console.error("Error RSVP:", error);

        showModal(
            "No se pudo registrar",
            "Ocurrió un detalle al guardar tu respuesta. Inténtalo nuevamente en unos segundos."
        );

        btnConfirmar.disabled = false;
        btnConfirmar.textContent = asistencia === "No asistiré" ? "Enviar respuesta" : "Confirmar asistencia";

        hideModal(4200);
    }
}

window.confirmarAsistencia = confirmarAsistencia;

function cleanText(value) {
    return String(value || "")
        .trim()
        .replace(/\s+/g, " ");
}


/* ==============================
   IMAGE FALLBACKS
   ============================== */

function initImageFallbacks() {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      const fallbackSrc =
        image.dataset.fallbackSrc ||
        getAlternativeImagePath(image.getAttribute("src"));

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

  if (/\.jpeg(\?.*)?$/i.test(src)) return src.replace(/\.jpeg(\?.*)?$/i, ".png");
  if (/\.jpg(\?.*)?$/i.test(src)) return src.replace(/\.jpg(\?.*)?$/i, ".png");
  if (/\.png(\?.*)?$/i.test(src)) return src.replace(/\.png(\?.*)?$/i, ".jpeg");

  return "";
}

function initGalleryBackgroundFallbacks() {
  const galleryItems = document.querySelectorAll(".gallery-item[data-bg-base]");

  galleryItems.forEach((item) => {
    const baseName = item.dataset.bgBase;

    if (!baseName) return;

    const candidates = [
      `./assets/${baseName}.jpeg`,
      `./assets/${baseName}.jpg`,
      `./assets/${baseName}.png`,
    ];

    findFirstLoadableImage(candidates).then((src) => {
      if (src) {
        item.style.backgroundImage = `url("${src}")`;
      }
    });
  });
}

function findFirstLoadableImage(candidates) {
  return new Promise((resolve) => {
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
   AUDIO VISIBILITY HANDLER
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
