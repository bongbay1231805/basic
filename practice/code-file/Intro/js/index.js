
// Registers the Flip plugin with GSAP
gsap.registerPlugin(Flip);

const body = document.body; // Reference to the body element
const frame = document.querySelector('.frame'); // Reference to the frame element
const content = document.querySelector('.content'); // Reference to the content element
const enterButton = document.querySelector('.enter'); // Reference to the "Explore" button
const fullview = document.querySelector('.fullview'); // Reference to the fullview element
const grid = document.querySelector('.grid'); // Reference to the grid element
const gridRows = grid.querySelectorAll('.row'); // Reference to all row elements within the grid


// Linear interpolation
 const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = e => {
  return { 
      x : e.clientX, 
      y : e.clientY 
  };
};
let winsize = { width: window.innerWidth, height: window.innerHeight };
window.addEventListener('resize', () => {
  winsize = { width: window.innerWidth, height: window.innerHeight };
});

let mousepos = { x: winsize.width / 2, y: winsize.height / 2 };

const config = {
  translateX: true,
  skewX: false,
  contrast: true,
  scale: false,
  brightness: true
};

const numRows = gridRows.length;
const middleRowIndex = Math.floor(numRows / 2);

const middleRow = gridRows[middleRowIndex]; // Reference to the middle row
const middleRowItems = middleRow.querySelectorAll('.row__item'); // Reference to all items within the middle row
const numRowItems = middleRowItems.length; // Number of items in the middle row
const middleRowItemIndex = Math.floor(numRowItems / 2); // Index of the middle item in the middle row
const middleRowItemInner = middleRowItems[middleRowItemIndex].querySelector('.row__item-inner');
const middleRowItemInnerImage = middleRowItemInner.querySelector('.row__item-img');
middleRowItemInnerImage.classList.add('row__item-img--large');

const baseAmt = 0.1; // The amt for the middle row, which will have the fastest response.
const minAmt = 0.05; // Minimum amt value to ensure rows have a noticeable movement lag.
const maxAmt = 0.1; // Maximum amt value to ensure rows have a noticeable movement lag.

let renderedStyles = Array.from({ length: numRows }, (v, index) => {
  const distanceFromMiddle = Math.abs(index - middleRowIndex);
  const amt = Math.max(baseAmt - distanceFromMiddle * 0.03, minAmt);
  const scaleAmt = Math.min(baseAmt + distanceFromMiddle * 0.03, maxAmt);
  let style = { amt, scaleAmt };
  
  if (config.translateX) {
    style.translateX = { previous: 0, current: 0 };
  }
  if (config.skewX) {
    style.skewX = { previous: 0, current: 0 };
  }
  if (config.contrast) {
    style.contrast = { previous: 100, current: 100 };
  }
  if (config.scale) {
    style.scale = { previous: 1, current: 1 };
  }
  if (config.brightness) {
    style.brightness = { previous: 100, current: 100 };
  }

  return style;
});

let requestId;

const updateMousePosition = (ev) => {
  const pos = getMousePos(ev);
  mousepos.x = pos.x;
  mousepos.y = pos.y;
};

const calculateMappedX = () => {
  return ((mousepos.x / winsize.width) * 2 - 1) * 40 * winsize.width / 100;
};

const calculateMappedSkew = () => {
  return ((mousepos.x / winsize.width) * 2 - 1) * 3;
};

const calculateMappedContrast = () => {
  const centerContrast = 100;
  const edgeContrast = 330;
  const t = Math.abs((mousepos.x / winsize.width) * 2 - 1);
  const factor = Math.pow(t, 2); // Quadratic factor for non-linear mapping
  return centerContrast - factor * (centerContrast - edgeContrast);
};

const calculateMappedScale = () => {
  const centerScale = 1;
  const edgeScale = 0.95;
  return centerScale - Math.abs((mousepos.x / winsize.width) * 2 - 1) * (centerScale - edgeScale);
};

const calculateMappedBrightness = () => {
  const centerBrightness = 100;
  const edgeBrightness = 15;
  const t = Math.abs((mousepos.x / winsize.width) * 2 - 1);
  const factor = Math.pow(t, 2); // Quadratic factor for non-linear mapping
  return centerBrightness - factor * (centerBrightness - edgeBrightness);
};

const getCSSVariableValue = (element, variableName) => {
  return getComputedStyle(element).getPropertyValue(variableName).trim();
};

const render = () => {
  const mappedValues = {
    translateX: calculateMappedX(),
    skewX: calculateMappedSkew(),
    contrast: calculateMappedContrast(),
    scale: calculateMappedScale(),
    brightness: calculateMappedBrightness()
  };

  gridRows.forEach((row, index) => {
    const style = renderedStyles[index];

    for (let prop in config) {
      if (config[prop]) {
        style[prop].current = mappedValues[prop];
        const amt = prop === 'scale' ? style.scaleAmt : style.amt;
        style[prop].previous = lerp(style[prop].previous, style[prop].current, amt);
      }
    }

    let gsapSettings = {};
    if (config.translateX) gsapSettings.x = style.translateX.previous;
    if (config.skewX) gsapSettings.skewX = style.skewX.previous;
    if (config.scale) gsapSettings.scale = style.scale.previous;
    if (config.contrast) gsapSettings.filter = `contrast(${style.contrast.previous}%)`;
    if (config.brightness) gsapSettings.filter = `${gsapSettings.filter ? gsapSettings.filter + ' ' : ''}brightness(${style.brightness.previous}%)`;

    gsap.set(row, gsapSettings);
  });

  requestId = requestAnimationFrame(render);
};

// Start the render loop
const startRendering = () => {
  if (!requestId) {
    render();
  }
};

// Stop the render loop
const stopRendering = () => {
  if (requestId) {
    cancelAnimationFrame(requestId);
    requestId = undefined;
  }
};

const enterFullview = () => {
  const flipstate = Flip.getState(middleRowItemInner);
  fullview.appendChild(middleRowItemInner);
  
  const transContent = getCSSVariableValue(content, '--trans-content');

  const tl = gsap.timeline();

  tl.add(Flip.from(flipstate, {
    duration: 0.9,
    ease: 'power4',
    absolute: true,
    onComplete: stopRendering
  }))
  .to(grid, {
    duration: 0.9,
    ease: 'power4',
    opacity: 0.01
  }, 0)
  .to(middleRowItemInnerImage, {
    scale: 1.2,
    duration: 3,
    ease: 'sine'
  }, '<-=0.45')
  .to(content, {
    y: transContent, // Use the CSS variable value
    duration: 0.9,
    ease: 'power4'
  })
  .add(() => frame.classList.remove('hidden'), '<')
  .to(middleRowItemInnerImage, {
    scale: 1.1,
    startAt: {filter: 'brightness(100%)'},
    filter: 'brightness(50%)',
    y: '-5vh',
    duration: 0.9,
    ease: 'power4'
  }, '<');
  
  enterButton.classList.add('hidden');
  body.classList.remove('noscroll');
};

const init = () => {
  startRendering();

  enterButton.addEventListener('click', enterFullview);
  enterButton.addEventListener('touchstart', enterFullview);
};

window.addEventListener("load",() => {
  document.body.classList.remove('loading');
  init();
});

window.addEventListener('mousemove', updateMousePosition);
window.addEventListener('touchmove', (ev) => {
  const touch = ev.touches[0];
  updateMousePosition(touch);
});
