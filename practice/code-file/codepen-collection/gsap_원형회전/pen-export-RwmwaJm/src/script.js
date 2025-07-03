CircularCards();
    function CircularCards(){
        const time = gsap.timeline({
            scrollTrigger: {
                trigger: ".gallery_box",
                start: "top top",
                end: "bottom+=3000px center-=200px", 
                scrub: true, 
                pin: true,
                refreshPriority:1,
                preventOverlaps:true,
                pinSpacing:true,
                markers: true, 
                }
            });

            time.to('.gallery_box_outer',{
            duration: 10,
            rotateY: 360,
            ease: "none",
        });
    }