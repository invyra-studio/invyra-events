/**
 * INVYRA - Master Script v4.5.1
 * Luxury Immersive Experience - Final Production Build
 */

// 1. PRE-LOADER & INITIALIZATION
document.body.classList.add('js-enabled');
gsap.registerPlugin(ScrollTrigger);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Apr 09, 2027 21:00:00";
let isMuted = false;

// 2. ESTRUCTURA DE PARTÍCULAS DUALES (Top & Bottom)
function initParticles() {
    particlesJS("particles-top", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#c5a059" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true },
            "size": { "value": 1.5, "random": true },
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "bottom",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        }
    });

    particlesJS("particles-bottom", {
        "particles": {
            "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#c5a059" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": false },
            "move": {
                "enable": true,
                "speed": 0.6,
                "direction": "top",
                "random": true,
                "straight": false,
                "out_mode": "out"
            }
        }
    });
}

initParticles();

// 3. CONTROL DE AUDIO (MUTE LOGIC)
function toggleMute() {
    const music = document.getElementById('bg-music');
    const muteIcon = document.getElementById('mute-icon');
    
    isMuted = !isMuted;
    music.muted = isMuted;

    if (isMuted) {
        muteIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>`;
        gsap.to(".mute-control", { opacity: 0.6, duration: 0.3 });
    } else {
        muteIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
        gsap.to(".mute-control", { opacity: 1, duration: 0.3 });
    }
}

// 4. ENTRADA A LA EXPERIENCIA
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    
    gsap.to(splash, { 
        opacity: 0, 
        duration: 1.2, 
        onComplete: () => {
            splash.style.display = 'none';
            initScrollReveal();
        }
    });

    music.volume = 0;
    music.play().catch(err => console.log("Interacción requerida:", err));
    gsap.to(music, { volume: 0.35, duration: 4, ease: "power1.inOut" });

    const tl = gsap.timeline();
    tl.from(".brand-logo-img", { opacity: 0, y: -40, duration: 1.5, ease: "power3.out" })
      .from(".main-title", { opacity: 0, y: 60, duration: 1.5, ease: "power3.out" }, "-=1")
      .from(".celebrant-name", { opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 1.2, ease: "power2.out" }, "-=0.5");
}

// 5. SCROLL EXPERIENCE (REVEALS)
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

// 6. CUENTA REGRESIVA
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

// 7. RSVP FLOW (MODAL FIX)
async function confirmarAsistencia() {
    const inputNombre = document.getElementById('nombreInvitado');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const modal = document.getElementById('rsvp-modal');
    const nombre = inputNombre.value.trim();

    if (!nombre) {
        gsap.to(inputNombre, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        inputNombre.style.border = "1px solid #ff4444";
        setTimeout(() => inputNombre.style.border = "1px solid rgba(197, 160, 89, 0.3)", 2000);
        return;
    }

    // Mostramos el modal y animamos su contenido (Tarjeta)
    modal.classList.remove('hidden');
    gsap.from(".modal-content", { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
    });

    btnConfirmar.innerText = "PROCESANDO...";
    btnConfirmar.disabled = true;
    inputNombre.disabled = true;

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ nombre: nombre, asistencia: "Confirmado" })
        });

        btnConfirmar.innerText = "¡TODO LISTO!";
        const mensaje = encodeURIComponent(`¡Hola! Confirmo mi asistencia a la Midnight Gala.\n\n*Invitado:* ${nombre}`);
        
        setTimeout(() => {
            window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensaje}`, '_blank');
            // Opcional: Ocultar tras la redirección
            modal.classList.add('hidden');
        }, 2800);

    } catch (error) {
        console.error("Error:", error);
        modal.classList.add('hidden');
        btnConfirmar.innerText = "REINTENTAR";
        btnConfirmar.disabled = false;
        inputNombre.disabled = false;
    }
}