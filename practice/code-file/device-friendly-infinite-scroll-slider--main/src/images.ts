


class ImageContainer{

    translateX: number;
    el: HTMLElement;
    image: HTMLImageElement;
    viewPort: HTMLElement
    centerRef: number;
    parentCenter: number;
    translateNum: number;

    constructor(
        public imgSrc: string, 
        public parentEl: HTMLElement,
        // No need to use this keyword for these parameters as they use the public keyword which automatically asigns these.
    ){
        this.translateX = 0;
        this.viewPort = document.querySelector('.slider__viewport')
        this.translateNum = +this.parentEl.dataset.transform;
        this.appendImage();
        this.setDimensions()
        this.addEventListeners();
    }

    appendImage(){
        this.el = document.createElement('div');
        this.el.classList.add('image__container');
        this.el.style.width = this.parentEl.dataset.width;        
        this.image = document.createElement('img');
        this.image.src = this.imgSrc;
        this.el.appendChild(this.image);
        this.parentEl.appendChild(this.el);
    }

    setDimensions(){
        this.centerRef = window.innerWidth / 2;
    }

    addEventListeners(){
        window.addEventListener('resize', () => {
           this.setDimensions();
        })
    }

    animate(){
        let {left, width } = this.parentEl.getBoundingClientRect();
        this.parentCenter = left + (width / 2);
        this.el.style.transform = `translateX(${(this.centerRef - this.parentCenter) * -this.translateNum}px)`
    }
}

const images: string[] = [
    './build/assets/images/1.avif',
    './build/assets/images/2.avif',
    './build/assets/images/3.avif',
    './build/assets/images/4.avif',
    './build/assets/images/5.avif',
    './build/assets/images/6.avif',
    './build/assets/images/7.avif',
    './build/assets/images/8.avif',
    './build/assets/images/1.avif',
    './build/assets/images/2.avif',
    './build/assets/images/3.avif',
    './build/assets/images/4.avif',
    './build/assets/images/5.avif',
    './build/assets/images/6.avif',
    './build/assets/images/7.avif',
    './build/assets/images/8.avif',
    
]

export  {ImageContainer, images};