document.documentElement.classList.add("js-enabled");

const EVENT_DATE = document.body.dataset.eventDate;
const STORAGE_KEY = "invyra_save_the_date_karen_alejandro";

function openInvitation() {
  const splash = document.getElementById("splash-screen");
  const invitation = document.getElementById("invitation");

  splash?.classList.add("is-hidden");
  invitation?.classList.add("is-open");
  invitation?.setAttribute("aria-hidden", "false");
  document.body.classList.remove("is-locked");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function initReveal() {
  const sections = [...document.querySelectorAll(".section-reveal")];
  if (!sections.length) return;

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
  }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

  sections.forEach(section => observer.observe(section));
}

function initCountdown() {
  if (!EVENT_DATE) return;
  const target = new Date(EVENT_DATE).getTime();
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  const tick = () => {
    const distance = Math.max(target - Date.now(), 0);
    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor(distance / 3600000) % 24,
      minutes: Math.floor(distance / 60000) % 60,
      seconds: Math.floor(distance / 1000) % 60
    };

    Object.entries(values).forEach(([key, value]) => {
      if (fields[key]) fields[key].textContent = String(value).padStart(key === "days" ? 3 : 2, "0");
    });
  };

  tick();
  window.setInterval(tick, 1000);
}

function downloadCalendarEvent() {
  const start = new Date(EVENT_DATE);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const toIcsDate = date => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//INVYRA//Save the Date//ES",
    "BEGIN:VEVENT",
    `UID:karen-alejandro-20261114@invyra.studio`,
    `DTSTAMP:${toIcsDate(new Date())}`,
    `DTSTART:${toIcsDate(start)}`,
    `DTEND:${toIcsDate(end)}`,
    "SUMMARY:Karen & Alejandro · Save the Date",
    "LOCATION:Ciudad de Mexico",
    "DESCRIPTION:Guarda la fecha. La invitacion completa llegara muy pronto.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "save-the-date-karen-alejandro.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function syncAttendance() {
  const answer = document.querySelector('input[name="attendance"]:checked')?.value;
  const guestCount = document.getElementById("guest-count-wrap");
  if (guestCount) guestCount.hidden = answer === "No podré acompañarlos";
}

function saveDraft() {
  const form = document.getElementById("response-form");
  if (!form) return;
  const data = Object.fromEntries(new FormData(form).entries());
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (_) {
    // The form remains usable when storage is unavailable or blocked.
  }
}

function restoreDraft() {
  const form = document.getElementById("response-form");
  if (!form) return;

  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    Object.entries(data).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (!field) return;
      if (field instanceof RadioNodeList) {
        [...field].forEach(input => { input.checked = input.value === value; });
      } else {
        field.value = value;
      }
    });
  } catch (_) {
    localStorage.removeItem(STORAGE_KEY);
  }
  syncAttendance();
}

function openModal(message) {
  const modal = document.getElementById("response-modal");
  const modalMessage = document.getElementById("modal-message");
  if (modalMessage) modalMessage.textContent = message;
  modal?.classList.add("is-open");
  modal?.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("response-modal");
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
}

function initForm() {
  const form = document.getElementById("response-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  restoreDraft();
  form.addEventListener("input", saveDraft);
  form.addEventListener("change", () => {
    syncAttendance();
    saveDraft();
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("guest-name")?.value.trim();
    const answer = document.querySelector('input[name="attendance"]:checked')?.value;
    if (!name) {
      if (status) status.textContent = "Escribe tu nombre para guardar la respuesta.";
      document.getElementById("guest-name")?.focus();
      return;
    }

    if (status) status.textContent = "";
    saveDraft();
    openModal(`${name}: ${answer}. Tu respuesta preliminar quedó guardada en esta demo.`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("is-locked");
  document.getElementById("open-invitation")?.addEventListener("click", openInvitation);
  document.getElementById("calendar-button")?.addEventListener("click", downloadCalendarEvent);
  document.getElementById("modal-close")?.addEventListener("click", closeModal);
  document.getElementById("modal-confirm")?.addEventListener("click", closeModal);
  document.getElementById("response-modal")?.addEventListener("click", event => {
    if (event.target.id === "response-modal") closeModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });

  initCountdown();
  initReveal();
  initForm();
});
