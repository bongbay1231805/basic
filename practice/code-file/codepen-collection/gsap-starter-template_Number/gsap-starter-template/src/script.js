console.clear();

//gsap.to()... infinity and beyond!

//To learn more about using GreenSock's bonus plugins for free on CodePen visit: https://gsap.com/trial

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    start: "top top",
    end: "+=3000",
    scrub: true,
    markers: true
  }
});

const blocks = document.querySelector(".blocks");

const blockElements = gsap.utils.toArray(".block");
const block1 = blocks.querySelector(".block-1");
const block2 = blocks.querySelector(".block-2");
const block3 = blocks.querySelector(".block-3");
const progressBlock = document.querySelector(".progress");
const opacityDuration = 0.6;

const blockSettings = [
  { element: block1, position: 30 },
  { element: block2, position: 50 },
  { element: block3, position: 60 }
];

tl.to(
  blocks,
  {
    duration: 100,
    onUpdate: function () {
      const progress = tl.progress();
      progressBlock.innerHTML = progress.toFixed(2);
    }
  },
  "<"
);

blockSettings.forEach((b, i) => {
  const block = blockElements[i];
  const otherBlocks = blockElements.filter((block, j) => i !== j);
  tl.add(() => {
    gsap.to(block, { opacity: 1, duration: 1, scale: 1 });
    gsap.to(otherBlocks, { opacity: 0, duration: 1, scale: 1.2 });
  }, b.position);
});
