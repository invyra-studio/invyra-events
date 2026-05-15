/**
 * INVYRA - Wedding Legacy Demo
 * Luxury Wedding Experience
 * Visual system: Classic envelope + ivory champagne sage palette
 */

document.body.classList.add('js-enabled');

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Feb 14, 2027 17:30:00";

function entrarExperiencia() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');

    splash.classList.add('opening');

    gsap.to(splash, {
        opacity: 0,
        duration: 1.15,
        delay: 0.55,
        ease: "power2.inOut",
        onComplete: () => {
            splash.style.display = 'none';
            initScrollReveal();
        }
    });

    music.volume = 0;
    music.play().catch(err => console.log("Interacción requerida:", err));

    gsap.to(music, {
        volume: 0.34,
        duration: 4,
        ease: "power1.inOut"
    });

    const revealTL = gsap.timeline({
        delay: 0.55,
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

function initScrollReveal() {
    document.querySelectorAll('.section-reveal').forEach(section => {
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
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
}, 1000);

async function confirmarAsistencia() {
    const inputNombre = document.getElementById('nombreInvitado');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const modal = document.getElementById('rsvp-modal');
    const nombre = inputNombre.value.trim();

    if (!nombre) {
        gsap.to(inputNombre, {
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true
        });

        inputNombre.style.border = "1px solid #b65b5b";

        setTimeout(() => {
            inputNombre.style.border = "1px solid rgba(184, 138, 68, 0.28)";
        }, 2000);

        return;
    }

    modal.classList.remove('hidden');

    gsap.from(".modal-content", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.out(1.7)"
    });

    btnConfirmar.innerText = "PROCESANDO...";
    btnConfirmar.disabled = true;

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                nombre: nombre,
                asistencia: "Confirmado",
                evento: "Boda Aurora & Matteo"
            })
        });

        btnConfirmar.innerText = "¡TODO LISTO!";

        const mensaje = encodeURIComponent(
            `¡Hola! Confirmo mi asistencia a la boda de Aurora & Matteo.\n\n*Invitado:* ${nombre}`
        );

        setTimeout(() => {
            window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensaje}`, '_blank');
            modal.classList.add('hidden');
        }, 2800);

    } catch (error) {
        console.error("Error:", error);
        modal.classList.add('hidden');
        btnConfirmar.disabled = false;
    }
}

document.addEventListener("visibilitychange", () => {
    const music = document.getElementById('bg-music');
    const splash = document.getElementById('splash-screen');

    if (!music) return;

    if (document.hidden) {
        music.pause();
    } else {
        if (splash && splash.style.display === 'none') {
            music.play().catch(err => console.log("Error al reanudar:", err));
        }
    }
});