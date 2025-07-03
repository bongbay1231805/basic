gsap.registerPlugin(ScrollTrigger);

const init = () => {
    //첫번째 카드가 기울려진 것
    const introCards = document.querySelectorAll('.intro .card');
    introCards.forEach(introCard => {
        gsap.to(introCard, {
            ease: 'power1.in',
            startAt: {
                transformOrigin: '100% 50%',
                filter: 'brightness(70%)'
            },
            rotationX: () => -60,
            yPercent: () => gsap.utils.random(-100, 0),
            z: () => gsap.utils.random(-100, 0),
            filter: 'brightness(0%)',
            scrollTrigger: {
                trigger: introCard,
                start: 'clamp(top bottom)',
                end: 'clamp(bottom top)',
                scrub: true,
            }
        });
    });




//하나의 예제
    document.querySelectorAll('[data-stack-1]').forEach((stackEl) => {

        let winsize = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        class StackMotionEffect {
            constructor(stackEl) {

                this.wrapElement = stackEl;
                this.contentElement = this.wrapElement.querySelector('.content');
                this.imageElements = [this.contentElement.querySelectorAll('.card')];
                this.imagesTotal = this.imageElements.length;

                this.initializeEffect(stackEl);
            }

            initializeEffect(element) {
                this.scroll();

                const throttledResize = () => {
                    winsize = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                    this.scroll();
                }
                window.addEventListener('resize', throttledResize);
            }

            scroll() {
                this.contentElement.style.transform = 'rotate3d(1, 0, 0, -25deg) rotate3d(0, 1, 0, 50deg) rotate3d(0, 0, 1, 25deg)';
                this.contentElement.style.opacity = 0;

                if (this.tl) {
                    this.tl.kill();
                }

                this.tl = gsap.timeline({
                        defaults: {
                            ease: 'power1',
                        },
                        scrollTrigger: {
                            trigger: this.wrapElement,
                            start: 'top center',
                            end: '+=150%',
                            scrub: true,
                            onEnter: () => gsap.set(this.contentElement, {
                                opacity: 1
                            }),
                            onEnterBack: () => gsap.set(this.contentElement, {
                                opacity: 1
                            }),
                            onLeave: () => gsap.set(this.contentElement, {
                                opacity: 0
                            }),
                            onLeaveBack: () => gsap.set(this.contentElement, {
                                opacity: 0
                            })
                        },
                    })
                    .fromTo(this.imageElements, {
                        z: (pos) => -2.65 * winsize.width - pos * 0.03 * winsize.width,
                    }, {
                        z: (pos) => 1.4 * winsize.width + (this.imagesTotal - pos - 1) * 0.03 * winsize.width,
                    }, 0)
                    .fromTo(this.imageElements, {
                        rotationZ: -220,
                    }, {
                        rotationY: -30,
                        rotationZ: 120,
                        stagger: 0.005,
                    }, 0)
            }
        }

        new StackMotionEffect(stackEl);

    });


    document.querySelectorAll('[data-stack-2]').forEach((stackEl) => {
        let winsize = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        class StackMotionEffect {
            constructor(stackEl) {
                // Check if the provided element is valid.
                if (!stackEl || !(stackEl instanceof HTMLElement)) {
                    throw new Error('Invalid element provided.');
                }

                this.wrapElement = stackEl;
                this.contentElement = this.wrapElement.querySelector('.content');
                this.imageElements = [this.contentElement.querySelectorAll('.card')];
                this.imagesTotal = this.imageElements.length;

                // Set up the effect for the provided element.
                this.initializeEffect(stackEl);
            }

            // Sets up the initial effect on the provided element.
            initializeEffect(element) {
                // Scroll effect.
                this.scroll();

                const throttledResize = () => {
                    winsize = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                    this.scroll();
                };
                window.addEventListener('resize', throttledResize);
            }

            scroll() {
                // Let's set the initial rotation for the content element
                this.contentElement.style.transform = 'rotate3d(1, 0, 0, 55deg) rotate3d(0, 1, 0, 30deg)';
                this.contentElement.style.opacity = 0;

                if (this.tl) {
                    this.tl.kill();
                }

                this.tl = gsap.timeline({
                        defaults: {
                            ease: 'sine.inOut',
                        },
                        scrollTrigger: {
                            trigger: this.wrapElement,
                            start: 'top center',
                            end: '+=150%',
                            scrub: true,
                            onEnter: () => gsap.set(this.contentElement, {
                                opacity: 1
                            }),
                            onEnterBack: () => gsap.set(this.contentElement, {
                                opacity: 1
                            }),
                            onLeave: () => gsap.set(this.contentElement, {
                                opacity: 0
                            }),
                            onLeaveBack: () => gsap.set(this.contentElement, {
                                opacity: 0
                            }),
                        },
                    })
                    .fromTo(this.imageElements, {
                        z: (pos) => -1.2 * winsize.height - pos * 0.08 * winsize.height,
                    }, {
                        z: (pos) => 3 * winsize.height + (this.imagesTotal - pos - 1) * 0.08 * winsize.height,
                    }, 0)
                    .fromTo(this.imageElements, {
                        rotationZ: -130,
                    }, {
                        rotationZ: 360,
                        stagger: 0.006,
                    }, 0)
                /*.fromTo(this.imageElements, {
                  filter: 'brightness(10%)',
                }, {
                  filter: 'brightness(400%)',
                  stagger: 0.005,
                }, 0);*/
            }
        }


        new StackMotionEffect(stackEl);
    });


    document.querySelectorAll('[data-stack-3]').forEach((stackEl) => {
        let winsize = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        class StackMotionEffect {
            constructor(stackEl) {
                // Check if the provided element is valid.
                if (!stackEl || !(stackEl instanceof HTMLElement)) {
                    throw new Error('Invalid element provided.');
                }

                this.wrapElement = stackEl;
                this.contentElement = this.wrapElement.querySelector('.content');
                this.imageElements = [this.contentElement.querySelectorAll('.card')];
                this.imagesTotal = this.imageElements.length;

                // Set up the effect for the provided element.
                this.initializeEffect(stackEl);
            }

            // Sets up the initial effect on the provided element.
            initializeEffect(element) {
                // Scroll effect.
                this.scroll();

                const throttledResize =() => {
                    winsize = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                    this.scroll();
                };
                window.addEventListener('resize', throttledResize);
            }

            scroll() {
                // Let's set the initial rotation for the content element
                this.contentElement.style.transform = 'rotate3d(1, 0, 0, 25deg) rotate3d(0, 1, 0, -50deg) rotate3d(0, 0, 1, 25deg)';
                this.contentElement.style.opacity = 0;

                if (this.tl) {
                    this.tl.kill();
                }

                this.tl = gsap.timeline({
                        defaults: {
                            ease: 'power1',
                        },
                        scrollTrigger: {
                            trigger: this.wrapElement,
                            start: 'top center',
                            end: '+=150%',
                            scrub: true,
                            onEnter: () => gsap.set(this.contentElement, {
                                opacity: 1
                            }),
                            onEnterBack: () => gsap.set(this.contentElement, {
                                opacity: 1
                            }),
                            onLeave: () => gsap.set(this.contentElement, {
                                opacity: 0
                            }),
                            onLeaveBack: () => gsap.set(this.contentElement, {
                                opacity: 0
                            }),
                        },
                    })
                    .fromTo(this.imageElements, {
                        z: (pos) => -2.5 * winsize.width / 2 - pos * 0.07 * winsize.width,
                    }, {
                        z: (pos) => 2.5 * winsize.width + (this.imagesTotal - pos - 1) * 0.07 * winsize.width,
                    }, 0)
                    .fromTo(this.imageElements, {
                        rotationZ: 10,
                    }, {
                        rotationX: 20,
                        rotationZ: 280,
                        yPercent: -100,
                        stagger: 0.005,
                    }, 0)
                /*.fromTo(this.imageElements, {
                  filter: 'brightness(20%)',
                }, {
                  filter: 'brightness(350%)',
                  stagger: 0.005,
                }, 0);*/
            }
        }


        new StackMotionEffect(stackEl);
    });

};






window.addEventListener("load", () => {
    // document.body.classList.remove('loading');
    init();
})