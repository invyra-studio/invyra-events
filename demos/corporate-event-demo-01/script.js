const startButton = document.querySelector(".btn-start");
const splash = document.getElementById("splash-screen");
const form = document.querySelector(".rsvp-form");
const statusText = document.getElementById("rsvpStatus");
const notesField = document.getElementById("guestNotes");
const storageKey = "invyra_corporate_event_demo_01_rsvp";
const phone = "525516986744";

function revealInitial() {
  document.querySelectorAll(".reveal").forEach((item, index) => {
    window.setTimeout(() => item.classList.add("is-visible"), 120 + index * 120);
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
  }, { threshold: 0.16 });

  document.querySelectorAll(".reveal-section").forEach(section => observer.observe(section));
}

function saveDraft() {
  localStorage.setItem(storageKey, JSON.stringify({
    name: document.getElementById("guestName").value,
    company: document.getElementById("companyName").value,
    attendance: document.querySelector("[name='asistencia']:checked")?.value,
    notes: notesField.value
  }));
}

function restoreDraft() {
  const draft = JSON.parse(localStorage.getItem(storageKey) || "null");
  if (!draft) return;
  document.getElementById("guestName").value = draft.name || "";
  document.getElementById("companyName").value = draft.company || "";
  notesField.value = draft.notes || "";
  const selected = document.querySelector(`[name="asistencia"][value="${draft.attendance}"]`);
  if (selected) selected.checked = true;
}

function updateAttendanceState() {
  const attendance = document.querySelector("[name='asistencia']:checked")?.value;
  notesField.placeholder = attendance === "No asistiré"
    ? "Puedes dejar una nota opcional"
    : "Notas de acceso, acompanante o requerimientos";
}

function submitRegistration(event) {
  event.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const company = document.getElementById("companyName").value.trim();
  const attendance = document.querySelector("[name='asistencia']:checked")?.value || "Asistiré";

  if (!name || !company) {
    statusText.textContent = "Completa nombre y empresa/cargo para continuar.";
    return;
  }

  saveDraft();
  statusText.textContent = "Registro guardado. Abriendo WhatsApp...";
  const message = `Hola INVYRA, confirmo registro para Summit Noir.%0ANombre: ${encodeURIComponent(name)}%0AEmpresa/cargo: ${encodeURIComponent(company)}%0ARespuesta: ${encodeURIComponent(attendance)}`;
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
}

document.addEventListener("DOMContentLoaded", () => {
  initReveal();
  restoreDraft();
  updateAttendanceState();
  startButton?.addEventListener("click", openExperience);
  form?.addEventListener("input", saveDraft);
  form?.addEventListener("submit", submitRegistration);
  document.querySelectorAll("[name='asistencia']").forEach(option => option.addEventListener("change", updateAttendanceState));
});
