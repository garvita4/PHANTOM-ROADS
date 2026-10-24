const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = mobileMenu.querySelectorAll('a');

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();

  const isOpening = !mobileMenu.classList.contains('active');

  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');

  if (isOpening) {
    // Reset links before animating
    anime.set(menuLinks, {
      opacity: 0,
      translateY: -15
    });

    // Vertical stagger animation
    anime({
      targets: menuLinks,
      opacity: [0, 1],
      translateY: [-15, 0],
      delay: anime.stagger(60), // one after another
      duration: 450,
      easing: 'easeOutCubic'
    });
  }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
    menuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  }
});