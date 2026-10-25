const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.getElementById('mobileMenu');
const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
const nav = document.querySelector('.nav');

function closeMenu() {
  if (!menuBtn || !mobileMenu) return;
  menuBtn.classList.remove('active');
  mobileMenu.classList.remove('active');
}

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    const isOpening = !mobileMenu.classList.contains('active');
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    if (isOpening && window.anime) {
      anime.set(menuLinks, {
        opacity: 0,
        translateY: -15
      });

      anime({
        targets: menuLinks,
        opacity: [0, 1],
        translateY: [-15, 0],
        delay: anime.stagger(60),
        duration: 450,
        easing: 'easeOutCubic'
      });
    }
  });

  document.addEventListener('click', (event) => {
    if (!menuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

if (nav) {
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

(function () {
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

    const modeButton = exploreScene.querySelector('.mode-btn');
    if (modeButton && feelScene) {
      modeButton.addEventListener('click', () => {
        window.scrollTo({
          top: feelScene.offsetTop,
          behavior: prefersReduced ? 'auto' : 'smooth'
        });
      });
    }

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

  const exploreContent = exploreScene.querySelector('.scroll-content');
  const explorePanelHeader = exploreScene.querySelector('.mode-panel-header');
  const exploreOptions = exploreScene.querySelectorAll('.mode-option');
  const exploreButton = exploreScene.querySelector('.mode-btn');
  const exploreProgress = exploreScene.querySelector('.progress-steps');
  const exploreBar = exploreScene.querySelector('.bottom-bar');

  const feelContent = feelScene.querySelector('.scroll-content');
  const feelGallery = feelScene.querySelector('.destination-gallery');
  const feelTrack = feelScene.querySelector('.destination-track');
  const feelSlideImages = feelScene.querySelectorAll('.destination-slide img');
  const destinationCurrent = feelScene.querySelector('.destination-current');
  const destinationDots = feelScene.querySelectorAll('.destination-dot');
  const feelPath = feelScene.querySelector('.feel-path');
  const feelProgress = feelScene.querySelector('.progress-steps');
  const feelBar = feelScene.querySelector('.bottom-bar');

  // Each scene starts in its own directional pose, not a shared template.
  gsap.set([noticeContent, exploreContent, feelContent], {
    autoAlpha: 0,
    filter: 'blur(9px)'
  });
  gsap.set(noticeContent, { x: 170, y: -12 });
  gsap.set(exploreContent, { y: -80 });
  gsap.set(feelContent, { y: 45 });

  gsap.set(noticeCard, {
    autoAlpha: 0,
    y: 110,
    scale: 0.9,
    filter: 'blur(10px)'
  });

  gsap.set(explorePanelHeader, { autoAlpha: 0, y: -24 });
  gsap.set(exploreOptions, {
    autoAlpha: 0,
    y: 90,
    scale: 0.94,
    rotation: (index) => (index === 0 ? -4 : 4)
  });
  gsap.set(exploreButton, { autoAlpha: 0, y: 30 });

  gsap.set(feelGallery, {
    autoAlpha: 0,
    y: 100,
    scale: 0.96,
    filter: 'blur(8px)'
  });
  gsap.set(feelTrack, { xPercent: 0 });
  gsap.set(feelSlideImages, { scale: 1.1 });
  gsap.set(feelPath, {
    autoAlpha: 0,
    scaleX: 0,
    transformOrigin: 'left center'
  });

  gsap.set([noticeProgress, exploreProgress, feelProgress], { autoAlpha: 0, x: -28 });
  gsap.set([noticeBar, exploreBar, feelBar], { autoAlpha: 0, y: 20 });

  gsap.set(layers.hero, { opacity: 1, scale: 1, yPercent: 0 });
  gsap.set([layers.notice, layers.explore, layers.feel], {
    opacity: 0,
    scale: 1.06,
    yPercent: 1.2
  });

  const cuts = [1.9, 4.6, 6.85];
  let activeIndex = -1;
  let activeDestination = -1;

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

  // Hero: push the camera forward while the copy lifts, blurs and leaves.
  timeline
    .to(layers.hero, { scale: 1.34, yPercent: -1.2, duration: 3 }, 0)
    .to(heroHint, { autoAlpha: 0, duration: 0.5, ease: 'power1.in' }, 0.55)
    .to(
      heroContent,
      {
        autoAlpha: 0,
        y: -85,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power2.in'
      },
      0.65
    );

  // Notice: the heading enters from the right, the card rises into the lower right.
  timeline
    .fromTo(
      layers.notice,
      { opacity: 0, scale: 1.06, yPercent: 1.2 },
      { opacity: 1, scale: 1.14, yPercent: 0, duration: 1.15 },
      1.1
    )
    .to(layers.notice, { scale: 1.24, yPercent: -0.8, duration: 1.5 }, 2.25)
    .to(layers.notice, { scale: 1.38, yPercent: -1.6, duration: 1.4 }, 3.75)
    .to(
      noticeContent,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.05,
        ease: 'power3.out'
      },
      1.5
    )
    .to(
      noticeCard,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out'
      },
      1.9
    )
    .to(noticeProgress, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 1.7)
    .to(noticeBar, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 2);

  // Notice exit: heading drifts away left while the card sinks.
  timeline
    .to(
      noticeContent,
      {
        autoAlpha: 0,
        x: -80,
        y: -10,
        filter: 'blur(7px)',
        duration: 0.8,
        ease: 'power2.in'
      },
      3.3
    )
    .to(
      noticeCard,
      {
        autoAlpha: 0,
        y: 50,
        filter: 'blur(7px)',
        duration: 0.75,
        ease: 'power2.in'
      },
      3.4
    )
    .to([noticeProgress, noticeBar], { autoAlpha: 0, duration: 0.6 }, 3.4);

  // Explore: the title drops in while two mode cards lift side by side.
  timeline
    .fromTo(
      layers.explore,
      { opacity: 0, scale: 1.06, yPercent: 1.2 },
      { opacity: 1, scale: 1.14, yPercent: 0, duration: 1.05 },
      3.62
    )
    .to(layers.explore, { scale: 1.25, yPercent: -0.9, duration: 1.4 }, 4.67)
    .to(layers.explore, { scale: 1.4, yPercent: -1.7, duration: 1.3 }, 6.07)
    .to(
      exploreContent,
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out'
      },
      4.05
    )
    .to(
      explorePanelHeader,
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      4.35
    )
    .to(
      exploreOptions,
      {
        autoAlpha: 1,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.16,
        ease: 'power3.out'
      },
      4.5
    )
    .to(
      exploreButton,
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      4.95
    )
    .to(
      exploreProgress,
      { autoAlpha: 0.55, x: 0, duration: 0.7, ease: 'power2.out' },
      4.3
    )
    .to(exploreBar, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 4.6);

  // Explore exit: the whole mode cluster slips down and fades.
  timeline
    .to(
      exploreContent,
      {
        autoAlpha: 0,
        y: -45,
        filter: 'blur(7px)',
        duration: 0.8,
        ease: 'power2.in'
      },
      5.75
    )
    .to(
      explorePanelHeader,
      { autoAlpha: 0, y: -20, duration: 0.55, ease: 'power2.in' },
      5.8
    )
    .to(
      exploreOptions,
      {
        autoAlpha: 0,
        y: 45,
        scale: 0.96,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power2.in'
      },
      5.85
    )
    .to(
      exploreButton,
      { autoAlpha: 0, y: 25, duration: 0.55, ease: 'power2.in' },
      5.9
    )
    .to([exploreProgress, exploreBar], { autoAlpha: 0, duration: 0.55 }, 5.9);

  // Feel: copy rises into the lower left, the destination gallery lands, then scrolls through cities.
  timeline
    .fromTo(
      layers.feel,
      { opacity: 0, scale: 1.06, yPercent: 1.2 },
      { opacity: 1, scale: 1.14, yPercent: 0, duration: 1.05 },
      6.1
    )
    .to(layers.feel, { scale: 1.44, yPercent: -2, duration: 2.1, ease: 'power1.inOut' }, 7.15)
    .to(
      feelContent,
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.95,
        ease: 'power3.out'
      },
      6.55
    )
    .to(
      feelPath,
      { autoAlpha: 1, scaleX: 1, duration: 1.1, ease: 'power2.out' },
      6.7
    )
    .to(feelProgress, { autoAlpha: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 6.7)
    .to(
      feelGallery,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'back.out(1.2)'
      },
      6.9
    )
    .to(feelSlideImages, { scale: 1, duration: 1.4, ease: 'power2.out' }, 6.95)
    .to(feelBar, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 6.9)
    .to(feelTrack, { xPercent: -33.3333, duration: 0.65, ease: 'power2.inOut' }, 7.55)
    .to(feelTrack, { xPercent: -66.6667, duration: 0.65, ease: 'power2.inOut' }, 8.3);

  function updateActiveScene(progress) {
    const time = progress * timeline.duration();
    let index = 0;

    if (time >= cuts[2]) index = 3;
    else if (time >= cuts[1]) index = 2;
    else if (time >= cuts[0]) index = 1;

    updateDestination(time);

    if (index === activeIndex) return;

    activeIndex = index;
    scenes.forEach((scene, sceneIndex) => {
      scene.classList.toggle('is-current', sceneIndex === index);
    });
  }

  function updateDestination(time) {
    const index = time >= 8.55 ? 2 : time >= 7.8 ? 1 : 0;
    if (index === activeDestination) return;

    activeDestination = index;

    if (destinationCurrent) {
      destinationCurrent.textContent = String(index + 1).padStart(2, '0');
    }

    destinationDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === index);
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

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();

(function () {
  const liveTimes = document.querySelectorAll('.live-time');
  if (!liveTimes.length) return;

  const formatter = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  });

  function updateClock() {
    const now = new Date();
    const value = formatter.format(now);

    liveTimes.forEach((node) => {
      node.textContent = value;
      node.setAttribute('datetime', now.toISOString());
    });
  }

  function scheduleNextMinute() {
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    window.setTimeout(() => {
      updateClock();
      scheduleNextMinute();
    }, Math.max(1000, delay));
  }

  updateClock();
  scheduleNextMinute();
})();

(function () {
  document.querySelectorAll('img[data-fallback]').forEach((image) => {
    const useFallback = () => {
      if (image.dataset.fallbackUsed === 'true') return;

      image.dataset.fallbackUsed = 'true';
      image.src = image.dataset.fallback;
    };

    image.addEventListener('error', useFallback);
    if (image.complete && image.naturalWidth === 0) useFallback();
  });
})();

(function () {
  const modeOptions = document.querySelectorAll('.mode-option');

  modeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      modeOptions.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });

      option.classList.add('active');
      option.setAttribute('aria-pressed', 'true');
    });
  });
})();
