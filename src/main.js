// Sticky Section Header & TOC logic
(function() {
  const sectionIds = ['about', 'experience', 'projects', 'volunteer', 'testimonials', 'contact'];
  const sectionTitles = {
    about: 'About Me',
    experience: 'Work Experience',
    projects: 'Personal Projects',
    volunteer: 'Volunteer',
    testimonials: 'Testimonials',
    contact: 'Get in Touch',
  };
  const header = document.getElementById('sticky-section-header');
  const headerH2 = header ? header.querySelector('h2') : null;
  const toc = document.getElementById('toc');
  const tocLinks = document.querySelectorAll('.toc-link');
  const heroSection = document.getElementById('home');
  let lastSection = null;
  let tocWasShown = false;
  function isHeroOutOfView() {
    if (!heroSection) return false;
    const rect = heroSection.getBoundingClientRect();
    return rect.bottom <= 80;
  }
  function isAtPageBottom() {
    return (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);
  }
  function onScroll() {
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 80) {
          current = id;
        }
      }
    }
    if (isAtPageBottom()) {
      current = 'contact';
    }
    if (header && headerH2) {
      if (window.innerWidth < 1536 && isHeroOutOfView()) {
        headerH2.textContent = sectionTitles[current];
        header.classList.remove('opacity-0', 'translate-y-[-100%]');
        header.classList.add('opacity-100', 'translate-y-0');
      } else {
        header.classList.add('opacity-0', 'translate-y-[-100%]');
        header.classList.remove('opacity-100', 'translate-y-0');
      }
    }
    if (toc) {
      if (window.innerWidth >= 1536 && isHeroOutOfView()) {
        toc.classList.remove('opacity-0', 'pointer-events-none');
        toc.classList.add('opacity-100');
        tocWasShown = true;
      } else {
        toc.classList.add('opacity-0', 'pointer-events-none');
        toc.classList.remove('opacity-100');
      }
    }
    if (lastSection !== current) {
      lastSection = current;
      tocLinks.forEach(link => {
        if (link.dataset.section === current) {
          link.classList.add('text-blue-400', 'font-bold', 'toc-active');
        } else {
          link.classList.remove('text-blue-400', 'font-bold', 'toc-active');
        }
      });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  window.addEventListener('DOMContentLoaded', () => {
    if (toc) {
      toc.classList.add('opacity-0', 'pointer-events-none', 'invisible');
      toc.classList.remove('opacity-100');
      toc.style.animation = 'none';
    }
    setTimeout(() => {
      if (toc) toc.classList.remove('invisible');
      onScroll();
    }, 200);
  });
})();
// Jump to Top Button logic
(function() {
  const btn = document.getElementById('jump-to-top-btn');
  function onScroll() {
    if (!btn) return;
    if (window.scrollY > window.innerHeight * 0.5) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  if (btn) {
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
