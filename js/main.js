// Slider funktsiyasi
function initSliders() {
  const heroSliders = document.querySelectorAll('.hero');

  heroSliders.forEach(hero => {
    const slides = hero.querySelectorAll('.hero__slide');
    const prevBtn = hero.querySelector('.slider-controls__button--prev');
    const nextBtn = hero.querySelector('.slider-controls__button--next');
    const header = document.getElementById('main-header');
    let currentSlide = 0;

    // Sliderni ko'rsatish
    function showSlide(index) {
      try {
        // Slaydlarni yangilash
        slides.forEach((slide, i) => {
          const isActive = i === index;

          // Visual state
          slide.classList.toggle('hero__slide--active', isActive);

          // Accessibility attributes
          slide.setAttribute('aria-current', isActive);
          slide.setAttribute('aria-hidden', !isActive);

          // Screen readerlar uchun qo'shimcha ma'lumot
          if (isActive) {
            slide.setAttribute('aria-live', 'polite');
          } else {
            slide.removeAttribute('aria-live');
          }
        });

        // Header fonini yangilash
        if (header && slides[index].dataset.bg) {
          const isRetina = window.matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches;
          const bgImage = isRetina && slides[index].dataset.bgRetina
            ? slides[index].dataset.bgRetina
            : slides[index].dataset.bg;
          header.style.backgroundImage = `url(${bgImage})`;
        }
      } catch (error) {
        console.error('Slider error:', error);
      }
    }

    // Tugmalar ishlashi
    prevBtn?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });

    nextBtn?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    // Boshlang'ich holat
    if (slides.length > 0) {
      showSlide(0);
    }
  });
}

// DOM tayyor bo'lganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  initSliders();

  // Mobile menu toggle
  const menuToggler = document.querySelector('.header__sitenav-toggler');
  const header = document.querySelector('.header');

  menuToggler?.addEventListener('click', () => {
    const isExpanded = menuToggler.getAttribute('aria-expanded') === 'true';
    menuToggler.setAttribute('aria-expanded', !isExpanded);
    header.classList.toggle('header--open');
  });
});