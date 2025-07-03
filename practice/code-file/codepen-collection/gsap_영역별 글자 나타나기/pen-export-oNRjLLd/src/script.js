let animateElementsCT = document.querySelectorAll('[animate="come-together"]');

    animateElementsCT.forEach((animateElement) => {
        let typeSplit = new SplitType(animateElement, {
            types: 'lines',
            tagName: 'span'
        })
        
        let lines = animateElement.querySelectorAll('.line');
        
        lines.forEach((line, index) => {
            gsap.from(line, {
                x: index % 2 === 0 ? '-100%' : '100%',
                opacity: 0,
                duration: 1,
                ease: 'sine.out',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: line,
                    start: 'top bottom',
                    end: 'center center',
                    scrub: true,
                }
            });
        });
    });