const jumpToTopButton = document.getElementById('jump-to-top-btn');

if (jumpToTopButton) {
  const updateVisibility = () => {
    jumpToTopButton.classList.toggle('visible', window.scrollY > window.innerHeight * 0.5);
  };

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);
  jumpToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  updateVisibility();
}
