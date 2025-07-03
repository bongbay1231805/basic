const slideuzir = document.querySelector(".slideuzir");
const sliderimg = document.querySelector('.slideuzir img');
const image = document.querySelector(".slideuzir__image");
const container = document.querySelector(".container-uzi");
const bounds = image.getBoundingClientRect();

container.addEventListener("mouseenter", () => {
    slideuzir.addEventListener("mousemove", (e) => {
        const imageSrc = e.target.querySelector(".container-uzi img")?.getAttribute("data-src");

        if (imageSrc) {
            image.src = imageSrc;

            const xMovement = Math.min(Math.max(parseInt(e.movementX), -20), 20);
            const yMovement = Math.min(Math.max(parseInt(e.movementY), -20), 20);

            gsap.to(image, {
                autoAlpha: 1,
                x: e.clientX - bounds.left,
                y: e.clientY - bounds.top - bounds.height / 2,
                transformOrigin: "center",
                rotation: xMovement,
                skewX: xMovement,
                skewY: yMovement,
                ease: "power1.out", 
                force3D: true // Force hardware acceleration
            });
        } else {
            image.src = "";

            gsap.set(image, {
                autoAlpha: 0
            });
        }
    });
});

container.addEventListener("mouseleave", () => {
    gsap.to(image, {
        autoAlpha: 0,
        duration: 0.5, 
        ease: "power2.inOut", 
        onComplete: () => {
            image.src = "";
        }
    });
});


const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    lerp: 0.05,
    smooth: 2,
    smoothTouch: false,
    touchMultiplier: 2,
    wheelMultiplier: 1,
    infinite: false,
    autoResize: true,
  });

  lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {

  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);