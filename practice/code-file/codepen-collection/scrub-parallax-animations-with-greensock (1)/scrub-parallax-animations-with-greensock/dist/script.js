const heading = document.querySelector('h1');
        const headingSplit = new SplitType(heading);
        const imgs = gsap.utils.toArray('img')

        // Get all the spans (letters) created by SplitType
        const letters = heading.querySelectorAll('.char');
        
        function getRandom(min, max) {
            return Math.random() * (max - min) + min;
        }

        // For each letter, set up a GSAP animation with ScrollTrigger
        letters.forEach((letter, index) => {
            const randomYPercent = getRandom(70, 1100);

            gsap.fromTo(letter, 
                { 
                    yPercent: -randomYPercent,
                    opacity: 0,
                },
                {
                    yPercent: 0,
                    opacity: 1, // Increment yPercent by 5% for each letter
                    scrollTrigger: {
                        trigger: heading,
                        start: "top bottom", // When the top of the heading hits the bottom of the viewport
                        end: "bottom center",   // When the bottom of the heading hits the top of the viewport
                        scrub: true,
                    }
                }
            );
        });

        imgs.forEach(img => {
            const speed = img.dataset.speed
            gsap.to(img, {
                yPercent: speed * 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: img,
                    start: 'top bottom',
                    scrub: true
                }
            })
        })

        // smooth scroll

        const lenis = new Lenis()

        function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)