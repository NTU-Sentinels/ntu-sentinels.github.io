(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof window.particlesJS !== 'function') return;

  // Initialise particles with increased count (88) and brighter luminance
  window.particlesJS('particles-js', {
    particles: {
      number: { value: 88, density: { enable: true, value_area: 900 } },
      color: { value: '#f0f0f0' },
      shape: { type: 'circle' },
      opacity: { value: 0.65, random: true, anim: { enable: false } },
      size: { value: 2.4, random: true, anim: { enable: false } },
      line_linked: {
        enable: true,
        distance: 160,
        color: '#d0d0d0',
        opacity: 0.38,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.96,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false }
      }
    },
    interactivity: {
      detect_on: 'window',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 180, line_linked: { opacity: 0.48 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });

  const container = document.getElementById('particles-js');
  const getPJS = () => window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS;

  // Accurate mouse coordinate sync with the viewport-anchored canvas
  const syncMouseCoords = (e) => {
    const pJS = getPJS();
    if (!pJS || !pJS.canvas || !pJS.canvas.el) return null;
    const pxratio = pJS.canvas.pxratio || 1;
    const x = e.clientX * pxratio;
    const y = e.clientY * pxratio;
    pJS.interactivity.mouse.pos_x = x;
    pJS.interactivity.mouse.pos_y = y;
    return { x, y };
  };

  window.addEventListener(
    'mousemove',
    (e) => {
      syncMouseCoords(e);
    },
    { passive: true }
  );

  window.addEventListener(
    'click',
    (e) => {
      const coords = syncMouseCoords(e);
      const pJS = getPJS();
      if (coords && pJS && pJS.fn && pJS.fn.modes && pJS.fn.modes.pushParticles) {
        pJS.interactivity.mouse.click_pos_x = coords.x;
        pJS.interactivity.mouse.click_pos_y = coords.y;
        pJS.interactivity.mouse.click_time = new Date().getTime();
        pJS.fn.modes.pushParticles(4, pJS.interactivity.mouse);
      }
    },
    { passive: true }
  );

  // Content & page-size aware: canvas stays locked to the full viewport
  // On scroll, particles glide with scroll velocity and wrap seamlessly so the background is never empty
  let lastScrollY = window.scrollY;

  const onScroll = () => {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    const pJS = getPJS();
    if (pJS && pJS.particles && pJS.particles.array && pJS.canvas) {
      const h = pJS.canvas.h;
      if (h > 0) {
        const shift = deltaY * 0.14;
        const arr = pJS.particles.array;
        for (let i = 0; i < arr.length; i++) {
          arr[i].y -= shift;
          if (arr[i].y < 0) arr[i].y += h;
          else if (arr[i].y > h) arr[i].y -= h;
        }
      }
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('resize', () => {
    const pJS = getPJS();
    if (pJS && pJS.fn && pJS.fn.canvasResize) {
      pJS.fn.canvasResize();
    }
  }, { passive: true });
})();

