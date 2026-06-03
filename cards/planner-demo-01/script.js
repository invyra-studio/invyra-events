
document.getElementById('year').textContent = new Date().getFullYear();

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
},{threshold:0.12});
reveals.forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('header[id], section[id]')];
const navLinks = [...document.querySelectorAll('.floating-nav a')];

const activateLink = () => {
  const y = window.scrollY + window.innerHeight * 0.35;
  let current = sections[0]?.id || 'inicio';
  sections.forEach(sec => {
    if (sec.offsetTop <= y) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};
activateLink();
window.addEventListener('scroll', activateLink, {passive:true});
