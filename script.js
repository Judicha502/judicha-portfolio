const menuButton = document.getElementById('menuButton');
const navLinks = document.getElementById('navLinks');

menuButton?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
