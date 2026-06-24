const WHATSAPP_NUMBER = "525535690278";
const DRAFT_KEY = "invyra_anniversary_dinner_rsvp";
let experienceOpened = false;
let resumeMusicOnReturn = false;

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const openButton = document.getElementById("openExperience");
  const music = document.getElementById("bg-music");
  const form = document.getElementById("rsvpForm");

  openButton?.addEventListener("click", () => {
    splash?.classList.add("is-opening");
    document.body.classList.remove("is-locked");
    experienceOpened = true;
    playMusicWithFade(music);
    window.setTimeout(() => splash?.remove(), 900);
  });

  initAudioLifecycle(music);
  initReveal();
  restoreDraft(form);
  form?.addEventListener("input", () => saveDraft(form));
  form?.addEventListener("change", () => saveDraft(form));
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("guestName")?.value.trim();
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value || "Sin respuesta";
    const guestMessage = document.getElementById("guestMessage")?.value.trim();
    const status = document.getElementById("formStatus");
    if (!name) {
      if (status) status.textContent = "Escribe tu nombre para continuar.";
      document.getElementById("guestName")?.focus();
      return;
    }
    const message = [
      "Hola, confirmo mi respuesta para Diez años, una mesa.",
      "",
      `Nombre: ${name}`,
      `Respuesta: ${attendance}`,
      `Mensaje: ${guestMessage || "Sin mensaje"}`,
    ].filter(Boolean).join("\n");
    localStorage.removeItem(DRAFT_KEY);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    if (status) status.textContent = "WhatsApp esta listo con tu respuesta.";
  });
});

function playMusicWithFade(music) {
  if (!music) return;
  music.volume = 0;
  music.play().then(() => {
    resumeMusicOnReturn = true;
    const startedAt = performance.now();
    const fade = now => {
      const progress = Math.min((now - startedAt) / 1800, 1);
      music.volume = 0.34 * progress;
      if (progress < 1 && !music.paused) requestAnimationFrame(fade);
    };
    requestAnimationFrame(fade);
  }).catch(error => console.log("Interacción requerida para reproducir audio:", error));
}

function initAudioLifecycle(music) {
  if (!music) return;
  const pauseForBackground = () => {
    if (!experienceOpened) return;
    if (!music.paused) resumeMusicOnReturn = true;
    music.pause();
  };
  const resumeAfterReturn = () => {
    if (!experienceOpened || !resumeMusicOnReturn || document.hidden) return;
    music.play().catch(error => console.log("No se pudo reanudar el audio:", error));
  };
  document.addEventListener("visibilitychange", () => document.hidden ? pauseForBackground() : resumeAfterReturn());
  window.addEventListener("pagehide", pauseForBackground);
  window.addEventListener("pageshow", resumeAfterReturn);
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) return items.forEach(item => item.classList.add("is-visible"));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}

function saveDraft(form) {
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch (_) {}
}

function restoreDraft(form) {
  if (!form) return;
  try {
    const data = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    Object.entries(data).forEach(([name, value]) => {
      const field = form.querySelector(`[name="${CSS.escape(name)}"]`);
      if (!field) return;
      if (field.type === "radio") {
        const option = form.querySelector(`[name="${CSS.escape(name)}"][value="${CSS.escape(value)}"]`);
        if (option) option.checked = true;
      } else field.value = value;
    });
  } catch (_) {}
}
