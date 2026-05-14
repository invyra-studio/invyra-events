/**
 * INVYRA - Master Script v5.4
 * Luxury Immersive Experience - True RWD & Audio Fix
 * Ref: Hotfix Mute visible & Location Elegante
 */

// 1. CONFIGURACIÓN Y ESTADO
document.body.classList.add('js-enabled');
gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec",
    TELEFONO_RSVP: "525516986744",
    FECHA_EVENTO: "Apr 09, 2027 21:00:00",
    IS_MUTED: false
};

const ICONS = {
    SOUND: `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`,
    MUTE: `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`
};

// 2. MOTOR DE PARTÍCULAS (RWD Optimized)
function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    
    // Densidad dinámica según ancho de pantalla
    const particleCount = window.innerWidth > 768 ? 70 : 40;

    particlesJS("particles-js", {
        "particles": {
            "number": { "value": particleCount, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#c5a059" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 0.8,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        },
        "retina_detect": true
    });
}

// 3. LÓGICA DE AUDIO & MUTE (Nuevo)
function toggleMute() {
    const music = document.getElementById('bg-music');
    const muteIcon = document.getElementById('mute-icon');
    
    if (!music || !muteIcon) return;

    CONFIG.IS_MUTED = !CONFIG.IS_MUTED;
    music.muted = CONFIG.IS_MUTED;

    muteIcon.innerHTML = CONFIG.IS_MUTED ? ICONS.MUTE : ICONS.SOUND;
    
    // Animación de feedback al presionar
    gsap.to(".mute-control", { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
}

// 4. ENTRADA A LA GALA
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    
    // Timeline para una entrada fluida
    const tl = gsap.timeline();

    tl.to(splash, { 
        opacity: 0, 
        duration: 1.2, 
        ease: "power2.inOut",
        onComplete: () => {
            splash.style.display = 'none';
            initScrollReveal();
        }
    });

    // Fade-in de Audio Premium
    if (music) {
        music.volume = 0;
        music.play().then(() => {
            gsap.to(music, { volume: 0.35, duration: 4 });
            CONFIG.IS_MUTED = false;
        }).catch(err => {
            console.log("Audio bloqueado por navegador. Esperando interacción.");
            // Sincronizamos icono si el navegador bloqueó el autoplay
            document.getElementById('mute-icon').innerHTML = ICONS.MUTE;
            CONFIG.IS_MUTED = true;
            music.muted = true;
        });
    }

    // Hero Reveal
    tl.from(".brand-logo-img", { opacity: 0, y: -40, duration: 1.5, ease: "power3.out" }, "-=0.5")
      .from(".main-title", { opacity: 0, y: 60, duration: 1.5, ease: "power3.out" }, "-=1")
      .from(".celebrant-name", { opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 1.2, ease: "power2.out" }, "-=0.5");
}

// 5. SCROLL EXPERIENCE (Optimizado)
function initScrollReveal() {
    document.querySelectorAll('.section-reveal').forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 1, y: 0, duration: 1.5, ease: "power3.out"
            }
        );
    });
    ScrollTrigger.refresh();
}

// 6. CUENTA REGRESIVA
const x = setInterval(() => {
    const now = new Date().getTime();
    const diff = new Date(CONFIG.FECHA_EVENTO).getTime() - now;

    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    } else {
        clearInterval(x);
    }
}, 1000);

// 7. RSVP FLOW
async function confirmarAsistencia() {
    const input = document.getElementById('nombreInvitado');
    const btn = document.getElementById('btn-confirmar');
    const modal = document.getElementById('rsvp-modal');
    const nombre = input.value.trim();

    if (!nombre) {
        gsap.to(input, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        input.style.border = "1px solid #ff4444";
        return;
    }

    modal.classList.remove('hidden');
    btn.innerText = "PROCESANDO...";
    btn.disabled = true;

    try {
        await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ nombre, asistencia: "Confirmado" })
        });

        btn.innerText = "¡TODO LISTO!";
        const msg = encodeURIComponent(`✨ Confirmo mi asistencia a la Midnight Gala.\n\nInvitado: ${nombre}`);
        
        setTimeout(() => {
            window.open(`https://wa.me/${CONFIG.TELEFONO_RSVP}?text=${msg}`, '_blank');
            modal.classList.add('hidden');
        }, 2500);

    } catch (e) {
        modal.classList.add('hidden');
        btn.innerText = "REINTENTAR";
        btn.disabled = false;
    }
}

// 8. RWD RESIZE LISTENER
window.addEventListener('load', initParticles);

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        initParticles(); // Re-ajusta densidad de partículas
    }, 250);
});