const wrapElement = document.querySelector('[data-expand-2]');
 const image = wrapElement.querySelector('.expanding-text-img')
 const expandTexts = wrapElement.querySelectorAll('.anim')
 const textBlock = wrapElement.nextElementSibling 

wrapElement.classList.add('text--open')
    const flipstate = Flip.getState(image)
    wrapElement.classList.remove('text--open')

    Flip.to(flipstate, {
      ease: 'sine',
      simple: true,
      scrollTrigger: {
        trigger: wrapElement,
        start: 'center bottom',
        end: 'center top',
        scrub: true
      }
    }).to(expandTexts, {
      ease: 'sine',
      skewX: -20,
      scrollTrigger: {
        trigger: wrapElement,
        start: 'center bottom',
        end: 'center top',
        scrub: true
      }
    })