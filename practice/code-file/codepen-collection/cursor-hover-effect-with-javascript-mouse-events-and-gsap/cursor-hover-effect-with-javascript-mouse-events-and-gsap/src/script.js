const cursorBee = document.querySelector(".cursor-bee");
const cursorEye = document.querySelector(".cursor-eye");
let scale = 1;

function mousemoveHandler(e) {
  const target = e.target;
  const tl = gsap.timeline({
    defaults: {
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out"
    }
  });

  // JUST FOR MY LOGO
  if (
    target.closest(".page-footer") ||
    target.classList.contains("page-footer")
  ) {
    gsap.to(".cursor", {
      opacity: 0
    });
    return;
  }

  if (target.tagName.toLowerCase() === "img" && target.closest(".image-grid")) {
    tl.to(cursorBee, {
      opacity: 0
    }).to(
      cursorEye,
      {
        opacity: 1
      },
      "-=0.5"
    );
  } else {
    if (target.classList.contains("line-animation")) {
      scale = 4;
    } else {
      scale = 1;
    }

    tl.to(cursorBee, {
      opacity: 1,
      scale: scale
    }).to(
      cursorEye,
      {
        opacity: 0
      },
      "-=0.5"
    );
  }
}

function mouseleaveHandler() {
  gsap.to(cursorBee, {
    opacity: 0
  });
}

document.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseleave", mouseleaveHandler);
