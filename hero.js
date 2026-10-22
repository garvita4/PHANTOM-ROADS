const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});