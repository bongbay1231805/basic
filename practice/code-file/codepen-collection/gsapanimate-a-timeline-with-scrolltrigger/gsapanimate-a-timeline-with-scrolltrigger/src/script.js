jQuery(document).ready(function ($) {
    
    gsap.registerPlugin(ScrollTrigger) ;

    const tl = gsap.timeline()
    
    gsap.set('h1', {
        autoAlpha: 0,
    })
  
    tl.to('h2', {
        opacity: 0,
      });

     tl.to('.preloader', {
        height: 0,
        duration: 1,
        ease: "expo.inOut",
      });

    tl.to('.img-1', {
        yPercent: -160,
        scale: 0.8,
        ease: 'linear',
    })

    tl.to('.img-2', {
        yPercent: -140,
        scale: 0.85,
        ease: 'linear',
    })

    tl.to('.img-3', {
        yPercent: -120,
        scale: 0.9,
        ease: 'linear',
    })
    
    tl.to('h1', {
        autoAlpha: 1,
        scale: 1.5,
    }, '-=50%')
    
    tl.to('.preloader', {
        height: 0,
        duration: 1,
        ease: "expo.inOut",
      });

    // Prima creo la timeline e poi la animo con Scroll Trigger
    ScrollTrigger.create({
        animation: tl,
        trigger: '.preloader',
        scrub: true,
        start: 'center center',
        end: '+=4000', //più il valore è alto e più scroll bisogna fare per l'animazione (quindi è più "lenta")
        pin: true,

    })
    ScrollTrigger.create({
        animation: tl,
        trigger: '.container',
        scrub: true,
        start: 'center center',
        end: '+=4000', //più il valore è alto e più scroll bisogna fare per l'animazione (quindi è più "lenta")
        pin: true,

    })


});