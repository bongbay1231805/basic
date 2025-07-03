const calcWinsize = () => {
    return {
        width: window.innerWidth, 
        height: window.innerHeight
    }
}
const lerp = (a, b, n) => (1 - n) * a + n * b;


const getCursorPos = ev => {
     return { 
         x : ev.clientX, 
         y : ev.clientY 
     };
 };


const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

let winsize = calcWinsize();
window.addEventListener('resize', () => winsize = calcWinsize());

let cursor = {x: winsize.width/2, y: winsize.height/2};
window.addEventListener('mousemove', ev => cursor = getCursorPos(ev));

class InteractiveTilt {
    DOM = {
        el: null, // Main element (.content)
        wrapEl: null // Wrap element (.content__img-wrap)
    };

    defaults = {
        perspective: 800, // CSS perspective value for the 3D effect
        valuesFromTo: {
            x: [-35, 35],
            y: [-35, 35],
            rx: [-18, 18], // rotation on the X-axis
            ry: [-10, 10], // rotation on the Y-axis
            rz: [-4, 4]   // rotation on the Z-axis
        },
        amt: 0.1
    };

    imgTransforms = {x: 0, y: 0, rx: 0, ry: 0, rz: 0};

  
    constructor(DOM_el, options) {
        this.DOM.el = DOM_el;
        this.DOM.wrapEl = this.DOM.el.querySelector('.content__img-wrap');
        this.options = Object.assign(this.defaults, options);
        
        if (this.options.perspective) {
            this.DOM.el.style.perspective = `${this.options.perspective}px`;
        }

        requestAnimationFrame(() => this.render());
    }
    

    render() {
        this.imgTransforms.x = lerp(this.imgTransforms.x, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.x[0], this.options.valuesFromTo.x[1]), this.options.amt);
        this.imgTransforms.y = lerp(this.imgTransforms.y, map(cursor.y, 0, winsize.height, this.options.valuesFromTo.y[0], this.options.valuesFromTo.y[1]), this.options.amt);
        this.imgTransforms.rz = lerp(this.imgTransforms.rz, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.rz[0], this.options.valuesFromTo.rz[1]), this.options.amt);

        this.imgTransforms.rx = !this.options.perspective ? 0 : lerp(this.imgTransforms.rx, map(cursor.y, 0, winsize.height, this.options.valuesFromTo.rx[0], this.options.valuesFromTo.rx[1]), this.options.amt);
        this.imgTransforms.ry = !this.options.perspective ? 0 : lerp(this.imgTransforms.ry, map(cursor.x, 0, winsize.width, this.options.valuesFromTo.ry[0], this.options.valuesFromTo.ry[1]), this.options.amt);
        
        this.DOM.wrapEl.style.transform = `translateX(${this.imgTransforms.x}px) translateY(${this.imgTransforms.y}px) rotateX(${this.imgTransforms.rx}deg) rotateY(${this.imgTransforms.ry}deg) rotateZ(${this.imgTransforms.rz}deg)`;
        
        requestAnimationFrame(() => this.render());
    } 
}
///////////////////////////////////////
let lenis;


const initSmoothScrolling = () => {
	// Instantiate the Lenis object with specified properties
	lenis = new Lenis({
		lerp: 0.1, // Lower values create a smoother scroll effect
		smoothWheel: true // Enables smooth scrolling for mouse wheel events
	});

	// Update ScrollTrigger each time the user scrolls
	lenis.on('scroll', () => ScrollTrigger.update());

	// Define a function to run at each animation frame
	const scrollFn = (time) => {
		lenis.raf(time); // Run Lenis' requestAnimationFrame method
		requestAnimationFrame(scrollFn); // Recursively call scrollFn on each frame
	};
	// Start the animation frame loop
	requestAnimationFrame(scrollFn);
};






const setupAnimationDefaults = (itemElement, options) => {
	let defaults = {
	  	clipPaths: {
			step1: {
				initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
			},
			step2: {
				initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
				final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
			}
	  	},
		// Default scroll trigger settings
		scrollTrigger: {
			trigger: itemElement,
			start: 'top 50%',
			end: '+=50%',
			scrub: true,
		},
		// Default perspective setting
	  	perspective: false
	};
  
	// Merge defaults with options provided
	if (options && options.scrollTrigger) {
		defaults.scrollTrigger = {
			...defaults.scrollTrigger,
			...options.scrollTrigger
		};
	}
  
	// Merge and return the complete settings
	return {
		...defaults,
		...options,
		scrollTrigger: defaults.scrollTrigger
	};
};  

