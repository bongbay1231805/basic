document.addEventListener("DOMContentLoaded", function () {
  var immersiveScroll = document.querySelectorAll(".immersive-scroll-video");
  function initialiseImmersiveScroll(container, firstValue) {
    var immersiveVideo = container.querySelector(
      ".immersive-pin .video-container .video-background"
    );
    gsap.utils.toArray(immersiveVideo).forEach((video) => {
      let priority = firstValue + 1;
      console.log("first", priority);
      videoScrub(video, {
        scrollTrigger: {
          trigger: video,
          start: "top",
          end: "100%",
          markers: true,
          scrub: true,
          pin: true,
          onToggle: (self) => self.isActive && console.log(priority),
          refreshPriority: priority
        }
      });
    });

    function videoScrub(video, vars) {
      video = gsap.utils.toArray(video)[0]; // in case selector text is fed in.
      let once = (el, event, fn) => {
          let onceFn = function () {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
          };
          el.addEventListener(event, onceFn);
          return onceFn;
        },
        prepFunc = () => {
          video.play();
          video.pause();
        },
        prep = () => once(document.documentElement, "touchstart", prepFunc),
        src = video.currentSrc || video.src,
        tween = gsap.fromTo(
          video,
          { currentTime: 0 },
          {
            paused: true,
            immediateRender: false,
            currentTime: video.duration || 1,
            ease: "none",
            ...vars
          }
        ),
        resetTime = () =>
          (tween.vars.currentTime = video.duration || 1) && tween.invalidate();
      prep();
      video.readyState ? resetTime() : once(video, "loadedmetadata", resetTime);
      return tween;
    }
  }
  immersiveScroll.forEach(function (container, i) {
    let firstValue = i;
    initialiseImmersiveScroll(container, firstValue);
  });

  var scrollThrough = document.querySelectorAll(".scroll-through-hero");
  function initialisescrollThrough(container, secondValue) {
    var scrollThroughVideo = container.querySelector(
      ".scroll-through-hero-pin .video-container .video-background"
    );
    gsap.utils.toArray(scrollThroughVideo).forEach((video) => {
      let priority = secondValue - 1;
      console.log("second", priority);
      videoScrub1(video, {
        scrollTrigger: {
          trigger: video,
          start: "center center",
          end: "+=600",
          markers: true,
          scrub: true,
          pin: true,
          onToggle: (self) => self.isActive && console.log(priority),
          refreshPriority: priority
        }
      });
    });
    function videoScrub1(video, vars) {
      video = gsap.utils.toArray(video)[0]; // in case selector text is fed in.
      let once = (el, event, fn) => {
          let onceFn = function () {
            el.removeEventListener(event, onceFn);
            fn.apply(this, arguments);
          };
          el.addEventListener(event, onceFn);
          return onceFn;
        },
        prepFunc = () => {
          video.play();
          video.pause();
        },
        prep = () => once(document.documentElement, "touchstart", prepFunc),
        src = video.currentSrc || video.src,
        tween = gsap.fromTo(
          video,
          { currentTime: 0 },
          {
            paused: true,
            immediateRender: false,
            currentTime: video.duration || 1,
            ease: "none",
            ...vars
          }
        ),
        resetTime = () =>
          (tween.vars.currentTime = video.duration || 1) && tween.invalidate();
      prep();
      video.readyState ? resetTime() : once(video, "loadedmetadata", resetTime);
      return tween;
    }
  }
  scrollThrough.forEach(function (container, j) {
    let secondValue = j;
    initialisescrollThrough(container, secondValue);
  });
});