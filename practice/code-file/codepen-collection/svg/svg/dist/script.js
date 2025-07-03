/** @format */
const svg = document.getElementById('svg');
const tl = gsap.timeline({
  onComplete: () => {
    document.body.style.overflow = 'visible';
  },
});

const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z';
const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z';

tl.from('.loader-wrap-heading h1', {
  delay: 0.5,
  y: 200,
  skewY: 20,
}).to('.loader-wrap-heading h1', {
  delay: 0.5,
  y: -200,
  skewY: 20,
});
tl.to(svg, {
  duration: 0.8,
  attr: { d: curve },
  ease: 'power2.easeIn',
}).to(svg, {
  duration: 0.8,
  attr: { d: flat },
  ease: 'power2.easeOut',
});
tl.to('.loader-wrap', {
  y: -1500,
});
tl.to('.loader-wrap', {
  zIndex: -1,
  display: 'none',
});
tl.from(
  '.container',
  {
    y: 100,
    opacity: 0,
  },
  '-=1.5'
);
tl.from(
  'nav',
  {
    duration: 1,
    opacity: 0,
  },
  '-=1.2'
);

document.addEventListener('DOMContentLoaded', function () {
  var navbar = document.querySelector('.navbar');
  var navLinks = document.querySelectorAll('.navbar ul li');

  window.onscroll = function () {
    // Überprüfen Sie, wie weit die Seite gescrollt wurde
    var scrollHeight = window.scrollY || document.documentElement.scrollTop;

    // Code für die Navbar
    if (scrollHeight > 50) {
      navLinks.forEach(function (link) {
        link.classList.add('hide');
      });
    } else {
      navLinks.forEach(function (link) {
        link.classList.remove('hide');
      });
    }
  };
});

// Warten, bis das gesamte Dokument geladen ist
$(document).ready(function () {
  // Selektiere alle Elemente mit der Klasse 'btn'
  $('.btn')
    // Füge Event-Handler für 'mouseenter' (Maus betritt das Element) hinzu
    .on('mouseenter', function (e) {
      // Erhalte die Position des übergeordneten Elements und berechne die relative Position der Maus
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;

      // Setze die Position des 'span'-Elements entsprechend der Mausposition
      $(this).find('span').css({
        top: relY,
        left: relX,
      });
    })

    // Füge Event-Handler für 'mouseout' (Maus verlässt das Element) hinzu
    .on('mouseout', function (e) {
      // Erhalte die Position des übergeordneten Elements und berechne die relative Position der Maus
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;

      // Setze die Position des 'span'-Elements entsprechend der Mausposition
      $(this).find('span').css({
        top: relY,
        left: relX,
      });
    });
});

// Hover effect start
const button = document.querySelector('.btn');
let boundingRect = button.getBoundingClientRect();

window.addEventListener('resize', () => {
  boundingRect = button.getBoundingClientRect();
});

button.addEventListener('mousemove', (e) => {
  const mousePoxX = e.pageX - boundingRect.left;
  const mousePoxY = e.pageY - boundingRect.top;

  gsap.to(button, {
    x: (mousePoxX - boundingRect.width / 2) * 0.4,
    y: (mousePoxY - boundingRect.height / 2) * 0.4,
    duration: 0.8,
    ease: 'power3.out',
  });

  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1,0.3)',
    });
  });
});
// Hover effect end