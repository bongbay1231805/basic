


// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Clamp val within min and max
const clamp = (val, min, max) => Math.max(Math.min(val, max), min);







    // Check if firefox


const getWinSize = () => { 
    return {
        width: window.innerWidth, 
        height: window.innerHeight
    };
};
let winsize = getWinSize();
window.addEventListener('resize', () => winsize = getWinSize());
  

class TextOnPath {
    constructor(svgEl) {
        // The SVG element
        this.DOM = {svg: svgEl};
        // The text element
        this.DOM.text = this.DOM.svg.querySelector('text');
        this.DOM.textPath = this.DOM.text.querySelector('textPath');
        const filterType = this.DOM.svg.dataset.filterType;
        const filterId = this.DOM.text.getAttribute('filter') && this.DOM.text.getAttribute('filter').match(/url\(["']?([^"']*)["']?\)/)[1];
        // url("https://example.com")
        // url('https://example.com')
        // url(https://example.com)
        // 위의 모든 경우에 대해 https://example.com 부분만을 추출하게 됩니다.
        this.filterPrimitive = filterType && filterId && new FilterPrimitive(filterType, filterId);
        this.pathLength = this.DOM.svg.querySelector('path').getTotalLength();
        this.svgRect = this.DOM.svg.getBoundingClientRect();
        this.positionY = this.svgRect.top + window.pageYOffset;
        window.addEventListener('resize', () => {
            this.svgRect = this.DOM.svg.getBoundingClientRect();
            this.positionY = this.svgRect.top + window.pageYOffset;
        });
        // In order to smooth the text animation, we will use linear interpolation to calculate the value of the startOffset
        // "value" is the current interpolated value and "amt" the amount to interpolate
        this.startOffset = {
            value: this.computeOffset(),
            amt: 0.22
        };
        // Calculate and set initial startOffset value
        this.startOffset.value = this.computeOffset();
        this.updateTextPathOffset();
       
        this.scroll = {
            value: window.pageYOffset,
            amt: 0.17
        };
        // By using the IntersectionObserverAPI to check when the SVG element in inside the viewport, we can avoid calculating and updating the values for the elements outside the viewport
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.intersectionRatio > 0;
                if ( !this.isVisible ) {
                    this.entered = false;
                    // reset
                    this.update();
                }
            });
        });
        this.observer.observe(this.DOM.svg);

        // rAF/loop
        requestAnimationFrame(() => this.render());
    }
  
    computeOffset() {
    
        return map(this.positionY - window.pageYOffset, winsize.height, 0, this.pathLength, -this.pathLength/2);
    }
    // Updates the text startOffset value
    updateTextPathOffset() {
        this.DOM.textPath.setAttribute('startOffset', this.startOffset.value);
    }
    update() {
        // Calculate and set the interpolated startOffset value
        const currentOffset = this.computeOffset();
        this.startOffset.value = !this.entered ? currentOffset : lerp(this.startOffset.value, currentOffset, this.startOffset.amt);
        this.updateTextPathOffset();
        
        // SVG Filter related:
        // The current scroll value
        const currentScroll = window.pageYOffset;
        // Interpolated scroll value
        this.scroll.value = !this.entered ? currentScroll : lerp(this.scroll.value, currentScroll, this.scroll.amt);
        // Distance between the current and interpolated scroll value
        const distance = Math.abs(this.scroll.value - currentScroll);
        // Update the filter primitive attribute that changes as the scroll speed increases
        this.filterPrimitive && this.filterPrimitive.update(distance);

        if ( !this.entered ) {
            this.entered = true;
        }
    }
    render() {
        if ( this.isVisible ) {
            this.update();
        }
        // ...
        requestAnimationFrame(() => this.render());
    }
}

class FilterPrimitive {
    constructor(type, id) {
        this.type = type;
        this.DOM = {el: document.querySelector(`${id} > ${this.getPrimitiveType(this.type)}`)};  
    }
    getPrimitiveType(type) {
        const types = {
            'blur': 'feGaussianBlur',
            'distortion': 'feDisplacementMap'
        };
        return types[type];
    }
    update(distance) {
        const types = {
            // The blur stdDeviation will be 0 when the distance equals 0 and 10 when the distance equals 400
            'blur': () => this.DOM.el.setAttribute('stdDeviation', clamp(map(distance, 0, 400, this.DOM.el.dataset.minDeviation || 0, this.DOM.el.dataset.maxDeviation || 10), this.DOM.el.dataset.minDeviation || 0, this.DOM.el.dataset.maxDeviation || 10)),
            // The displacementMap scale will be 0 when the distance equals 0 and 100 when the distance equals 200
            'distortion': () => this.DOM.el.scale.baseVal = clamp(map(distance, 0, 200, this.DOM.el.dataset.minScale || 0, this.DOM.el.dataset.maxScale || 100), this.DOM.el.dataset.minScale || 0, this.DOM.el.dataset.maxScale || 100)
        }; 
        return types[this.type]();       
    }
}


[...document.querySelectorAll('svg.svgtext')].forEach(el => new TextOnPath(el));

