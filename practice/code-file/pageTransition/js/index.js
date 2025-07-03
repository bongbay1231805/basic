


// .type__line CSS opacity value (CSS variable)
const TYPE_LINE_OPACITY = getComputedStyle(document.body).getPropertyValue('--type-line-opacity');

class TypeTransition {
    // DOM elements
    DOM = {};

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        // lines of text
        this.DOM.lines = [...document.querySelectorAll('.type__line')];
    }
    // "in" transition (total time: 2.5s)
    in() {
        return gsap.timeline({paused: true})
        .to(this.DOM.el, {
            duration: 1.4,
            ease: 'power2.inOut',
            scale: 2.7,
            rotate: -90
        })
        .to(this.DOM.lines, {
            keyframes: [
                { x: '20%', duration: 1, ease: 'power1.inOut' },
                { x: '-200%', duration: 1.5, ease: 'power1.in' }
            ],
            stagger: 0.04
        }, 0)
        .to(this.DOM.lines, {
            keyframes: [
                { opacity: 1, duration: 1, ease: 'power1.in' },
                { opacity: 0, duration: 1.5, ease: 'power1.in' }
            ]
        }, 0)
    }
    out() {
        return gsap.timeline({paused: true})
        .to(this.DOM.el, {
            duration: 1.4,
            ease: 'power2.inOut',
            scale: 1,
            rotate: 0
        }, 1.2)
        .to(this.DOM.lines, {
            duration: 2.3, 
            ease: 'back',
            x: '0%',
            stagger: -0.04
        }, 0)
        .to(this.DOM.lines, {
            keyframes: [
                { opacity: 1, duration: 1, ease: 'power1.in' },
                { opacity: TYPE_LINE_OPACITY, duration: 1.5, ease: 'power1.in' }
            ]
        }, 0);
    }
}

class Article {
    // DOM elements
    DOM = {
        el: null,
        imageWrap: null,
        image: null,
        number: null,
        title: null,
        intro: null,
        description: null
    };

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        // image
        this.DOM.imageWrap = this.DOM.el.querySelector('.article__img-wrap');
        this.DOM.image = this.DOM.el.querySelector('.article__img');
        // number, title, intro, description
        this.DOM.number = this.DOM.el.querySelector('.article__number');
        this.DOM.title = this.DOM.el.querySelector('.article__title');
        this.DOM.intro = this.DOM.el.querySelector('.article__intro');
        this.DOM.description = this.DOM.el.querySelector('.article__description');
    }
}
class Item {
    // DOM elements
    DOM = {
        el: null,
        image: null,
        title: null,
        description: null,
        article: null
    };
    // the Item's Article instance
    article;

    constructor(DOM_el) {
        this.DOM.el = DOM_el;
        // image, title and description
        this.DOM.image = this.DOM.el.querySelector('.item__img');
        this.DOM.title = this.DOM.el.querySelector('.item__caption-title');
        this.DOM.description = this.DOM.el.querySelector('.item__caption-description');
        // article element for this item
        this.DOM.article = document.getElementById(this.DOM.el.dataset.article);
        // Article instance
        this.article = new Article(this.DOM.article);
        // mouseenter/mouseleave events: translate all elements
        const hoverTimelineDefaults = {duration: 1, ease: 'expo'};
        this.DOM.el.addEventListener('mouseenter', () => {
            gsap.timeline({defaults: hoverTimelineDefaults})
            .to([this.DOM.image, this.DOM.title, this.DOM.description], {
                y: pos => pos*8-4
            });
        });
        this.DOM.el.addEventListener('mouseleave', () => {
            gsap.timeline({defaults: hoverTimelineDefaults})
            .to([this.DOM.image, this.DOM.title, this.DOM.description], {
                y: 0
            });
        });
    }
}
// preload images then remove loader (loading class) 
window.addEventListener("load",() => document.body.classList.remove('loading'));

// text transition
const typeT = new TypeTransition(document.querySelector('[data-type-transition]'));

// true if there's an animation running
let isAnimating = false;

// frame element
const frameEl = document.querySelector('.frame');


/**** Items ****/

// items array
let itemsInstanceArr = [];
// current item's index
let currentItem = -1;
// Items wrap 
const itemsWrap = document.querySelector('.item-wrap');

[...itemsWrap.querySelectorAll('.item')].forEach(itemEl => {
    // create a new Item
    const item = new Item(itemEl);
    // add it to the array of Item's indexes
    itemsInstanceArr.push(item);
    
    // on click action
    item.DOM.el.addEventListener('click', () => openItem(item));
});

