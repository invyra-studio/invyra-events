/**
 * INVYRA - Master Script v4.5.2
 * Luxury Immersive Experience - Final Production Build
 * Update: Removed mute button and mute logic
 */

// 1. PRE-LOADER & INITIALIZATION
document.body.classList.add('js-enabled');

if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Aug 16, 2026 21:00:00";

// 2. ESTRUCTURA DE PARTÍCULAS DUALES (Top & Bottom) - HIGH DENSITY
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

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-top", commonConfig("bottom"));
        particlesJS("particles-bottom", commonConfig("top"));
    }
}

initParticles();

// 3. ENTRADA A LA EXPERIENCIA (CINEMATIC REVEAL)
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');

    // Desvanecer Splash Screen
    gsap.to(splash, {
        opacity: 0,
        duration: 1.2,
        onComplete: () => {
            splash.style.display = 'none';
            initScrollReveal();
        }
    });

    // Iniciar Música con Fade-in
    music.volume = 0;
    music.play().catch(err => console.log("Interacción requerida:", err));

    gsap.to(music, {
        volume: 0.35,
        duration: 4,
        ease: "power1.inOut"
    });

    // TIMELINE MAESTRO DE REVEAL (GAMA PREMIUM)
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

// 4. SCROLL EXPERIENCE (REVEALS)
function initScrollReveal() {
    document.querySelectorAll('.section-reveal').forEach(section => {
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

// 5. CUENTA REGRESIVA
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

// 6. RSVP FLOW
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

        inputNombre.style.border = "1px solid #ff4444";

        setTimeout(() => {
            inputNombre.style.border = "1px solid rgba(214, 179, 106, 0.35)";
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
                asistencia: "Confirmado"
            })
        });

        btnConfirmar.innerText = "¡TODO LISTO!";

        const mensaje = encodeURIComponent(
            `¡Hola! Confirmo mi asistencia a la Midnight Gala.\n\n*Invitado:* ${nombre}`
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

// 7. GESTIÓN DE VISIBILIDAD (GLOBAL LISTENER)
document.addEventListener("visibilitychange", () => {
    const music = document.getElementById('bg-music');
    const splash = document.getElementById('splash-screen');

    if (!music) return;

    if (document.hidden) {
        music.pause();
        console.log("QA Log: App en segundo plano - Audio pausado");
    } else {
        if (splash && splash.style.display === 'none') {
            music.play().catch(err => console.log("QA Log: Error al reanudar:", err));
            console.log("QA Log: App en primer plano - Audio reanudado");
        }
    }
});