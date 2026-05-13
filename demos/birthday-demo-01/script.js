/**
 * INVYRA - Premium Digital Events
 * Proyecto: Midnight Gala (34 Años de Javier)
 * Versión: 2.0 (Master Integration)
 */

// 1. CONFIGURACIÓN Y CONSTANTES
// 1. CONFIGURACIÓN Y CONSTANTES
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyJ3LoQZeOTN2D621SNoNpN4ymGL4ml_k3tFm3V5X2p6Dm1yaKvA_WUrnIWLv5M-tue/exec";
const TELEFONO_RSVP = "525516986744";

// Cámbiar esta línea al 9 de Abril de 2027:
const FECHA_EVENTO = "Apr 09, 2027 21:00:00";

// 2. CONTROL DE ENTRADA (SPLASH SCREEN)
function entrarGala() {
    const splash = document.getElementById('splash-screen');
    const music = document.getElementById('bg-music');
    
    // Transición de salida del Intro
    splash.style.opacity = '0';
    
    // Inicio de la música emocional (Nyxoria Project)
    music.volume = 0.4;
    music.play().catch(err => console.log("Interacción requerida para audio:", err));
    
    setTimeout(() => {
        splash.style.display = 'none';
    }, 1000);
}

// 3. MOTOR DE REVELADO (SCROLL ANIMADO)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 4. CUENTA REGRESIVA DINÁMICA
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

// 5. RSVP: VALIDACIÓN, REGISTRO Y WHATSAPP
async function confirmarAsistencia() {
    const inputNombre = document.getElementById('nombreInvitado');
    const nombre = inputNombre.value.trim();
    const btn = document.querySelector('.btn-rsvp');

    // Validación de seguridad: No enviar si está vacío
    if (!nombre) {
        inputNombre.style.border = "1px solid red";
        setTimeout(() => inputNombre.style.border = "1px solid rgba(197, 160, 89, 0.3)", 2000);
        return;
    }

    // Estado visual de procesamiento
    btn.innerText = "PROCESANDO...";
    btn.disabled = true;

    const datos = {
        nombre: nombre,
        asistencia: "Confirmado"
    };

    try {
        // Registro en base de datos (Google Sheets) via SCRIPT_URL
        await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(datos)
        });

        // Apertura de WhatsApp personalizada con el número configurado
        const mensaje = encodeURIComponent(`¡Hola! Soy ${nombre}, confirmo mi asistencia a la Midnight Gala. ¡Nos vemos pronto!`);
        window.open(`https://wa.me/${TELEFONO_RSVP}?text=${mensaje}`, '_blank');
        
        // Feedback de éxito final
        btn.innerText = "¡TODO LISTO!";
        btn.style.background = "#25D366";
        btn.style.color = "white";

    } catch (error) {
        console.error("Error en el flujo:", error);
        btn.innerText = "REINTENTAR";
        btn.disabled = false;
    }
}