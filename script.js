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
});(function () {
  const journey = document.getElementById('journey');
  if (!journey) return;

  const heroScene = document.getElementById('hero');
  const noticeScene = document.getElementById('scroll1');
  const exploreScene = document.getElementById('scroll2');
  const feelScene = document.getElementById('scroll3');
  const scenes = [heroScene, noticeScene, exploreScene, feelScene].filter(Boolean);

  const layers = {};
  document.querySelectorAll('.city-bg').forEach((layer) => {
    layers[layer.dataset.bg] = layer;
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = Boolean(window.gsap && window.ScrollTrigger);

  function enableSimpleMode() {
    document.body.classList.add('reduced-motion');

    let frame = 0;

    const updateBackground = () => {
      const viewportCenter = window.innerHeight / 2;
      let active = scenes[0];
      let closest = Infinity;

      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        if (distance < closest) {
          closest = distance;
          active = scene;
        }
      });

      Object.keys(layers).forEach((name) => {
        if (layers[name]) {
          layers[name].style.opacity = name === active.dataset.scene ? '1' : '0';
        }
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateBackground();
      });
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    updateBackground();
  }

  if (!hasGSAP || prefersReduced) {
    enableSimpleMode();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const heroContent = heroScene.querySelector('.hero-content');
  const heroHint = heroScene.querySelector('.scroll-hint');

  const noticeContent = noticeScene.querySelector('.scroll-content');
  const noticeCard = noticeScene.querySelector('.detail-card');
  const noticeProgress = noticeScene.querySelector('.progress-steps');
  const noticeBar = noticeScene.querySelector('.bottom-bar');
  const noticeDot = noticeScene.querySelector('.step.active .step-dot');

  const exploreContent = exploreScene.querySelector('.scroll-content');
  const exploreCard = exploreScene.querySelector('.mode-card');
  const exploreOptions = exploreScene.querySelectorAll('.mode-option');
  const exploreProgress = exploreScene.querySelector('.progress-steps');
  const exploreBar = exploreScene.querySelector('.bottom-bar');
  const exploreDot = exploreScene.querySelector('.step.active .step-dot');

  const feelContent = feelScene.querySelector('.scroll-content');
  const feelCard = feelScene.querySelector('.detail-card');
  const feelImage = feelScene.querySelector('.detail-image img');
  const feelProgress = feelScene.querySelector('.progress-steps');
  const feelBar = feelScene.querySelector('.bottom-bar');
  const feelDot = feelScene.querySelector('.step.active .step-dot');

  /* Initial states */
  gsap.set([noticeContent, exploreContent, feelContent], {
    yPercent: -50,
    autoAlpha: 0,
    filter: 'blur(8px)'
  });
  gsap.set(noticeContent, { x: 130 });
  gsap.set(exploreContent, { x: 130 });
  gsap.set(feelContent, { x: 130 });

  gsap.set([noticeCard, exploreCard, feelCard], {
    yPercent: -50,
    autoAlpha: 0,
    x: 110,
    scale: 0.96,
    filter: 'blur(10px)'
  });

  gsap.set([noticeProgress, exploreProgress, feelProgress], { autoAlpha: 0 });
  gsap.set([noticeBar, exploreBar, feelBar], { autoAlpha: 0, y: 20 });

  gsap.set([noticeDot, exploreDot, feelDot], { scale: 0.65 });
  gsap.set(exploreOptions, { autoAlpha: 0, y: 20 });
  gsap.set(feelImage, { scale: 1.12 });

  gsap.set(layers.hero, { opacity: 1, scale: 1 });
  gsap.set([layers.notice, layers.explore, layers.feel], { opacity: 0, scale: 1.06 });

  const cuts = [1.9, 4.75, 6.85];
  let activeIndex = -1;

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: journey,
      start: 'top top',
      end: () => '+=' + Math.round(window.innerHeight * 5.2),
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => updateActiveScene(self.progress)
    }
  });

  /* Hero → Notice */
  timeline
    .to(layers.hero, { scale: 1.28, duration: 2.8 }, 0)
    .to(heroHint, { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 0.55)
    .to(heroContent, {
      autoAlpha: 0,
      y: -80,
      filter: 'blur(7px)',
      duration: 1.1,
      ease: 'power2.in'
    }, 0.7)

    .fromTo(
      layers.notice,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1.12, duration: 1.15 },
      1.05
    )
    .to(layers.notice, { scale: 1.2, duration: 1.4 }, 2.2)
    .to(layers.notice, { scale: 1.3, duration: 1.3 }, 3.6)

    .to(noticeContent, {
      autoAlpha: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, 1.55)
    .to(noticeCard, {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power2.out'
    }, 1.95)
    .to(noticeProgress, { autoAlpha: 1, duration: 0.5 }, 1.75)
    .to(noticeDot, { scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, 1.8)
    .to(noticeBar, { autoAlpha: 1, y: 0, duration: 0.6 }, 2)

    /* Notice → Explore */
    .to(noticeContent, {
      autoAlpha: 0,
      x: -70,
      filter: 'blur(6px)',
      duration: 0.85,
      ease: 'power1.in'
    }, 3.3)
    .to(noticeCard, {
      autoAlpha: 0,
      x: -50,
      filter: 'blur(6px)',
      duration: 0.7,
      ease: 'power1.in'
    }, 3.4)
    .to([noticeProgress, noticeBar], { autoAlpha: 0, duration: 0.65 }, 3.4)

    .fromTo(
      layers.explore,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1.12, duration: 1.05 },
      3.62
    )
    .to(layers.explore, { scale: 1.2, duration: 1.4 }, 4.67)
    .to(layers.explore, { scale: 1.3, duration: 1.2 }, 6.07)

    .to(exploreContent, {
      autoAlpha: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, 4.1)
    .to(exploreCard, {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power2.out'
    }, 4.45)
    .to(exploreOptions, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      stagger: 0.12,
      ease: 'power2.out'
    }, 4.7)
    .to(exploreProgress, { autoAlpha: 1, duration: 0.5 }, 4.35)
    .to(exploreDot, { scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, 4.4)
    .to(exploreBar, { autoAlpha: 1, y: 0, duration: 0.6 }, 4.55)

    /* Explore → Feel */
    .to(exploreContent, {
      autoAlpha: 0,
      x: -70,
      filter: 'blur(6px)',
      duration: 0.8,
      ease: 'power1.in'
    }, 5.8)
    .to(exploreCard, {
      autoAlpha: 0,
      x: -50,
      filter: 'blur(6px)',
      duration: 0.7,
      ease: 'power1.in'
    }, 5.88)
    .to([exploreProgress, exploreBar], { autoAlpha: 0, duration: 0.55 }, 5.9)

    .fromTo(
      layers.feel,
      { opacity: 0, scale: 1.06 },
      { opacity: 1, scale: 1.12, duration: 1.05 },
      6.1
    )
    .to(layers.feel, { scale: 1.22, duration: 1.9 }, 7.15)

    .to(feelContent, {
      autoAlpha: 1,
      x: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, 6.55)
    .to(feelCard, {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power2.out'
    }, 6.9)
    .to(feelImage, { scale: 1, duration: 1.5, ease: 'power1.out' }, 6.9)
    .to(feelProgress, { autoAlpha: 1, duration: 0.5 }, 6.75)
    .to(feelDot, { scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, 6.8)
    .to(feelBar, { autoAlpha: 1, y: 0, duration: 0.6 }, 6.95);

  function updateActiveScene(progress) {
    const time = progress * timeline.duration();
    let index = 0;
    if (time >= cuts[2]) index = 3;
    else if (time >= cuts[1]) index = 2;
    else if (time >= cuts[0]) index = 1;

    if (index === activeIndex) return;
    activeIndex = index;
    scenes.forEach((scene, sceneIndex) => {
      scene.classList.toggle('is-current', sceneIndex === index);
    });
  }

  updateActiveScene(0);

  function scrollToTimelineTime(time) {
    const trigger = timeline.scrollTrigger;
    if (!trigger) return;
    const ratio = Math.min(1, Math.max(0, time / timeline.duration()));
    const target = trigger.start + (trigger.end - trigger.start) * ratio;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  const heroCta = heroScene.querySelector('.cta-btn');
  if (heroCta) {
    heroCta.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToTimelineTime(2.4);
    });
  }

  const modeButton = exploreScene.querySelector('.mode-btn');
  if (modeButton) {
    modeButton.addEventListener('click', () => {
      scrollToTimelineTime(7.45);
    });
  }
})();
(function () {
  const modeOptions = document.querySelectorAll('.mode-option');

  modeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      modeOptions.forEach((item) => item.classList.remove('active'));
      option.classList.add('active');
    });
  });

  const destinationButton = document.querySelector('.destination-btn');
  if (destinationButton) {
    destinationButton.dataset.nextPage = destinationButton.dataset.nextPage || 'city-selection';
  }
})();
