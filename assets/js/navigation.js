(() => {
  const header = document.querySelector('.masthead');
  const button = document.querySelector('.masthead__toggle');
  const menu = document.querySelector('.masthead__links');
  if (!button || !menu) return;

  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.classList.toggle('is-open', open);
    if (header) header.classList.toggle('is-open', open);
  };

  button.addEventListener('click', () => {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.masthead__inner-wrap')) setOpen(false);
  });

  window.matchMedia('(min-width: 781px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
})();
