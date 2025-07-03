const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY)    {
        posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    }
    
    return { x : posx, y : posy }
};

let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

class Cursor {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.el.style.opacity = 0;
        
        this.bounds = this.DOM.el.getBoundingClientRect();
        
        this.renderedStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2},
            scale: {previous: 1, current: 1, amt: 0.17},
            opacity: {previous: 1, current: 1, amt: 0.17}
        };

        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width/2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height/2;
            gsap.to(this.DOM.el, {duration: 0.9, ease: 'Power3.easeOut', opacity: 1});
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', this.onMouseMoveEv);
        };
        window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    enter() {
        this.renderedStyles['scale'].current = 1.8;
        this.renderedStyles['opacity'].current = 0.5;
    }
    leave() {
        this.renderedStyles['scale'].current = 1;
        this.renderedStyles['opacity'].current = 1;
    }
    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width/2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height/2;

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
                    
        this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
        this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

        requestAnimationFrame(() => this.render());
    }
}

Splitting();

class Slide {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.chars = this.DOM.el.querySelectorAll('.word > .char, .whitespace');
        this.DOM.imgs = this.DOM.el.querySelectorAll('.slide__img');
    }
}

class Slideshow {
    constructor(el) {
        this.DOM = {el: el};
        
        // Navigation buttons
        this.DOM.navigation = {
            prev: this.DOM.el.querySelector('.slides__nav--prev'),
            next: this.DOM.el.querySelector('.slides__nav--next')
        };
        // Initialize the Slide instances and store that in an array
        this.slides = [];
        [...this.DOM.el.querySelectorAll('.slide')].forEach(slide => this.slides.push(new Slide(slide)));

        // Index of the current slide
        this.current = 0;
        // Total slides
        this.slidesTotal = this.slides.length;
        // positions (in percentages) for the images movement for both directions
        // example: the second image (top right one) will translate in the y-axis -150% when clicking the next button but when clicking the prev button it will instead translate in the x-axis 150%
        this.positions = {
            x: {
                next: [0,0,0,0],
                prev: [0,0,0,0]
            },
            y: {
                next: [-150,-150,-150,-150],
                prev: [150,150,150,150]
            },
            rotation: {
                next: [-15,15,-15,15],
                prev: [15,-15,15,-15]
            }
        };
        this.initEvents();
    }
    initEvents() {
        this.onClickPrevEv = () => this.navigate('prev');
        this.onClickNextEv = () => this.navigate('next');
        this.DOM.navigation.prev.addEventListener('click', () => this.onClickPrevEv());
        this.DOM.navigation.next.addEventListener('click', () => this.onClickNextEv());
    }
    navigate(direction) {
        if ( this.isAnimating ) {
            return false;
        }
        
        const currentSlide = this.slides[this.current];
        this.current = direction === 'next' ? 
            this.current < this.slidesTotal-1 ? ++this.current : 0:
            this.current > 0 ? --this.current : this.slidesTotal-1;
        const nextSlide = this.slides[this.current];

        gsap.timeline({
            defaults: {duration: 0.8, ease: 'power4.inOut'},
            onStart: () => this.isAnimating = true,
            onComplete: () => {
                // Remove "current" class
                currentSlide.DOM.el.classList.remove('slide--current');
                this.isAnimating = false;
            }
        })
        .addLabel('start', 0)
        // Animate current title out (stagger the characters)
        .to(currentSlide.DOM.chars, {
            y: direction === 'next' ? '-100%' : '100%',
            rotation: direction === 'next' ? 3 : -3,
            stagger: direction === 'next' ? 0.015 : -0.015
        }, 'start')
        // Animate current images out
        .to(currentSlide.DOM.imgs, {
            x: pos => `${this.positions.x[direction][pos]}%`,
            y: pos => `${this.positions.y[direction][pos]}%`,
            rotation: pos => this.positions.rotation[direction][pos],
            opacity: 0,
            stagger: direction === 'next' ? 0.06 : -0.06
        }, 'start')
        .addLabel('upcoming', 0.4)
        .add(() => {
            // Set up upcoming images and text default style:
            gsap.set(nextSlide.DOM.imgs, {opacity: 0});
            gsap.set(nextSlide.DOM.chars, {
                y: direction === 'next' ? '100%' : '-100%', 
                rotation: direction === 'next' ? 3 : -3
            });
            // Add "current" class
            nextSlide.DOM.el.classList.add('slide--current');
        }, 'upcoming')
        // Animate upcoming title in (stagger the characters)
        .to(nextSlide.DOM.chars, {
            y: '0%',
            rotation: 0,
            ease: 'power4',
            stagger: direction === 'next' ? 0.015 : -0.015
        }, 'upcoming')
        // Animate upcoming images in
        .to(nextSlide.DOM.imgs, {
            startAt: {
                x: pos => `${this.positions.x[this.reverseDirection(direction)][pos]}%`,
                y: pos => `${this.positions.y[this.reverseDirection(direction)][pos]}%`,
                rotation: pos => this.positions.rotation[this.reverseDirection(direction)][pos]
            },
            x: '0%',
            y: '0%',
            rotation: 0,
            opacity: 0.4,
            ease: 'power4',
            stagger: direction === 'next' ? 0.06 : -0.06
        }, 'upcoming');
    }
    reverseDirection(direction) {
        return direction === 'next' ? 'prev' : 'next';
    }
}


window.addEventListener("load",() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');

    // Initialize custom cursor
    const cursor = new Cursor(document.querySelector('.cursor'));

    // Initialize the slideshow
    new Slideshow(document.querySelector('.slides'));
    
    // mouse cursor hovers
    [...document.querySelectorAll('a'), ...document.querySelectorAll('.slides__nav')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});
