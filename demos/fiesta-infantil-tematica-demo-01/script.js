
document.body.classList.add("js-enabled", "splash-active");

function openInvitation() {
  const splash = document.getElementById("splash-screen");
  const invitation = document.getElementById("invitation");
  const audio = document.getElementById("event-audio");

  document.body.classList.remove("locked", "splash-active");
  splash?.classList.add("hidden");
  invitation?.classList.add("visible");

  window.setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    initSectionReveal();
  }, 80);

  // Igual que las demos anteriores: la música se intenta activar al abrir la invitación.
  // El navegador puede bloquear autoplay sin interacción, pero este click de apertura habilita el play.
  if (audio) {
    audio.volume = 0.72;
    audio.play().catch(() => {
      // Si el navegador lo bloquea, no mostramos botón; simplemente queda silencioso.
    });
  }
}

function initCountdown() {
  const target = document.body.dataset.eventDate;
  if (!target) return;

  const targetDate = new Date(target).getTime();
  const els = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    mins: document.getElementById("mins"),
    secs: document.getElementById("secs")
  };

  const tick = () => {
    const diff = Math.max(targetDate - Date.now(), 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (els.days) els.days.textContent = String(days).padStart(2, "0");
    if (els.hours) els.hours.textContent = String(hours).padStart(2, "0");
    if (els.mins) els.mins.textContent = String(mins).padStart(2, "0");
    if (els.secs) els.secs.textContent = String(secs).padStart(2, "0");
  };

  tick();
  setInterval(tick, 1000);
}

function initSectionReveal() {
  const sections = document.querySelectorAll(".section-reveal");
  if (!sections.length) return;

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("visible", "in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible", "in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });

  sections.forEach((section) => observer.observe(section));
}

function updateRsvpState() {
  const selected = document.querySelector('input[name="asistencia"]:checked')?.value || "Asistiré";
  const detalleGroup = document.getElementById("detalleAsistenciaGroup");
  const numeroGroup = document.getElementById("numeroAsistentesGroup");
  const message = document.getElementById("rsvp-live-message");

  const attending = selected === "Asistiré";
  if (detalleGroup) detalleGroup.style.display = attending ? "block" : "none";
  if (numeroGroup) numeroGroup.style.display = attending ? "block" : "none";

  if (message) {
    message.textContent = attending
      ? "¡Perfecto! Cuéntanos cuántos exploradores vendrán a la misión."
      : "Gracias por avisarnos. Tu respuesta nos ayudará a organizar todo mejor.";
  }
}

function confirmarAsistencia() {
  const name = document.getElementById("nombreInvitado")?.value.trim() || "Invitado";
  const attendance = document.querySelector('input[name="asistencia"]:checked')?.value || "Asistiré";
  const detalle = document.getElementById("detalleAsistenciaInvitado")?.value || "";
  const numero = document.getElementById("numeroAsistentes")?.value || "";
  const messageText = document.getElementById("mensajeInvitado")?.value.trim() || "Sin mensaje adicional.";

  const modal = document.getElementById("rsvp-modal");
  const modalMessage = document.getElementById("modal-message");

  let summary = `${name} confirmó: ${attendance}.`;
  if (attendance === "Asistiré") {
    summary += ` ${detalle}. ${numero} asistente(s).`;
  }
  summary += ` ${messageText}`;

  if (modalMessage) modalMessage.textContent = summary;
  modal?.classList.remove("hidden");
}

function cerrarModal() {
  document.getElementById("rsvp-modal")?.classList.add("hidden");
}

function initRsvp() {
  document.querySelectorAll('input[name="asistencia"]').forEach((input) => {
    input.addEventListener("change", updateRsvpState);
  });
  updateRsvpState();
  window.confirmarAsistencia = confirmarAsistencia;
  window.cerrarModal = cerrarModal;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("locked");
  initCountdown();
  initSectionReveal();
  initRsvp();

  window.openInvitation = openInvitation;
});
