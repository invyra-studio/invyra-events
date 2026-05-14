/**
 * INVYRA - Master Script v4.5.3
 * Luxury Immersive Experience - Erza 22th Birthday Build
 * QA Fix: Restored dust particles (removed lines)
 */

document.body.classList.add('js-enabled');
if (typeof gsap !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Aug 16, 2026 21:00:00"; 
let isMuted = false;

// 2. CONFIGURACIÓN DE PARTÍCULAS (RECUPERANDO EL LOOK PREMIUM)
function initParticles() {
    const commonConfig = (direction) => ({
        "particles": {
            "number": { "value": 120, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#c5a059" },
            "shape": { "type": "circle" },
            "opacity": { 
                "value": 0.8, 
                "random": false, 
                "anim": { "enable": true, "speed": 1, "opacity_min": 0.4, "sync": false } 
            },
            "size": { "value": 1.5, "random": true },
            "line_linked": { "enable": false }, // ESTO ELIMINA LAS LÍNEAS DE LA IMAGEN
            "move": { 
                "enable": true, 
                "speed": 0.7, 
                "direction": direction, 
                "random": true, 
                "straight": false,
                "out_mode": "out" 
            }
        },
        "retina_detect": true 
    });

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-top", commonConfig("bottom"));
        particlesJS("particles-bottom", commonConfig("top"));
    }
}

initParticles();

function toggleMute() {
    const music = document.getElementById('bg-music');
    const muteIcon = document.getElementById('mute-icon');
    isMuted = !isMuted;
    music.muted = isMuted;
    gsap.to(".mute-control", { opacity: isMuted ? 0.6 : 1, duration: 0.3 });
}

function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    
    gsap.to(splash, { opacity: 0, duration: 1.2, onComplete: () => { splash.style.display = 'none'; initScrollReveal(); } });

    music.volume = 0;
    music.play().catch(err => console.log("Interacción requerida"));
    gsap.to(music, { volume: 0.35, duration: 4 });

    const revealTL = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.25 } });

    revealTL
        .to(".hero-atmosphere", { opacity: 1, duration: 1.5 })
        .to(".brand-logo-img", { opacity: 1, y: 0, filter: "blur(0px)" }, "-=1.0")
        .to(".pre-title", { opacity: 1, y: 0, filter: "blur(0px)" }, "-=0.8")
        .to(".reveal-title", { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.6 }, "-=0.7")
        .to(".celebrant-name", { opacity: 1, y: 0, filter: "blur(0px)" }, "-=1.0")
        .to(".hero-subtitle", { opacity: 1, y: 0, filter: "blur(0px)" }, "-=0.9");
}

function initScrollReveal() {
    document.querySelectorAll('.section-reveal').forEach(section => {
        gsap.fromTo(section, { opacity: 0, y: 50 }, {
            scrollTrigger: { trigger: section, start: "top 90%", toggleActions: "play none none none" },
            opacity: 1, y: 0, duration: 1.5, ease: "power3.out"
        });
    });
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
        gsap.to(inputNombre, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        return;
    }

    modal.classList.remove('hidden');
    btnConfirmar.innerText = "PROCESANDO...";

    try {
        await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ nombre: nombre, asistencia: "Confirmado" }) });
        btnConfirmar.innerText = "¡TODO LISTO!";
        setTimeout(() => { window.open(`https://wa.me/${TELEFONO_RSVP}?text=${encodeURIComponent("Confirmado: " + nombre)}`, '_blank'); }, 2000);
    } catch (error) { console.error(error); }
}

document.addEventListener("visibilitychange", () => {
    const music = document.getElementById('bg-music');
    if (document.hidden) { music.pause(); } else {
        const splash = document.getElementById('splash-screen');
        if (splash && splash.style.display === 'none' && !isMuted) { music.play(); }
    }
});