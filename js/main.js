const elHeaderSitenavToggler = document.querySelector('.header__sitenav-toggler');
const elHeader = document.querySelector('.header');

if (elHeaderSitenavToggler) {
  elHeaderSitenavToggler.addEventListener('click', function() {
    // Headerga open class qo'shish/olish
    elHeader.classList.toggle('header--open');

    // Ikonkani o'zgartirish
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
  });
}






document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero__slide');
  const prevBtn = document.querySelector('.slider-controls__button--prev');
  const nextBtn = document.querySelector('.slider-controls__button--next');
  const header = document.getElementById('main-header');
  let currentSlide = 0;

  // Header fonini o'zgartirish funksiyasi
  function updateHeaderBackground(slide) {
    const bg = slide.getAttribute('data-bg');
    const bgRetina = slide.getAttribute('data-bg-retina');

    // Retina ekranlarni tekshirish
    const isRetina = window.devicePixelRatio > 1;
    const bgImage = isRetina && bgRetina ? bgRetina : bg;

    header.style.backgroundImage = `url(${bgImage})`;
  }

  // Slaydni ko'rsatish funksiyasi
  function showSlide(index) {
    // Barcha slaydlarni yashirish
    slides.forEach(slide => {
      slide.classList.remove('hero__slide--active');
    });

    // Yangi slaydni ko'rsatish
    slides[index].classList.add('hero__slide--active');
    currentSlide = index;

    // Header fonini yangilash
    updateHeaderBackground(slides[index]);
  }

  // Keyingi slaydga o'tish
  function nextSlide() {
    let newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
  }

  // Oldingi slaydga o'tish
  function prevSlide() {
    let newIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(newIndex);
  }

  // Tugmalarga hodisalar qo'shish
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Boshlang'ich slaydni ko'rsatish
  showSlide(currentSlide);

  // Retina ekranlar uchun qo'shimcha tekshiruv
  window.addEventListener('resize', function() {
    updateHeaderBackground(slides[currentSlide]);
  });
});




/* // Faqat faol slayd tugmasini ko'rsatish
function showSlide(index) {
  // Barcha tugmalarni yashirish
  document.querySelectorAll('.slide__button').forEach(btn => {
    btn.style.display = 'none';
  });

  // Faqat joriy slayd tugmasini ko'rsatish
  const currentSlide = document.querySelectorAll('.hero__slide')[index];
  const currentBtn = currentSlide.querySelector('.slide__button');
  currentBtn.style.display = 'block';
} */