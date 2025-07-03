const getHeight = el => {
    const computedStyle = getComputedStyle(el);

    let elementHeight = el.clientHeight;  // height with padding
    elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
    return elementHeight;
}
class RepeatTextScrollFx {
    // DOM elements
	DOM = {
		// main element ([data-text-rep])
		el: null,
        // all text spans except the last one (this will be the centered one and doesn't translate
        words: null,
	}
	totalWords = 9;
    tyIncrement = 12;
	delayIncrement = 0.1;
    scrollTimeline;
    observer;

	constructor(Dom_el) {
		this.DOM.el = Dom_el;
        this.layout();
        this.setBoundaries();
        this.createScrollTimeline();
        this.createObserver();

        window.addEventListener('resize', () => this.setBoundaries());
	}
    layout() {
        const halfWordsCount = Math.floor(this.totalWords/2);
        let innerHTML = '';
	    
        for (let i = 0; i < this.totalWords; ++i) {
            
            let ty;
	        let delay;
            
			if ( i === this.totalWords-1 ) {
				ty = 0;
				delay = 0;
			}
			else if ( i < halfWordsCount ) {
				ty = halfWordsCount*this.tyIncrement-this.tyIncrement*i;
				delay = this.delayIncrement*(halfWordsCount-i)-this.delayIncrement
				
			}
			else {
				ty = -1*(halfWordsCount*this.tyIncrement-(i-halfWordsCount)*this.tyIncrement);
				delay = this.delayIncrement*(halfWordsCount- (i-halfWordsCount) )-this.delayIncrement
			}
			
			innerHTML += `<span data-delay="${delay}" data-ty="${ty}">${this.DOM.el.innerHTML}</span>`;
		}
		
		this.DOM.el.innerHTML = innerHTML;
		this.DOM.el.classList.add('text-rep');

        this.DOM.words = [...this.DOM.el.querySelectorAll('span')].slice(0, -1);
    }

    setBoundaries() {
        // Set up the margin top and padding bottom values
        const paddingBottomMarginTop = getHeight(this.DOM.el) * Math.floor(this.totalWords/2) * this.tyIncrement/100;
		gsap.set(this.DOM.el, {
			marginTop: paddingBottomMarginTop,
			paddingBottom: paddingBottomMarginTop
		});
    }
   
    createScrollTimeline() {
        this.scrollTimeline = gsap.timeline({paused: true})
		
        .to(this.DOM.words, {
			duration: 1,
			ease: 'power1',
			yPercent: (_,target) => target.dataset.ty,
			delay: (_,target) => target.dataset.delay
		})
    }
    
    createObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px',
            threshold: 0
        };
        
		
		this.observer = new IntersectionObserver(entry => {
			if (entry[0].intersectionRatio > 0) {
				
				if ( !this.isLoaded ) {
					this.isLoaded = true;
				}
				gsap.ticker.add(this.progressTween);

			} 
			else {

				if ( this.isLoaded ) {
					gsap.ticker.remove(this.progressTween);
				}
				else {
					this.isLoaded = true;
					// add and remove immediately
					gsap.ticker.add(this.progressTween, true);
				}
				
			}
		}, observerOptions);

        this.progressTween = () => {
			const scrollPosition = (window.scrollY + window.innerHeight);
			const elPosition = (scrollPosition - this.DOM.el.offsetTop);
			const durationDistance = (window.innerHeight + this.DOM.el.offsetHeight);
			const currentProgress = (elPosition / durationDistance);
			this.scrollTimeline.progress(currentProgress);
		}
		
		this.observer.observe(this.DOM.el);
    }
}

window.addEventListener("load",() => {
	
	// Apply the effect on these elements
	document.querySelectorAll('[data-text-rep]').forEach(textEl => {
		new RepeatTextScrollFx(textEl);
	});


});