document.documentElement.classList.add("js-enabled");

const EVENT_DATE = document.body.dataset.eventDate;
const STORAGE_KEY = "invyra_bridal_shower_renata";

function openInvitation() {
  document.getElementById("splash-screen")?.classList.add("is-hidden");
  const invitation = document.getElementById("invitation");
  invitation?.classList.add("is-open");
  invitation?.setAttribute("aria-hidden", "false");
  document.body.classList.remove("is-locked");
  window.scrollTo({ top: 0, behavior: "auto" });
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

function syncAttendance() {
  const attending = document.querySelector('input[name="attendance"]:checked')?.value === "Asistiré";
  const details = document.getElementById("attendance-details");
  if (details) details.hidden = !attending;
}

function saveDraft() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(new FormData(form).entries()))); } catch (_) {}
}

function restoreDraft() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    Object.entries(data).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      if (field instanceof RadioNodeList) [...field].forEach(input => { input.checked = input.value === value; });
      else field.value = value;
    });
  } catch (_) {}
  syncAttendance();
}

function openModal(message) {
  const modal = document.getElementById("modal");
  const copy = document.getElementById("modal-message");
  if (copy) copy.textContent = message;
  modal?.classList.add("is-open");
  modal?.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
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
    const song = document.getElementById("guest-song")?.value.trim();
    if (!name) {
      if (status) status.textContent = "Escribe tu nombre para guardar la confirmación.";
      document.getElementById("guest-name")?.focus();
      return;
    }
    if (status) status.textContent = "";
    saveDraft();
    const songCopy = attendance === "Asistiré" && song ? ` Canción sugerida: ${song}.` : "";
    openModal(`${name} confirmó: ${attendance}.${songCopy}`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-locked");
  document.getElementById("open-invitation")?.addEventListener("click", openInvitation);
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("modal-confirm")?.addEventListener("click", closeModal);
  document.getElementById("modal")?.addEventListener("click", event => { if (event.target.id === "modal") closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
  initCountdown();
  initReveal();
  initRsvp();
});
