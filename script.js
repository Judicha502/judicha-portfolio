const header = document.querySelector('[data-header]');
const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
const revealItems = document.querySelectorAll('.reveal');

const closeMenu = () => {
  navLinks?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
};

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navItems.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

const updateActiveLink = () => {
  let currentId = '';
  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) currentId = section.id;
  });

  navItems.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));
window.addEventListener('scroll', () => {
  updateHeader();
  updateActiveLink();
}, { passive: true });

updateHeader();
updateActiveLink();
