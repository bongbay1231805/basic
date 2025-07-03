


const backtopEl = document.querySelector('.backtop');
const headerEl = document.querySelector('#header');

// Preload  images and fonts
window.addEventListener("load",()=>{

 const scroll = new LocomotiveScroll({
     el: document.querySelector('[data-scroll-container]'),
     smooth: true
 });

 backtopEl.addEventListener('click', () => scroll.scrollTo(headerEl));
})
   