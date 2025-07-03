gsap.registerPlugin(ScrollTrigger);

class ScrubControlledAnimation {
  constructor() {
    this.DOM = {
      animationWrapper: ".js-scrub-controlled-animation-wrapper",
      animation: ".js-scrub-controlled-animation",
      states: {}
    };

    this.animationWrapper = document.querySelector(this.DOM.animationWrapper);

    this.animation = document.querySelector(this.DOM.animation);

    this.init();
  }

  init() {
    console.log("ScrubControlledAnimation init()");

    if (this.animation) {
      this.scrubAnimation();
    }
  }

  scrubAnimation() {
    const scrubAnimationOptions = {
      container: this.animation,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: this.animation.getAttribute("data-animation-source")
    };

    /**
     *
     */
    let scrubAnimation = lottie.loadAnimation(scrubAnimationOptions);

    scrubAnimation.addEventListener("DOMLoaded", () => {
      this.loadAnimation(scrubAnimation);
    });
  }

  loadAnimation(animation) {
    const scrubAnimationTimeline = gsap.timeline({}).to(
      { frame: 0 },
      {
        duration: 1,
        frame: animation.totalFrames - 1,
        onUpdate: function () {
          animation.goToAndStop(Math.round(this.targets()[0].frame), true);
        }
      },
      "start"
    );

    ScrollTrigger.create({
      trigger: this.animationWrapper,
      animation: scrubAnimationTimeline,
      // markers: true,
      start: "top center",
      end: "bottom top",
      scrub: 0.4
    });
  }
}

new ScrubControlledAnimation();
