let invitationOpened = false;
let resumeMusicOnReturn = false;

document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  const music = document.getElementById("bg-music");

  document.getElementById("openInvitation")?.addEventListener("click", () => {
    invitationOpened = true;
    document.body.classList.remove("is-locked");
    splash?.classList.add("is-opening");
    playMusicWithFade(music);
    window.setTimeout(() => splash?.remove(), 950);
  });

  document.querySelectorAll('a[aria-disabled="true"]').forEach(link => {
    link.addEventListener("click", event => event.preventDefault());
  });

  initAudioLifecycle(music);
  initCountdown();
  initReveal();
  window.lucide?.createIcons();
});

function playMusicWithFade(music) {
  if (!music) return;
  music.volume = 0;
  music.play().then(() => {
    resumeMusicOnReturn = true;
    const startedAt = performance.now();
    const fade = now => {
      const progress = Math.min((now - startedAt) / 2200, 1);
      music.volume = 0.28 * progress;
      if (progress < 1 && !music.paused) requestAnimationFrame(fade);
    };
    requestAnimationFrame(fade);
  }).catch(error => console.log("Interacción requerida para reproducir audio:", error));
}

function initAudioLifecycle(music) {
  if (!music) return;
  const pauseForBackground = () => {
    if (!invitationOpened) return;
    if (!music.paused) resumeMusicOnReturn = true;
    music.pause();
  };
  const resumeAfterReturn = () => {
    if (!invitationOpened || !resumeMusicOnReturn || document.hidden) return;
    music.play().catch(error => console.log("No se pudo reanudar el audio:", error));
  };
  document.addEventListener("visibilitychange", () => document.hidden ? pauseForBackground() : resumeAfterReturn());
  window.addEventListener("pagehide", pauseForBackground);
  window.addEventListener("pageshow", resumeAfterReturn);
}

function initCountdown() {
  const eventDate = new Date(document.body.dataset.eventDate).getTime();
  const fields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  const update = () => {
    const distance = Math.max(0, eventDate - Date.now());
    const values = {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance % 86400000) / 3600000),
      minutes: Math.floor((distance % 3600000) / 60000),
      seconds: Math.floor((distance % 60000) / 1000)
    };
    Object.entries(values).forEach(([key, value]) => {
      if (fields[key]) fields[key].textContent = String(value).padStart(2, "0");
    });
  };

  update();
  window.setInterval(update, 1000);
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  elements.forEach(element => observer.observe(element));
}
