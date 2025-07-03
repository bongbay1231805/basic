import {ImageContainer, images} from "./images.js";

// Slider
const slider: HTMLElement = document.querySelector('.slider');
let slides: HTMLElement[] = Array.from(document.querySelectorAll('.slide'));
let slidesArray: HTMLElement[] = Array.from(slides);
let slideWidth: number = slides[0].getBoundingClientRect().width;

// Counters

let counters: HTMLElement[] = Array.from(document.querySelectorAll('.counter__li'));
let countersArray: HTMLElement[] = Array.from(counters);

let transform: number = 0;

window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
})

// Clone and positioning functions

function cloneElements(elements: HTMLElement[], array: HTMLElement[]){
    for(let i = 0; i < elements.length; i++){
        let clone = elements[i].cloneNode(true) as HTMLElement;
        clone.classList.add('clone');
        elements[i].parentElement.appendChild(clone);
        array.push(clone);
    }
}

function positionElements(elementsArray: HTMLElement[], position: string){
    elementsArray.forEach((element, idx ) => {
        let percent: number = (idx -  (elementsArray.length /2)) * 100;
        element.style[`${position}`] = `${percent}%`;
    })
}

// Clone and position slide panels

cloneElements(slides, slidesArray);
positionElements(slidesArray, 'left')

// Clone and position counters

cloneElements(counters, countersArray);
positionElements(countersArray, 'top')

// Add and position images

let imageContainers: ImageContainer[] = [];
for(let i = 0; i < slidesArray.length; i++){
    let imageContainer = new ImageContainer(images[i], slidesArray[i]);
    imageContainers.push(imageContainer);
}

// Desktop 

slider.addEventListener('wheel', (e) => {
    transform -= e.deltaY;
})

// Touch devices

let startX: number = 0;
let speedX: number = 0;
let isTouching: boolean = false;
let startTime: number = 0;
let elapsedTime: number = 0;

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    speedX = 0; // Reset speed when touch starts
    isTouching = true;
    startTime = performance.now();
})

slider.addEventListener('touchmove', (e) => {
    e.preventDefault();
    
    const deltaX = e.touches[0].clientX - startX;
  
    transform += deltaX;

    startX = e.touches[0].clientX; // reset delta for every move event 
    // Update the speed based on the deltaX value
    elapsedTime = performance.now() - startTime;

    speedX -= (deltaX / (elapsedTime * .1)) * -1;
})

document.addEventListener('touchend', () => {
    startX = 0;
    isTouching = false;
});

// Animation loop
function animate() {
    if (!isTouching && Math.abs(speedX) > 0.1) {
        // Apply deceleration effect
        speedX *= 0.95; // Adjust the deceleration factor as needed
        transform += speedX;  
    }
    // Reset transform position at limit to get infinite effect
    if(transform > slideWidth * (slidesArray.length / 4)) transform = -(slideWidth * (slidesArray.length / 4));
    if(transform < -(slideWidth * (slidesArray.length / 4))) transform = (slideWidth * (slidesArray.length / 4));
    for(let i = 0; i < slidesArray.length; i++){
        slidesArray[i].style.transform = `translateX(${(transform / (window.innerWidth * .6)) * 100}%)`;
        countersArray[i].style.transform = `translateY(${(transform / (window.innerWidth * .6)) * 100}%)`;
        imageContainers[i].animate();
    }

    requestAnimationFrame(animate);
}

animate();