gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
    content: "#content",
    smooth: 2,
    effects: true
});

gsap.to(".dmslt", {
    scrollTrigger: {
        trigger: ".container",
        // markers: true,
        start: "-100 center",
        end: "bottom center",
        scrub: 2,
        toggleActions: "play none reverse none"
    },
    r: 600
});

gsap.to(".left-title", {
    scrollTrigger: {
        trigger: ".container-one",
        //markers: true,
        start: "top center",
        end: "60% center",
        scrub: true,
        toggleActions: "play none none none"
    },
    left: 48,
    top: -60,
    opacity: 1
});

gsap.to(".right-title", {
    scrollTrigger: {
        trigger: ".container",
        // markers: true,
        start: "top center",
        end: "bottom 80%",
        scrub: true,
        toggleActions: "play none none none"
    },
    bottom: "-4%",
    opacity: 1
});

gsap.to(".dmslt2", {
    scrollTrigger: {
        trigger: ".container-two",
        //markers: true,
        start: "top center",
        end: "bottom center",
        scrub: 2,
        toggleActions: "play none reverse none"
    },
    r: 1000
});

gsap.to(".title-top", {
    scrollTrigger: {
        trigger: ".container-two",
        // markers: true,
        start: "top center",
        end: "60% center",
        scrub: true,
        toggleActions: "play none none none"
    },
    left: 0,
    top: 20
});

gsap.to(".text-bottom-right", {
    scrollTrigger: {
        trigger: ".container-two",
        // markers: true,
        start: "top center",
        end: "60% center",
        scrub: true,
        toggleActions: "play none none none"
    },
    right: 48,
    top: 0
});

let scrollText = document.querySelector(".scroll-text");

gsap.to(scrollText, {
    duration: 1,
    repeat: -1,
    yoyo: true,
    repeatDelay: 2,
    text: {
        value: "Slowly",
        newClass: "rose-text"
    }
});
