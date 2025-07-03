gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    window.addEventListener("load", function() {

        var animation;

        gsap.set("#motionSVG", { scale: 0.85, autoAlpha: 1 });
        gsap.set("#bee", {transformOrigin: "50% 50%"});

        animation = gsap.to("#motionSVG", {
            scrollTrigger: {
              trigger: "#motionPath",
              start: "top 30%",
              end: '+=2700px',
              scrub: 1,
              markers: false,
              // onUpdate: self => {
              //   gsap.to("#bee", {rotationY: () => self.direction === 1 ? 0 : 180, overwrite: 'auto'});
              // }
            },
            duration: 10,
            ease: "none",
            immediateRender: true,
            motionPath: {
              path: "#motionPath",
              align: "#motionPath",
              alignOrigin: [0.5, 0.5],
            }
          });

    });