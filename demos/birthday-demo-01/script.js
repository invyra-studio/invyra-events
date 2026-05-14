/**
 * INVYRA - Master Script v4.0.1
 * Luxury Immersive Experience - Production Build
 */

// 1. PRE-LOADER & INITIALIZATION
document.body.classList.add('js-enabled');
gsap.registerPlugin(ScrollTrigger);

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Apr 09, 2027 21:00:00";

// 2. FASE 4: PARTÍCULAS DORADAS (Efecto Polvo de Estrellas)
particlesJS("particles-js", {
  "particles": {
    "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
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
  }
});

// 3. FASE 7: ENTRADA CON FADE-IN DE AUDIO PREMIUM
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    
    // Desvanecer el Splash Screen
    gsap.to(splash, { 
        opacity: 0, 
        duration: 1.2, 
        onComplete: () => {
            splash.style.display = 'none';
            // Iniciar animaciones de scroll después del splash
            initScrollReveal();
        }
    });

    // Iniciar audio con Fade-in progresivo (Estilo Nyxoria)
    music.volume = 0;
    music.play().catch(err => console.log("Interacción requerida:", err));
    gsap.to(music, { volume: 0.35, duration: 4, ease: "power1.inOut" });

    // FASE 3: Hero Reveal (Logo y Títulos)
    const tl = gsap.timeline();
    tl.from(".brand-logo-img", { opacity: 0, y: -40, duration: 1.5, ease: "power3.out" })
      .from(".main-title", { opacity: 0, y: 60, duration: 1.5, ease: "power3.out" }, "-=1")
      .from(".celebrant-name", { opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8")
      .from(".hero-subtitle", { opacity: 0, y: 20, duration: 1.2, ease: "power2.out" }, "-=0.5");
}

// 4. FASE 8: SCROLL EXPERIENCE (Optimizado para evitar pantalla vacía)
function initScrollReveal() {
    document.querySelectorAll('.section-reveal').forEach(section => {
        gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
                scrollTrigger: {
                    trigger: section,
                    start: "top 90%", // Ajustado para pantallas altas (Galaxy Ultra)
                    toggleActions: "play none none none"
                },
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power3.out"
            }
        );
    });
    // Forzar recalculación de posiciones tras cargar el hero
    ScrollTrigger.refresh();
}

// 5. CUENTA REGRESIVA DINÁMICA
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

// 6. FLUJO DE CONFIRMACIÓN INTERACTIVO (RSVP)
async function confirmarAsistencia() {
    const inputNombre = document.getElementById('nombreInvitado');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const modal = document.getElementById('rsvp-modal');
    const nombre = inputNombre.value.trim();

    if (!nombre) {
        gsap.to(inputNombre, { x: 10, duration: 0.1, repeat: 5, yoyo: true }); // Shake de error
        inputNombre.style.border = "1px solid #ff4444";
        setTimeout(() => inputNombre.style.border = "1px solid rgba(197, 160, 89, 0.3)", 2000);
        return;
    }

    modal.classList.remove('hidden');
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
        const mensaje = encodeURIComponent(`¡Hola! Confirmo mi asistencia a la Midnight Gala.%0A%0A*Invitado:* ${nombre}`);
        
        setTimeout(() => {
            window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensaje}`, '_blank');
            modal.classList.add('hidden');
        }, 2500);

    } catch (error) {
        console.error("Error:", error);
        modal.classList.add('hidden');
        btnConfirmar.innerText = "REINTENTAR";
        btnConfirmar.disabled = false;
        inputNombre.disabled = false;
    }
}