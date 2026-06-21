document.documentElement.classList.add("js-enabled");

const EVENT_DATE = document.body.dataset.eventDate;
const RSVP_KEY = "invyra_gender_reveal_lucia_mateo";
const VOTE_KEY = "invyra_gender_reveal_vote";
const WHATSAPP_NUMBER = "525535690278";

function setMusicState(isPlaying) {
  const button = document.getElementById("music-toggle");
  const label = document.getElementById("music-label");
  button?.classList.toggle("is-playing", isPlaying);
  button?.setAttribute("aria-pressed", String(isPlaying));
  button?.setAttribute("aria-label", isPlaying ? "Pausar música" : "Reproducir música");
  if (label) label.textContent = isPlaying ? "Música" : "Activar música";
}

function startMusic() {
  const audio = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");
  button?.classList.add("is-visible");
  if (!audio) return;
  audio.volume = 0.35;
  audio.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
}

function toggleMusic() {
  const audio = document.getElementById("bg-music");
  if (!audio) return;
  if (audio.paused) audio.play().then(() => setMusicState(true)).catch(() => setMusicState(false));
  else {
    audio.pause();
    setMusicState(false);
  }
}

function openInvitation() {
  document.getElementById("splash-screen")?.classList.add("is-hidden");
  const invitation = document.getElementById("invitation");
  invitation?.classList.add("is-open");
  invitation?.setAttribute("aria-hidden", "false");
  document.body.classList.remove("is-locked");
  window.scrollTo({ top: 0, behavior: "auto" });
  startMusic();
}

function initReveal() {
  const sections = [...document.querySelectorAll(".section-reveal")];
  if (!("IntersectionObserver" in window)) {
    sections.forEach(section => section.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -7% 0px" });
  sections.forEach(section => observer.observe(section));
}

function initCountdown() {
  const target = new Date(EVENT_DATE).getTime();
  const fields = { days: document.getElementById("days"), hours: document.getElementById("hours"), minutes: document.getElementById("minutes"), seconds: document.getElementById("seconds") };
  const tick = () => {
    const diff = Math.max(target - Date.now(), 0);
    const values = { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 };
    Object.entries(values).forEach(([key, value]) => { if (fields[key]) fields[key].textContent = String(value).padStart(key === "days" ? 3 : 2, "0"); });
  };
  tick();
  window.setInterval(tick, 1000);
}

function applyVote(value) {
  document.querySelectorAll(".vote-card").forEach(card => card.classList.toggle("is-selected", card.dataset.vote === value));
  const teamChoice = document.getElementById("team-choice");
  if (teamChoice && value) teamChoice.value = value;
  const status = document.getElementById("vote-status");
  if (status) status.textContent = value ? `Tu apuesta quedó en ${value}.` : "Todavía puedes cambiar de opinión.";
  try { if (value) localStorage.setItem(VOTE_KEY, value); } catch (_) {}
}

function initVoting() {
  let saved = "";
  try { saved = localStorage.getItem(VOTE_KEY) || ""; } catch (_) {}
  if (saved) applyVote(saved);
  document.querySelectorAll(".vote-card").forEach(card => card.addEventListener("click", () => applyVote(card.dataset.vote)));
}

function syncAttendance() {
  const attending = document.querySelector('input[name="attendance"]:checked')?.value === "Asistiré";
  const details = document.getElementById("attendance-details");
  if (details) details.hidden = !attending;
}

function saveDraft() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;
  try { localStorage.setItem(RSVP_KEY, JSON.stringify(Object.fromEntries(new FormData(form).entries()))); } catch (_) {}
}

function restoreDraft() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;
  try {
    const data = JSON.parse(localStorage.getItem(RSVP_KEY) || "{}");
    Object.entries(data).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      if (field instanceof RadioNodeList) [...field].forEach(input => { input.checked = input.value === value; });
      else field.value = value;
    });
  } catch (_) {}
  syncAttendance();
}

function buildWhatsAppUrl(data) {
  const lines = [
    "Hola, confirmo mi respuesta para el Gender Reveal de Lucía y Mateo:",
    "",
    `Nombre o familia: ${data.name}`,
    `Respuesta: ${data.attendance}`
  ];
  if (data.attendance === "Asistiré") {
    lines.push(`Asistentes: ${data.count}`, `Apuesta: ${data.team}`);
  }
  if (data.message) lines.push(`Mensaje: ${data.message}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function initRsvp() {
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("form-status");
  if (!form) return;
  restoreDraft();
  form.addEventListener("input", saveDraft);
  form.addEventListener("change", () => { syncAttendance(); saveDraft(); });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("guest-name")?.value.trim();
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value;
    const team = document.getElementById("team-choice")?.value || "Sin apuesta";
    const count = document.getElementById("guest-count")?.value || "1";
    const message = document.getElementById("guest-message")?.value.trim() || "";
    if (!name) {
      if (status) status.textContent = "Escribe tu nombre para guardar la confirmación.";
      document.getElementById("guest-name")?.focus();
      return;
    }
    if (status) status.textContent = "Abriendo WhatsApp para enviar tu confirmación...";
    saveDraft();
    window.open(buildWhatsAppUrl({ name, attendance, team, count, message }), "_blank", "noopener,noreferrer");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-locked");
  document.getElementById("open-invitation")?.addEventListener("click", openInvitation);
  document.getElementById("music-toggle")?.addEventListener("click", toggleMusic);
  initCountdown();
  initReveal();
  initRsvp();
  initVoting();
});
