const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');
const year = document.getElementById('year');

year.textContent = new Date().getFullYear();

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const sections = [...document.querySelectorAll('section[id]')];
const navItems = [...document.querySelectorAll('.nav-links a')];

const setActiveLink = () => {
  const current = sections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 130 && rect.bottom >= 130;
  });
  navItems.forEach((item) => item.classList.toggle('active', current && item.getAttribute('href') === `#${current.id}`));
};

document.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