const openItem = item => {
    if ( isAnimating ) return;
    isAnimating = true;

    // update currentItem index
    currentItem = itemsInstanceArr.indexOf(item);
    
    // gsap timeline
    const openTimeline = gsap.timeline({
        onComplete: () => isAnimating = false
    });
    
    // labels
    openTimeline.addLabel('start', 0)
    // type transition starts a bit after the items animation
    .addLabel('typeTransition', 0.3)
    // the article will show a bit before the text transition ends
    .addLabel('articleOpening', typeT.in().totalDuration()*.75 + openTimeline.labels.typeTransition)

    // fade out the items
    .to(itemsInstanceArr.map(item => item.DOM.el), {
        duration: 0.8,
        ease: 'power2.inOut',
        opacity: 0,
        y: (pos) => pos%2 ? '25%' : '-25%'
    }, 'start')
    // fade out the page frame
    .to(frameEl, {
        duration: 0.8,
        ease: 'power3',
        opacity: 0,
        onComplete: () => gsap.set(frameEl, {pointerEvents: 'none'})
    }, 'start')
    
    // text transition starts here
    .add(typeT.in().play(), 'typeTransition')

    // add current class to the item's article and set the pointer events
    .add(() => {
        gsap.set(backCtrl, {pointerEvents: 'auto'})
        gsap.set(itemsWrap, { pointerEvents: 'none' });
        itemsInstanceArr[currentItem].DOM.article.classList.add('article--current');
    }, 'articleOpening')
    // show the back button
    .to(backCtrl, {
        duration: 0.7,
        opacity: 1
    }, 'articleOpening')
    // initially hide all the article elements so we can animate them in
    .set([item.article.DOM.title, item.article.DOM.number, item.article.DOM.intro, item.article.DOM.description], {
        opacity: 0,
        y: '50%'
    }, 'articleOpening')
    // the image wrap and image elements will have opposite translate values (reveal/unreveal effect)
    .set(item.article.DOM.imageWrap, {y: '100%'}, 2)
    .set(item.article.DOM.image, {y: '-100%'}, 2)
    // now fade in and translate the article's elements
    .to([item.article.DOM.title, item.article.DOM.number, item.article.DOM.intro, item.article.DOM.description], {
        duration: 1,
        ease: 'expo',
        opacity: 1,
        y: '0%',
        stagger: 0.04
    }, 'articleOpening')
    // and reveal the image
    .to([item.article.DOM.imageWrap, item.article.DOM.image], {
        duration: 1,
        ease: 'expo',
        y: '0%'
    }, 'articleOpening');
}


/**** Back action ****/

// back button
const backCtrl = document.querySelector('.back');

const closeItem = () => {
    if ( isAnimating ) return;
    isAnimating = true;

    // current open item
    const item = itemsInstanceArr[currentItem];

    // gsap timeline
    const closeTimeline = gsap.timeline({
        onComplete: () => isAnimating = false
    });

    // labels
    closeTimeline.addLabel('start', 0)
    .addLabel('typeTransition', 0.5)
    .addLabel('showItems', typeT.out().totalDuration()*0.7 + closeTimeline.labels.typeTransition)

    .to(backCtrl, {
        duration: 0.7,
        ease: 'power1',
        opacity: 0
    }, 'start')
    .to([item.article.DOM.title, item.article.DOM.number, item.article.DOM.intro, item.article.DOM.description], {
        duration: 1,
        ease: 'power4.in',
        opacity: 0,
        y: '50%',
        stagger: -0.04
    }, 'start')
    .to(item.article.DOM.imageWrap, {
        duration: 1,
        ease: 'power4.in',
        y: '100%'
    }, 'start')
    .to(item.article.DOM.image, {
        duration: 1,
        ease: 'power4.in',
        y: '-100%'
    }, 'start')

    // remove current class from the item's article and set the pointer events
    .add(() => {
        gsap.set(backCtrl, {pointerEvents: 'none'})
        gsap.set(itemsWrap, { pointerEvents: 'auto' });
        item.DOM.article.classList.remove('article--current');
    })

    // text transition starts here
    .add(typeT.out().play(), 'typeTransition')

    .to(frameEl, {
        duration: 0.8,
        ease: 'power3',
        opacity: 1,
        onStart: () => gsap.set(frameEl, {pointerEvents: 'auto'})
    }, 'showItems')
    .to(itemsInstanceArr.map(item => item.DOM.el), {
        duration: 1,
        ease: 'power3.inOut',
        opacity: 1,
        y: '0%'
    }, 'showItems');
}

backCtrl.addEventListener('click', () => closeItem());