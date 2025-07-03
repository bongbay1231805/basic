document.body.addEventListener( 'mousemove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.pageX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.pageY}px`);
});

document.body.querySelectorAll('.highlightable > *').forEach( el => {
  el.addEventListener( 'mouseenter', () => {
    const fs = getComputedStyle(el).getPropertyValue('font-size');
    const lh = getComputedStyle(el).getPropertyValue('line-height');
    document.documentElement.style.setProperty('--cursor-height', `calc( ${fs} + (${lh}/4) )` );
  })
});