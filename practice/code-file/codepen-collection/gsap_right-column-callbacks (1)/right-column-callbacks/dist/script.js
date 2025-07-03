console.clear();

gsap.registerPlugin(ScrollTrigger);

const images = gsap.utils.toArray(".column-content.image");
const titleContainers = gsap.utils.toArray(".column.left .column-content");
ScrollTrigger.create({
  trigger: ".column-wrapper",
  start: "top top",
  end: "+=" + (images.length - 1) * 100 + "%",
  pin: ".column.right",
  markers: true
});

titleContainers.forEach((title, i) => {
  ScrollTrigger.create({
    trigger: title,
    start: "top 60%",
    end: "top 60%",
    markers: {
      indent: 150 * (i + 1)
    },
    id: i + 1,
    onEnter: () => {
      if (i) {
        gsap.to(images, {
          yPercent: -100 * i,
          ease: "power1.inOut",
          overwrite: true
        });
      }
    },
    onEnterBack: () => {
      if (i) {
        gsap.to(images, {
          yPercent: -100 * (i - 1),
          ease: "power1.inOut",
          overwrite: true
        });
      }
    }
  });
});