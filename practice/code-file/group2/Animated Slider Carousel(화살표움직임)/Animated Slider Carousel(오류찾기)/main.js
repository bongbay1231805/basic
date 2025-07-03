const team = [{
        name: "Ava Sinclair",
        role: "Creative Director"
    }, {
        name: "Liam Archer",
        role: "Brand Strategist"
    },
    {
        name: "Zoe Clementine",
        role: "Lead Designer"
    },
    {
        name: "Ethan Hawthorne",
        role: "Chief Innovation Officer"
    },
];

const cursor = document.querySelector('.cursor');
const cursorIcon = cursor.querySelector('i');
const cursorWidth = cursor.offsetWidth / 2;
const cursorHeight = cursor.offsetHeight / 2;



let currentslide = 1;
const totalslides = 4;



const updateCursorClass = (xPosition) => {
    const halfPageWidth = window.innerWidth / 2;
    if (xPosition > halfPageWidth) {
        if (currentslide < totalslides) {
            cursorIcon.classList.remove('ri-arrow-left-lin');
            cursorIcon.classList.add('ri-arrow-right-line');
            cursor.style.display = "";
        } else {
            cursor.style.display = 'none';
        }
    } else {

        if (currentslide > 1) {
            cursorIcon.classList.remove('ri-arrow-right-line');
            cursorIcon.classList.add('ri-arrow-left-line');
            cursor.style.display = "";
        } else {
            cursor.style.display = 'none';
        }
    }
}




document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - cursorWidth,
        y: e.clientY - cursorHeight,
        duration: 1,
        ease: "power3.out"
    });
    updateCursorClass(e.clientX);
});





const updateInfo = (slideNumber) => {
    const member = team[slideNumber - 1];

    document.querySelector('.info .name').textContent = member.name;
    document.querySelector('.info .role').textContent = member.role;
};



const animateSlide = (slideNumber, reveal) => {
    console.log(reveal)
    const marquee = document.querySelector(`.t-${slideNumber}.marquee-wrapper`);
    const img = document.getElementById(`t-${slideNumber}`);
    const clipPathValue = reveal ?   'polygon(0 100%, 100% 100%, 100% 0% ,0% 0%)':
        'polygon(0 100%, 100% 100%, 100% 100% ,0% 100%)';

        // 'polygon (0% 100%,100% 100% ,100% 0% ,0% 0%)' :
    gsap.to(marquee, {
        clipPath: clipPathValue,
        duration: 1,
        ease: "power4.out",
        delay: 0.3
    });
    gsap.to(img, {
        clipPath: clipPathValue,
        duration: 1,
        ease: "power4.out"
    });

};



updateInfo(currentslide);

const handleRightClick = () => {
    if (currentslide < totalslides) {
        animateSlide(currentslide + 1, true);
        currentslide++;
        updateInfo(currentslide);
    }

}



const handleLeftClick = () => {
    if (currentslide > 1) {
        animateSlide(currentslide, false);
        currentslide--;
        updateInfo(currentslide);
    }

}




document.addEventListener('click', (e) => {
    const halfPageWidth = window.innerWidth / 2;
    if (e.clientX> halfPageWidth) {
        handleRightClick();
    } else {
        handleLeftClick(); 
    }
})