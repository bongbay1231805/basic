// assuming the bands are 100px width

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const slider = document.querySelector("#panels");
const sliderWrapper = document.querySelector("#sliderWrapper");

const sections = gsap.utils.toArray(".section");

function distance(){
  return sliderWrapper.scrollWidth - window.innerWidth
}

let scrollTween = gsap.to(sliderWrapper, {
    x: window.innerWidth,
    xPercent: -100,
    ease: "none", // <-- IMPORTANT!
    scrollTrigger: {
      trigger: "#sliderWrapper",
      pin: true,
      scrub: 0.1,
      markers: true,
      end: `+=${distance()}`,
      invalidateOnRefresh: true,
    }
  });

// red section
gsap.to("#band-1", {
  x: () => -1 * window.innerWidth,
  xPercent: 300,
  ease: "none",
  scrollTrigger: {
    trigger: "#sec-0",
    containerAnimation: scrollTween,
    start: "right right-=300px",
    end: "right left",
    markers: true,
    toggleActions: "play none none reset",
    scrub: true,
    id: "1",
    invalidateOnRefresh: true,
  }
});

gsap.to("#band-2", {
  x: () => -1 * window.innerWidth,
  xPercent: 300,
  ease: "none",
  scrollTrigger: {
    trigger: "#sec-1",
    containerAnimation: scrollTween,
    start: "right right-=200px",
    end: "right left+=100px",
    markers: true,
    toggleActions: "play none none reset",
    scrub: true,
    id: "1",
    invalidateOnRefresh: true,
  }
});

gsap.to("#band-3", {
  x: () => -1 * window.innerWidth,
  xPercent: 300,
  ease: "none",
  scrollTrigger: {
    trigger: "#sec-2",
    containerAnimation: scrollTween,
    start: "right right-=100px",
    end: "right left+=200px",
    markers: true,
    toggleActions: "play none none reset",
    scrub: true,
    id: "1",
    invalidateOnRefresh: true,
  }
});


// Calculate the cumulative width of previous sections
const cumulativeWidths = [];
let cumulativeWidth = 0;
sections.forEach((section, index) => {
    cumulativeWidth += section.scrollWidth;
    cumulativeWidths.push(cumulativeWidth);
});

// Add click event on anchor tags with class "band"
const bandLinks = document.querySelectorAll('a.band');
bandLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Calculate the left position based on cumulative widths
        const leftPosition = index > 0 ? cumulativeWidths[index - 1] : 0;

        console.log(`Left position of section ${link.id}: ${leftPosition}px`);
        
        const section = document.querySelector(`section[data-section='${link.id}']`);
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: leftPosition + 300,
            }
        });
    });
});