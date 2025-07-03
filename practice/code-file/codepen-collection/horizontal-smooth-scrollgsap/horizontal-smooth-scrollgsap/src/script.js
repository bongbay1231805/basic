// Initialize LocomotiveScroll
const lscroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,
  direction: "horizontal"
});

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num);

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
const getMousePos = (e) => {
  return {
    x: e.clientX,
    y: e.clientY
  };
};

// Preload images
const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

// Preload images
const preloadFonts = (id) => {
  return new Promise((resolve) => {
    WebFont.load({
      typekit: {
        id: id
      },
      active: resolve
    });
  });
};

// export {
//     map,
//     lerp,
//     clamp,
//     randomNumber,
//     getMousePos,
//     preloadImages,
//     preloadFonts
// };

// import { gsap } from 'gsap';
// import { lerp, getMousePos } from './utils.js';

// Track the mouse position
let mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
  constructor(el) {
    this.DOM = { el: el };
    this.DOM.el.style.opacity = 0;

    this.bounds = this.DOM.el.getBoundingClientRect();

    this.renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.2 },
      ty: { previous: 0, current: 0, amt: 0.2 },
      scale: { previous: 1, current: 1, amt: 0.15 }
      //opacity: {previous: 1, current: 1, amt: 0.1}
    };

    this.onMouseMoveEv = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current =
        mouse.x - this.bounds.width / 2;
      this.renderedStyles.ty.previous = this.renderedStyles.ty.previous =
        mouse.y - this.bounds.height / 2;
      gsap.to(this.DOM.el, {
        duration: 0.9,
        ease: "Power3.easeOut",
        opacity: 1
      });
      requestAnimationFrame(() => this.render());
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }
  enter() {
    this.renderedStyles["scale"].current = 2.5;
    //this.renderedStyles['opacity'].current = 0.5;
  }
  leave() {
    this.renderedStyles["scale"].current = 1;
    //this.renderedStyles['opacity'].current = 1;
  }
  render() {
    this.renderedStyles["tx"].current = mouse.x - this.bounds.width / 2;
    this.renderedStyles["ty"].current = mouse.y - this.bounds.height / 2;

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        this.renderedStyles[key].amt
      );
    }

    this.DOM.el.style.transform = `translateX(${this.renderedStyles["tx"].previous}px) translateY(${this.renderedStyles["ty"].previous}px) scale(${this.renderedStyles["scale"].previous})`;
    //this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

    requestAnimationFrame(() => this.render());
  }
}

// import {preloadImages, preloadFonts} from '../utils.js';
// import Cursor from '../cursor.js';
// import LocomotiveScroll from 'locomotive-scroll';

// let's skew the images when scrolling. The faster we scroll the higher the skew value
// skew interval from -15 to 15
// "fast scrolling" means the distance from the previous scrolling position to the current one is high. We consider a interval of [-50,50] for the min/max distance
let scroll = { cache: 0, current: 0 };
const allImgs = [...document.querySelectorAll(".gallery__item-img")];
lscroll.on("scroll", (obj) => {
  scroll.current = obj.scroll.x;
  const distance = scroll.current - scroll.cache;
  scroll.cache = scroll.current;
  const skewVal = map(distance, -50, 50, -15, 15);
  allImgs.forEach(
    (el) => (el.style.transform = "skewX(" + clamp(skewVal, -15, 15) + "deg)")
  );
});
lscroll.update();

//you can use a promise to resolve if you like 😂
// Preload images and fonts
// Promise.all([preloadImages('.gallery__item-imginner'), preloadFonts('vxy2fer')]).then(() => {

// Initialize custom cursor
const cursor = new Cursor(document.querySelector(".cursor"));

// Mouse effects on all links and others
[...document.querySelectorAll("a")].forEach((link) => {
  link.addEventListener("mouseenter", () => cursor.enter());
  link.addEventListener("mouseleave", () => cursor.leave());
});
// });
