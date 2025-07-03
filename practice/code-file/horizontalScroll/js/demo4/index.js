
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// Gets the mouse position
const getMousePos = e => {
    return {
        x: e.clientX,
        y: e.clientY
    };
};
////////////////////////////

let Element = document.querySelector(".main");
let offset = Element.getBoundingClientRect().top + window.scrollY;
let offsetWidth = Element.getBoundingClientRect().width;
//console.log(offsetWidth)

let scroll = {
    cache: 0,
    current: 0
};
const allImgs = [...document.querySelectorAll('.gallery__item-img')];
const lenis = new Lenis()

lenis.on('scroll', (e) => {
    console.log(e)
})



lenis.on('scroll', ScrollTrigger.update)



lenis.on('scroll', (obj) => {


})

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
///////////////////////////////

let mouse = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

class Cursor {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.DOM.el.style.opacity = 0;

        this.bounds = this.DOM.el.getBoundingClientRect();

        this.renderedStyles = {
            tx: {
                previous: 0,
                current: 0,
                amt: 0.2
            },
            ty: {
                previous: 0,
                current: 0,
                amt: 0.2
            },
            scale: {
                previous: 1,
                current: 1,
                amt: 0.15
            },
            //opacity: {previous: 1, current: 1, amt: 0.1}
        };

        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = mouse.y - this.bounds.height / 2;
            gsap.to(this.DOM.el, {
                duration: 0.9,
                ease: 'Power3.easeOut',
                opacity: 1
            });
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', this.onMouseMoveEv);
        };
        window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    enter() {
        this.renderedStyles['scale'].current = 2.5;
        //this.renderedStyles['opacity'].current = 0.5;
    }
    leave() {
        this.renderedStyles['scale'].current = 1;
        //this.renderedStyles['opacity'].current = 1;
    }
    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width / 2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height / 2;

        for (const key in this.renderedStyles) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }

        this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
        //this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

        requestAnimationFrame(() => this.render());
    }
}

gsap.registerPlugin(ScrollTrigger)





class Example {
    constructor(options) {
        this.root = options.root;

        this.init();

        //setTimeout(this.showImages.bind(this), 1000);
    }

    init() {


        let list = document.querySelectorAll(".gallery .gallery__item");
        let imgBoxs = document.querySelectorAll("[data-scroll-speed]")
        let textBoxs = document.querySelectorAll(".gallery .gallery__text")

        //console.log(imgBoxs)

        const rotationsArr = Array.from({
            length: list.length
        }, () => randomNumber(-30, 30));
        const translationArr = Array.from({
            length: list.length
        }, () => randomNumber(-100, 100));
        // Array.from({ length: elems.length }):
        // elems.length 길이를 가진 배열을 생성합니다. 이 배열은 초기값으로 undefined를 가진 요소들을 가집니다.
        // () => randomNumber(-30, 30):
        // 배열의 각 요소를 채우기 위한 함수입니다. 이 함수는 -30에서 30 사이의 임의의 숫자를 생성합니다. randomNumber 함수는 사용자 정의 함수로, 해당 범위의 난수를 반환합니다.
        // 결과적으로 rotationsArr 배열은 elems 배열의 길이만큼의 요소를 가지며, 각 요소는 -30에서 30 사이의 난수입니다.


        let scrollTween = gsap.to(".gallery>*", { //img영역 
            xPercent: -100 * (list.length * 1.7),
            ease: "none",
            scrollTrigger: {
                trigger: ".main",
                start: "center center",
                scrub: 1,
                end: "+=300%",
                pin: true,

            }
        })


        list.forEach(function (item, idx) {


            gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "center right",
                    end: 'center left',
                    containerAnimation: scrollTween,
                    scrub: true,
                    markers: true,
                    onUpdate: (self) => {
                        let progress = self.progress
                        //map(value, in_min, in_max, out_min, out_max)// 입력 범위 (in_min에서 in_max)의 값을 출력 범위 (out_min에서 out_max)로 변환
                        // map(progress, 0.6, 1, 0, rotationsArr[idx])
                        // progress: 변환할 값입니다.
                        // 0.6: 입력 범위의 최소값입니다.
                        // 1: 입력 범위의 최대값입니다.
                        // 0: 출력 범위의 최소값입니다.
                        // rotationsArr[idx]: 출력 범위의 최대값입니다.rotationsArr는 앞서 정의된 배열이며, idx는 현재 요소의 인덱스입니다.
                        const rotationVal = progress > 0.6 ? clamp(map(progress, 0.6, 1, 0, rotationsArr[idx]), Math.min(0, rotationsArr[idx]), Math.max(0, rotationsArr[idx])) : 0;

                        const translationVal = progress > 0.6 ? clamp(map(progress, 0.6, 1, 0, translationArr[idx]), Math.min(0, translationArr[idx]), Math.max(0, translationArr[idx])) : 0;

                        gsap.to([item,textBoxs], {
                            yPercent: translationVal,
                            rotate: rotationVal
                        })

                    }
                }
            })
         


        })

        // this.images = this.root.querySelectorAll('.image');

    }

}


window.addEventListener("load", () => {

    const example = new Example({
        root: document.querySelector('.scroll-animations-example')
    });

    const cursor = new Cursor(document.querySelector('.cursor'));

    [...document.querySelectorAll('a')].forEach(link => {
        link.addEventListener('mouseenter', () => cursor.enter());
        link.addEventListener('mouseleave', () => cursor.leave());
    });
});