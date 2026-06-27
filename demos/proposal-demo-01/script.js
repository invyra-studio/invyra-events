const startButton = document.querySelector(".btn-start");
const splash = document.getElementById("splash-screen");
const form = document.querySelector(".rsvp-form");
const statusText = document.getElementById("rsvpStatus");
const messageField = document.getElementById("guestMessage");
const storageKey = "invyra_proposal_demo_01_rsvp";
const phone = "525516986744";

function revealInitial() {
  document.querySelectorAll(".reveal").forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), 140 + index * 130);
  });
}

function openExperience() {
  if (!splash) return;
  splash.classList.add("is-hidden");
  document.body.classList.remove("splash-active");
  revealInitial();
  window.setTimeout(() => { splash.style.display = "none"; }, 760);
}

function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal-section").forEach(section => observer.observe(section));
}

function saveDraft() {
  localStorage.setItem(storageKey, JSON.stringify({
    name: document.getElementById("guestName").value,
    attendance: document.querySelector("[name='asistencia']:checked")?.value,
    message: messageField.value
  }));
}

function restoreDraft() {
  const draft = JSON.parse(localStorage.getItem(storageKey) || "null");
  if (!draft) return;
  document.getElementById("guestName").value = draft.name || "";
  messageField.value = draft.message || "";
  const selected = document.querySelector(`[name="asistencia"][value="${draft.attendance}"]`);
  if (selected) selected.checked = true;
}

function updateAttendanceState() {
  const attendance = document.querySelector("[name='asistencia']:checked")?.value;
  messageField.placeholder = attendance === "No asistiré"
    ? "Puedes dejar un mensaje opcional"
    : "Mensaje opcional para Valeria y Bruno";
}

function submitRsvp(event) {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const attendance = document.querySelector("[name='asistencia']:checked")?.value || "Asistiré";

  if (!name) {
    statusText.textContent = "Escribe el nombre del invitado para continuar.";
    return;
  }

  saveDraft();
  statusText.textContent = "Respuesta registrada. Abriendo WhatsApp...";
  const message = `Hola INVYRA, confirmo RSVP para La Pregunta.%0AInvitado: ${encodeURIComponent(name)}%0ARespuesta: ${encodeURIComponent(attendance)}`;
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  restoreDraft();
  updateAttendanceState();
  startButton?.addEventListener("click", openExperience);
  form?.addEventListener("input", saveDraft);
  form?.addEventListener("submit", submitRsvp);
  document.querySelectorAll("[name='asistencia']").forEach(option => option.addEventListener("change", updateAttendanceState));
});
