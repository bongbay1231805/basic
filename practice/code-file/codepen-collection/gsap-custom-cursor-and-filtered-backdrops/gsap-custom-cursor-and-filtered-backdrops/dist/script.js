const circleCursor = document.getElementById('circle-cursor');
const text = document.getElementById('text');
const revealBtn = document.querySelector('.reveal-btn');
const overlay = document.querySelector('.overlay');

document.addEventListener('mousemove', function(event) {
    let posX = event.clientX;
    let posY = event.clientY;
  
    const halfCursorWidth = circleCursor.offsetWidth / 2;
    const halfCursorHeight = circleCursor.offsetHeight / 2;
    
    gsap.to(circleCursor, {
      top: (posY - halfCursorWidth) + 'px',
      left: (posX - halfCursorHeight) + 'px',
      duration: 0.3
    });
});

document.addEventListener('mouseleave', function(event) {
  const posXCenter = (window.innerWidth / 2) - (circleCursor.offsetWidth / 2);
  const posYCenter =  (window.innerHeight / 2) - (circleCursor.offsetHeight / 2);
  gsap.to(circleCursor, {
      duration: 1,
      ease: "back",
      top: posYCenter,
      left: posXCenter
  });
});

//Since setting cursor to none messes with the hover of the cursor. This function checkes if the cursor position is over any item you pass it.
function isCursorOverElement(event, itemHovered) {
    const textRect = itemHovered.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    return (
        mouseX >= textRect.left &&
        mouseX <= textRect.right &&
        mouseY >= textRect.top &&
        mouseY <= textRect.bottom
    );
}

document.addEventListener('mousemove', (event) => {
    if (isCursorOverElement(event, text)) {
        circleCursor.classList.add('grow');
        
    }
		else if(isCursorOverElement(event, revealBtn)) {
				revealBtn.classList.add('magnet');
				circleCursor.style.transition = "opacity 0.1s ease-in";
				circleCursor.style.opacity = "0";
			if(document.addEventListener('click', function() {
				overlay.style.display = "flex";
			}));
		}
		else {
        circleCursor.classList.remove('grow');
				revealBtn.classList.remove('magnet');
				circleCursor.style.transition = "transform 0.4s ease";
				circleCursor.style.opacity = "1";
    }
});