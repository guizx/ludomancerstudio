
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNav");
  const brand = navbar.querySelector(".navbar-brand");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  let startX = 0;
  let moved = false;

  carousel.addEventListener('mousedown', e => {
    startX = e.pageX;
    moved = false;
  });

  carousel.addEventListener('mousemove', e => {
    if (Math.abs(e.pageX - startX) > 10) moved = true;
  });

  carousel.querySelectorAll('.carousel-cell').forEach(cell => {
    cell.addEventListener('click', e => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  });
});


const gameModals = document.querySelectorAll('.modal');

gameModals.forEach(modalEl => {
  modalEl.addEventListener('hidden.bs.modal', () => {
    const iframe = modalEl.querySelector('iframe');
    if (iframe) {
      const src = iframe.src;
      iframe.src = src;
    }
  });
});


const video = document.getElementById('bg-video');
const heroLight = document.getElementById('hero-light');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

function updateHeroLight() {
  if (video.paused || video.ended) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const heightSample = 50; 
  const imageData = ctx.getImageData(0, canvas.height - heightSample, canvas.width, heightSample);
  const data = imageData.data;

  let r = 0, g = 0, b = 0;
  const count = data.length / 4;

  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }

  r = Math.floor(r / count);
  g = Math.floor(g / count);
  b = Math.floor(b / count);

  heroLight.style.background = `linear-gradient(to top, rgba(${r},${g},${b},0.7), rgba(0,0,0,0))`;

  requestAnimationFrame(updateHeroLight);
}

video.addEventListener('loadeddata', () => {
  updateHeroLight();
});



(function () {
  const elements = document.querySelectorAll('.js-flickity');
  
  elements.forEach(elem => {
    const flkty = new Flickity(elem, {
      wrapAround: true,
      autoPlay: 4000,
      pauseAutoPlayOnHover: true,
      imagesLoaded: true,
      pageDots: true,
      prevNextButtons: true,
      lazyLoad: 1,
      draggable: true
    });

    flkty.on('change', function() {
        flkty.playPlayer(); 
    });

    elem.querySelectorAll('img').forEach(img => {
      img.draggable = false;
      img.addEventListener('dragstart', e => e.preventDefault());
    });

    flkty.on('staticClick', function (event, pointer, cellElement, cellIndex) {
      if (!cellElement) return;
      const modalSelector = cellElement.getAttribute('data-modal');
      const modalEl = document.querySelector(modalSelector);
      if (modalEl) {
        new bootstrap.Modal(modalEl).show();
      }
    });

    // Controle de player ao arrastar
    flkty.on('dragStart', () => flkty.stopPlayer());
    flkty.on('dragEnd', () => flkty.playPlayer());
  });
})();



document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = encodeURIComponent(document.getElementById('name').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const message = encodeURIComponent(document.getElementById('message').value);

  const subject = `Mensagem de ${name}`;
  const body = `Nome: ${name}%0AEmail: ${email}%0A%0AMensagem:%0A${message}`;

  window.location.href = `mailto:seuemail@dominio.com?subject=${subject}&body=${body}`;
});

$('.modal').on('shown.bs.modal', function () {
    $(this).find('.js-flickity').flickity('resize');
});