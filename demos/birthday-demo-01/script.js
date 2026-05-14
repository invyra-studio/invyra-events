/**
 * INVYRA - Master Script v4.5.3
 * Luxury Immersive Experience - Final Production Build
 * Fix: High-PPI Visibility & Particle Soul Boost
 */

// 1. PRE-LOADER & INITIALIZATION
document.body.classList.add('js-enabled');
gsap.registerPlugin(ScrollTrigger);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525535690278"; 
const FECHA_EVENTO = "Apr 09, 2027 21:00:00";
let isMuted = false;

const ICON_SOUND = `
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
`;
const ICON_MUTE = `
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
`;

/**
 * 2. ESTRUCTURA DE PARTÍCULAS DUALES (Ultra Visibility Mode)
 */
function initParticles() {
    if (typeof particlesJS === 'undefined') return;

    // BOOST SUPERIOR: Polvo estelar denso (Caída)
    particlesJS("particles-top", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#c5a059" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.8, "random": true }, // Opacidad aumentada
            "size": { "value": 3.5, "random": true },    // Tamaño escalado para pantallas 4K/PPI alto
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 1.2,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false } } },
        "retina_detect": true // Vital para Galaxy S25 Ultra
    });

    // BOOST INFERIOR: Destellos de gala (Ascenso)
    particlesJS("particles-bottom", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#c5a059" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.8, "random": true },
            "size": { "value": 4.5, "random": true },    // Ligeramente más grandes abajo
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false } } },
        "retina_detect": true
    });
}

// Inicialización forzada tras carga completa
window.addEventListener('load', () => {
    initParticles();
    setTimeout(() => ScrollTrigger.refresh(), 500);
});


/**
 * 3. CONTROL DE AUDIO
 */
function toggleMute() {
    const music = document.getElementById('bg-music');
    const muteIcon = document.getElementById('mute-icon');
    const muteBtn = document.querySelector('.mute-control');
    
    if (!music || !muteIcon) return;

    isMuted = !isMuted;
    music.muted = isMuted;

    if (isMuted) {
        muteIcon.innerHTML = ICON_MUTE;
        gsap.to(muteBtn, { opacity: 0.6, duration: 0.3 });
    } else {
        muteIcon.innerHTML = ICON_SOUND;
        gsap.to(muteBtn, { opacity: 1, duration: 0.3 });
        if (music.paused) music.play().catch(e => console.log(e));
    }
}

/**
 * 4. ENTRADA A LA EXPERIENCIA
 */
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    const muteIcon = document.getElementById('mute-icon');
    
    if (!splash) return;

    gsap.to(splash, { 
        opacity: 0, 
        duration: 1.2, 
        ease: "power2.inOut",
        onComplete: () => {
            splash.style.display = 'none';
            initScrollReveal();
        }
    });

    if (music) {
        music.volume = 0;
        const promise = music.play();
        if (promise !== undefined) {
            promise.then(() => {
                gsap.to(music, { volume: 0.35, duration: 4 });
                isMuted = false;
            }).catch(() => {
                isMuted = true;
                music.muted = true;
                if (muteIcon) muteIcon.innerHTML = ICON_MUTE;
            });
        }
    }

    const tl = gsap.timeline({ delay: 0.5 });
    tl.from(".brand-logo-img", { opacity: 0, y: -40, duration: 1.5, ease: "power3.out" })
      .from(".main-title", { opacity: 0, y: 60, duration: 1.5, ease: "power3.out" }, "-=1")
      .from(".celebrant-name", { opacity: 0, duration: 1 }, "-=0.8")
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 1.2 }, "-=0.5");
}

/**
 * 5. SCROLL EXPERIENCE
 */
function initScrollReveal() {
    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                opacity: 1, y: 0, duration: 1.5, ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    const locLink = document.querySelector(".location-link");
    if (locLink) {
        gsap.to(locLink, {
            y: -8, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut"
        });
    }
}

/**
 * 6. CUENTA REGRESIVA
 */
const countDownDate = new Date(FECHA_EVENTO).getTime();
const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const d = document.getElementById('days'), h = document.getElementById('hours'), 
          m = document.getElementById('mins'), s = document.getElementById('secs');

    if (d) {
        d.innerText = String(days).padStart(2, '0');
        h.innerText = String(hours).padStart(2, '0');
        m.innerText = String(minutes).padStart(2, '0');
        s.innerText = String(seconds).padStart(2, '0');
    }

    if (distance < 0) {
        clearInterval(x);
        if (document.getElementById('countdown')) 
            document.getElementById('countdown').innerHTML = "¡EL DÍA HA LLEGADO!";
    }
}, 1000);

/**
 * 7. RSVP FLOW
 */
async function confirmarAsistencia() {
    const inputNombre = document.getElementById('nombreInvitado');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const modal = document.getElementById('rsvp-modal');
    
    if (!inputNombre) return;
    const nombre = inputNombre.value.trim();

    if (nombre.length < 3) {
        gsap.to(inputNombre, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        return;
    }

    btnConfirmar.innerText = "PROCESANDO...";
    btnConfirmar.disabled = true;

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('asistencia', "Confirmado");

    try {
        await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: formData });
        
        btnConfirmar.innerText = "¡TODO LISTO!";
        btnConfirmar.style.backgroundColor = "var(--success-whatsapp)";

        modal.classList.remove('hidden');
        gsap.from(".modal-content", { opacity: 0, scale: 0.8, duration: 0.5, ease: "back.out" });

        const mensajeWa = encodeURIComponent(`¡Hola Javier! ✨\n\nConfirmo mi asistencia a la *Midnight Gala*.\n\n*Invitado:* ${nombre}`);
        
        setTimeout(() => {
            window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensajeWa}`, '_blank');
        }, 2800);
    } catch (error) {
        console.error(error);
    }
}