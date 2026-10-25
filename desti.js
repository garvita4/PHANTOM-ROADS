const cityCards = document.querySelectorAll('.city-card');
const cityStatus = document.querySelector('.city-status');

cityCards.forEach((card) => {
  card.addEventListener('click', () => {
    const cityName = card.querySelector('.city-card-name')?.textContent.trim() || card.dataset.city;

    cityCards.forEach((item) => {
      item.classList.remove('is-selected');
      item.setAttribute('aria-pressed', 'false');
    });

    card.classList.add('is-selected');
    card.setAttribute('aria-pressed', 'true');

    if (cityStatus) {
      cityStatus.textContent = `${cityName} selected. The city guide is coming soon.`;
    }
  });
});

const backgroundSlides = [...document.querySelectorAll('.city-bg-slide')];

if (backgroundSlides.length > 1) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 1800;
  let activeSlide = 0;
  let slideshow;

  const showSlide = (index) => {
    backgroundSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === index);
    });
  };

  const stopSlideshow = () => {
    window.clearInterval(slideshow);
    slideshow = undefined;
  };

  const startSlideshow = () => {
    stopSlideshow();

    if (reduceMotion.matches || document.hidden) return;

    slideshow = window.setInterval(() => {
      activeSlide = (activeSlide + 1) % backgroundSlides.length;
      showSlide(activeSlide);
    }, interval);
  };

  const citySection = document.querySelector('.city-selection');
  let isVisible = false;

  const syncSlideshow = () => {
    if (isVisible) {
      startSlideshow();
    } else {
      stopSlideshow();
    }
  };

  document.addEventListener('visibilitychange', syncSlideshow);
  reduceMotion.addEventListener('change', syncSlideshow);

  if (citySection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        syncSlideshow();
      },
      { threshold: 0.15 }
    );

    observer.observe(citySection);
  } else {
    isVisible = true;
    syncSlideshow();
  }
}
