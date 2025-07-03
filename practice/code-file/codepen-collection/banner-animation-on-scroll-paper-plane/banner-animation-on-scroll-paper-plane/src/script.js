const flightPath = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        { x: 100, y: 0 },
        { x: 150, y: 20 },
        { x: 300, y: 50 },
        { x: 500, y: 100 },
        { x: 750, y: -200 },
        { x: 0, y: -50 },
        { x: 600, y: -20 },
        { x: window.innerWidth, y: -300 },
    ]

}
const flightPath2 = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: -600, y: -20},
        { x: -750, y: -200 },
        { x: -200, y: -50 },
        {x: -600, y: -20},
        {x: -900, y: 50},
        {x: -1200, y: -100},
        { x: -window.innerWidth-200, y: -300 },
    ]

}


const tl = new TimelineLite();

tl.add(
    TweenLite.to('.plane-wrapper', 3, {
        bezier: flightPath,
        ease: Power1.easeInOut
    })
);
const tl2 = new TimelineLite();
tl2.add(
    TweenLite.to('.plane-wrapper-2', 3, {
        bezier: flightPath2,
        ease: Power1.easeInOut
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: '.animation',
    duration: 4000,
    triggerHook: 0,

})
    .setTween(tl)
    .setPin('.animation')
    .addTo(controller);

const secondScene = new ScrollMagic.Scene({
    triggerElement: ".animation-pun",
    duration: 3000,
    triggerHook: 0,
}).setTween(tl2)
  .setPin(".animation-pun")
  .addTo(controller);


/*-- Scroll Up/Down add class --*/
$(document).ready(function () {

    var lastScrollTop = 0;
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            //âíèç
            $('.plane-wrapper, .plane-wrapper-2').addClass('scrolling_down');
            $('.plane-wrapper, .plane-wrapper-2').removeClass('scrolling_up');
        } else {
            // ââåðõ 
            $('.plane-wrapper, .plane-wrapper-2').addClass('scrolling_up');
            $('.plane-wrapper, .plane-wrapper-2').removeClass('scrolling_down');
        }
        lastScrollTop = st;
    });
})