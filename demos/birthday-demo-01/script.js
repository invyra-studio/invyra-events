/**
 * INVYRA - Final Production Build
 */

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";
const FECHA_EVENTO = "Apr 09, 2027 21:00:00";

// Entrada a la experiencia
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    splash.style.opacity = '0';
    music.volume = 0.4;
    music.play().catch(err => console.log("Interacción requerida:", err));
    setTimeout(() => { splash.style.display = 'none'; }, 1000);
}

// Animaciones de scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('show'); }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Cuenta regresiva
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

// Flujo de confirmación interactivo
async function confirmarAsistencia() {
    const inputNombre = document.getElementById('nombreInvitado');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const modal = document.getElementById('rsvp-modal');
    const nombre = inputNombre.value.trim();

    if (!nombre) {
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