const prepareTextForAnimation = itemElement => {
	const textSpans = itemElement.querySelectorAll('.content__text > span');
  
	Splitting({ target: textSpans });
  
	const charsArray = Array.from(textSpans).map(span => {
	  return Array.from(span.querySelectorAll('.char'));
	});
  
	charsArray.forEach(charArray => {
		gsap.set(charArray, { opacity: 0 });
	});
	
	return charsArray;
};


const fx1 = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
	const charsArray = prepareTextForAnimation(itemElement);

	const tl = gsap.timeline({
		defaults: {
			ease: 'none'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set(imageElement, {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		filter: 'brightness(100%)',
		'clip-path': settings.clipPaths.step1.initial
	}, {
		ease: 'sine.in',
		filter: 'brightness(800%)',
		'clip-path': settings.clipPaths.step1.final
	}, 0)
	.to(innerElements[0], {
		ease: 'sine.in',
		rotationY: -40,
		scale: 1.4,
	}, 0)
	.add(() => {
		innerElements[0].classList.toggle('content__img-inner--hidden');
		innerElements[1].classList.toggle('content__img-inner--hidden');
	})
	.to(imageElement, {
		startAt: {  //startAt 속성은 GSAP 애니메이션 라이브러리에서 사용되는 옵션으로, 애니메이션이 시작되기 전에 요소의 초기 상태를 설정
			'clip-path': settings.clipPaths.step2.initial
		},
		'clip-path': settings.clipPaths.step2.final,
		filter: 'brightness(100%)'
	})
	.to(innerElements[1], {
		startAt: {rotationY: 40, scale: 1.4},
		rotationY: 0,
		scale: 1,
	}, '<') 
	.addLabel('texts', '<-=0.3');

	charsArray.forEach((charArray, index) => {
		const staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

		tl.to(charArray, {
			startAt: {opacity: 1, scale: .2},
			opacity: 1,
			scale: 1,
			yPercent: -staggerDirection*40,
			stagger: staggerDirection*0.04
		}, 'texts');
	});

	return tl;
}

const fx2 = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
	const charsArray = prepareTextForAnimation(itemElement);

	const tl = gsap.timeline({
		defaults: {
			ease: 'none'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set([imageElement, itemElement], {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		filter: 'brightness(100%) hue-rotate(0deg)',
		'clip-path': settings.clipPaths.step1.initial
	}, {
		filter: 'brightness(800%) hue-rotate(90deg)',
		'clip-path': settings.clipPaths.step1.final
	}, 0)
	.to(innerElements[0], {
		rotationZ: -5,
		scaleX: 1.8,
	}, 0)
	.add(() => {
		innerElements[0].classList.toggle('content__img-inner--hidden');
		innerElements[1].classList.toggle('content__img-inner--hidden');
	})
	.to(imageElement, {
		startAt: {
			'clip-path': settings.clipPaths.step2.initial
		},
		'clip-path': settings.clipPaths.step2.final,
		filter: 'brightness(100%) hue-rotate(0deg)'
	})
	.to(innerElements[1], {
		startAt: {rotationZ: 5, scaleX: 1.8},
		rotationZ: 0,
		scaleX: 1,
	}, '<')
	.addLabel('texts', '<-=0.3');

	charsArray.forEach((charArray, index) => {
		charArray.sort(() => Math.random() - 0.5);
		const staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

		tl.to(charArray, {
			duration: 0.1,
			opacity: 1,
			stagger: staggerDirection*0.04
		}, 'texts');
	});

	return tl;
}

const fx3 = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
	const text = itemElement.querySelector('.content__text');
	
	return gsap.timeline({
		defaults: {
			ease: 'none'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set([imageElement, itemElement], {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		scale: 0.3,
		filter: 'brightness(100%) contrast(100%)',
		'clip-path': settings.clipPaths.step1.initial
	}, {
		ease: 'sine',
		rotationX: -35,
		rotationY: 35,
		filter: 'brightness(60%) contrast(400%)',
		scale: 0.7,
		'clip-path': settings.clipPaths.step1.final
	}, 0)
	.to(innerElements[0], {
		ease: 'sine',
		skewY: 10,
		scaleY: 1.2,
	}, 0)
	
	.add(() => {
		innerElements[0].classList.toggle('content__img-inner--hidden');
		innerElements[1].classList.toggle('content__img-inner--hidden');
	}, '>')
	.to(imageElement, {
		ease: 'sine.in',
		startAt: {
			'clip-path': settings.clipPaths.step2.initial
		},
		'clip-path': settings.clipPaths.step2.final,
		filter: 'brightness(100%) contrast(100%)',
		scale: 1,
		rotationX: 0,
		rotationY: 0,
	}, '<')
	.to(innerElements[1], {
		ease: 'sine.in',
		startAt: {skewY: 10, scaleY: 2},
		skewY: 0,
		scaleY: 1,
	}, '<')

	.fromTo(text, {
		opacity: 0,
		yPercent: 40,
	}, {
		opacity: 1,
		yPercent: 0,
	}, '>')
	.to(imageElement, {
		ease: 'sine',
		startAt: {filter: 'brightness(100%) contrast(100%) opacity(100%)'},
		filter: 'brightness(60%) contrast(400%) opacity(0%)',
		rotationX: 25,
		rotationY: 2,
		scale: 1.2
	}, '<')
}

const fx4 = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
	const charsArray = prepareTextForAnimation(itemElement);

	const tl = gsap.timeline({
		defaults: {
			ease: 'power1.inOut'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set([imageElement, itemElement], {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		filter: 'brightness(100%) grayscale(0%)',
		'clip-path': settings.clipPaths.step1.initial
	}, {
		rotationZ: 90,
		scale: 0.6,
		filter: 'brightness(800%) grayscale(100%)',
		'clip-path': settings.clipPaths.step1.final
	}, 0)
	.to(innerElements[0], {
		rotationZ: -5,
		scaleX: 1.4,
	}, 0)
	.add(() => {
		innerElements[0].classList.toggle('content__img-inner--hidden');
		innerElements[1].classList.toggle('content__img-inner--hidden');
	})
	.to(imageElement, {
		startAt: {
			'clip-path': settings.clipPaths.step1.final, rotationZ: -90
		},
		'clip-path': settings.clipPaths.step2.final,
		filter: 'brightness(100%) grayscale(0%)',
		rotationZ: 0,
		scale: 1,
	})
	.to(innerElements[1], {
		startAt: {rotationZ: -350, scaleX: 1.4},
		rotationZ: -360,
		scaleX: 1,
	}, '<')
	.addLabel('texts', '<-=0.3');

	charsArray.forEach((charArray, index) => {
		const staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

		tl.to(charArray, {
			startAt: {opacity: 1, scale: .2},
			opacity: 1,
			scale: 1,
			yPercent: staggerDirection*400,
			stagger: staggerDirection*0.02
		}, 'texts');
	});

	return tl;
}

const fx5 = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const innerElements = imageElement.querySelectorAll('.content__img-inner'); // Now it selects both inners
	const charsArray = prepareTextForAnimation(itemElement);

	const tl = gsap.timeline({
		defaults: {
			ease: 'back.out(1.5)'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set([imageElement, itemElement], {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		filter: 'brightness(100%) saturate(100%)',
		'clip-path': settings.clipPaths.step1.initial
	}, {
		ease: 'back.in(1.5)',
		rotationZ: 90,
		scale: 0.6,
		filter: 'brightness(300%) saturate(200%)',
		'clip-path': settings.clipPaths.step1.final
	}, 0)
	.to(innerElements[0], {
		ease: 'back.in(1.5)',
		scaleX: 1.4,
	}, 0)
	.add(() => {
		innerElements[0].classList.toggle('content__img-inner--hidden');
		innerElements[1].classList.toggle('content__img-inner--hidden');
	})
	.to(imageElement, {
		startAt: {
			'clip-path': settings.clipPaths.step1.final, rotationZ: -90
		},
		'clip-path': settings.clipPaths.step2.final,
		filter: 'brightness(100%) saturate(100%)',
		rotationZ: 0,
		scale: 1,
	})
	.to(innerElements[1], {
		startAt: {scaleX: 1.4},
		scaleX: 1,
	}, '<')
	.addLabel('texts', '<-=0.3');

	charsArray.forEach((charArray, index) => {
		charArray.sort(() => Math.random() - 0.5);
		const staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

		tl.fromTo(charArray, {
			opacity: 1, 
			transformOrigin: `50% ${staggerDirection < 0 ? 100 : 0}%`, 
			scaleY: 0
		}, {
			duration: 0.1,
			ease: 'none',
			scaleY: 1,
			stagger: staggerDirection*0.02
		}, 'texts');
	});

	return tl;
}

const fx6 = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const inner = imageElement.querySelector('.content__img-inner');
	const charsArray = prepareTextForAnimation(itemElement);

	const tl = gsap.timeline({
		defaults: {
			ease: 'power2.inOut'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set(imageElement, {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		scale: 0.2,
		filter: 'brightness(50%)',
		'clip-path': settings.clipPaths.step1.initial,
		transformOrigin: '75% 50%'
	}, {
		scale: 1,
		filter: 'brightness(100%)',
		'clip-path': settings.clipPaths.step1.final
	}, 0)
	.fromTo(inner, {
		rotationY: 40,
		scale: 2,
	}, {
		rotationY: 0,
		scale: 1,
	}, 0)

	charsArray.forEach((charArray, index) => {
		const staggerDirection = index % 2 === 0 ? 1 : -1; // Alternate stagger direction

		tl.fromTo(charArray, {
			opacity: 0, 
			scale: 1.2
		}, {
			opacity: 1,
			scale: 1,
			yPercent: staggerDirection*100,
			stagger: staggerDirection*-0.02
		}, 0);
	});

	return tl;
}

const fxIntro = (itemElement, options) => {
	const settings = setupAnimationDefaults(itemElement, options);
	const imageElement = itemElement.querySelector('.content__img');
	const inner = imageElement.querySelector('.content__img-inner');
	
	return gsap.timeline({
		defaults: {
			ease: 'none'
		},
		onStart: () => {
			if ( settings.perspective ) {
				gsap.set(imageElement, {
					perspective: settings.perspective
				});
			}
		},
		scrollTrigger: settings.scrollTrigger
	})
	.fromTo(imageElement, {
		scale: 1,
		xPercent: 0,
		filter: 'brightness(100%)',
		'clip-path': settings.clipPaths.step1.initial
	}, {
		scale: 0.5,
		xPercent: -50,
		'clip-path': settings.clipPaths.step1.final,
		filter: 'brightness(500%)',
	}, 0)
	.to(inner, {
		rotationY: -40,
		scale: 1.4,
	}, 0)
	.to(imageElement, {
		startAt: {
			'clip-path': settings.clipPaths.step2.initial
		},
		scale: 0,
		xPercent: -100,
		'clip-path': settings.clipPaths.step2.final,
		filter: 'brightness(100%)'
	})
	.to(inner, {
		startAt: {rotationY: 40},
		rotationY: 0,
		scale: 1,
	}, '<');
}

const scroll = () => {
	const items = [
		{
			id: '#item-1', 
			animationProfile: fx1,
			interactiveTilt: true, // This item should have the InteractiveTilt effect
			options: {
				perspective: 1000
			} 
		},
		{
			id: '#item-2',
			animationProfile: fx2,
			interactiveTilt: true, // This item should have the InteractiveTilt effect
			options: {
				clipPaths: {
					step1: {
						initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						final: 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)',
					},
					step2: {
						initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
						final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					}
				},
				scrollTrigger: {
					start: 'center bottom',
					end: 'top top'
				},
				perspective: 500
			} 
		},
		{
			id: '#item-3', 
			animationProfile: fx3,
			options: {
				clipPaths: {
					step1: {
						initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
					},
					step2: {
						initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
						final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					}
				},
				scrollTrigger: {
					start: 'center center',
					end: '+=150%',
					pin: true
				},
				perspective: 400
			} 
		},
		{
			id: '#item-4',
			animationProfile: fx4,
			interactiveTilt: true, // This item should have the InteractiveTilt effect
			options: {
				clipPaths: {
					step1: {
						initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
						final: 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)',
					},
					step2: {
						initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
						final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					}
				},
				scrollTrigger: {
					start: 'center bottom',
					end: 'top top-=10%'
				},
				perspective: 500
			} 
		},
		{
			id: '#item-5',
			animationProfile: fx5,
			interactiveTilt: true, // This item should have the InteractiveTilt effect
			options: {
				clipPaths: {
					step1: {
						initial: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
						final: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
					},
					step2: {
						initial: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
						final: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
					}
				},
				scrollTrigger: {
					start: 'top bottom+=20%',
					end: 'bottom top'
				},
				perspective: 500
			} 
		},
		{
			id: '#item-6', 
			animationProfile: fx6,
			interactiveTilt: true, // This item should have the InteractiveTilt effect
			options: {
				clipPaths: {
					step1: {
						initial: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
						final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
					},
				},
				scrollTrigger: {
					start: 'center bottom',
					end: '+=80%'
				},
				perspective: 1000
			} 
		},
		{
			id: '#item-intro', 
			animationProfile: fxIntro,
			interactiveTilt: true, // This item should have the InteractiveTilt effect
			options: {
				scrollTrigger: {
					start: 'clamp(top bottom)',
					end: 'center top'
				},
				perspective: 1000
			} 
		},
	];

	items.forEach(item => {
		const itemElement = document.querySelector(item.id);
		if ( itemElement && item.animationProfile ) {
			item.animationProfile(itemElement, item.options);

			if ( item.interactiveTilt ) {
				new InteractiveTilt(itemElement);
			}
		} else {
			console.warn(`Element with ID ${item.id} or its animation profile is not defined.`);
		}
	});
}

window.addEventListener('load',() => {
    document.body.classList.remove('loading');
	initSmoothScrolling();
	scroll();
});