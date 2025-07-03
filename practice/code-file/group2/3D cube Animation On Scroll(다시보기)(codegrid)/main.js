const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

//-------------------------------------
const cubeContainers = document.querySelectorAll(".cube-container");
const items = document.querySelectorAll(".item");
const projectNames = ['clark', 'bingo', 'vertex', 'linear'];

function updateCubes(scrollY) {
    const yRotation = (scrollY / 2) % 360;
    const scrollOffset = scrollY * 0.25;

    cubeContainers.forEach((container, containerIndex) => {
        const cubes = container.querySelectorAll('.cube');


        cubes.forEach((cube, cubeIndex) => {
            let rotationDirection = cubeIndex % 2 === 0 ? 1 : -1;

            console.log(yRotation, rotationDirection)
            cube.style.transform = `translateZ(100px) rotateX(${yRotation * rotationDirection}deg)`;
        })
        const frontBackTextPosition = 50 + scrollOffset;
        const topBottomTextPosition = 50 - scrollOffset;

        container.querySelectorAll('.front p, .back p').forEach((p) => {
            p.style.left = `${frontBackTextPosition}%`;

        })
        container.querySelectorAll(".top p, .bottom p").forEach((p) => {
            p.style.left = `${topBottomTextPosition}%`;
        })

    })
}


function populateText() {
    items.forEach((item, itemIndex) => {
        const projectName = projectNames[itemIndex % projectNames.length];
        const sides = item.querySelectorAll(".side");

        console.log(sides)
        const textContent = Array(50).fill(projectName).join("&nbsp;&nbsp;&nbsp;&nbsp;");

        sides.forEach((side) => {
            const paragraph = document.createElement("p");
            paragraph.innerHTML = textContent
            side.appendChild(paragraph);

        })

    })
}


window.onload = function () {
    populateText();
    updateCubes(window.scrollY)
}

let ticking = false;

document.addEventListener("scroll", function (e) {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            updateCubes(window.scrollY)
            ticking = false;
        })
        ticking = true;
    }
})