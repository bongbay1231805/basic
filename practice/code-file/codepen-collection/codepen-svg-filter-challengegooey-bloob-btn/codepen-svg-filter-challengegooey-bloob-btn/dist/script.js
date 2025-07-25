console.clear();
let am = 30;

let btn = document.querySelector(".btn");
let btnEl = document.querySelector(".btn").getBoundingClientRect();
let xCenter = (btnEl.left + btnEl.right) / 2;
let yCenter = (btnEl.top + btnEl.bottom) / 2;

window.addEventListener(
    "resize",
    function (event) {
        btn = document.querySelector(".btn");
        btnEl = document.querySelector(".btn").getBoundingClientRect();
        xCenter = (btnEl.left + btnEl.right) / 2;
        yCenter = (btnEl.top + btnEl.bottom) / 2;
    },
    true
);

btn.addEventListener("mouseup", (e) => {
    let xx = xCenter;
    let yy = yCenter;

    for (let i = 0; i < am; i++) {
        createCircles(xx, yy, 25);
    }
});

btn.addEventListener("mousedown", () => {
    let particles = document.querySelectorAll("particle");

    if (particles.length > 0) {
        particles.forEach((part) => {
            part.remove();
        });
    }
});

function createCircles(x, y, tuSam) {
    let particle = document.createElement("particle");

    document.body.appendChild(particle);

    let size = Math.floor(Math.random() * 45);

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    let destinationX = x + (Math.random() - 0.5) * tuSam * 15;
    let destinationY = y + (Math.random() - 0.5) * tuSam * 15;

    let roate = (Math.random() + 1) * tuSam * 22;

    let animation = particle.animate(
        [
            {
                transform: `translate3d(${x + tuSam}px, ${y + tuSam}px, 0)`,
                opacity: 1
            },
            {
                transform: `translate3d(${destinationX - size}px, ${
                    destinationY - size
                }px, 0)  translateX(${tuSam}px)`,
                opacity: 1
            }
        ],
        {
            duration: 400 + Math.random() * 1500,
            easing: "ease-out",

            delay: Math.random() * 100
        }
    );

    animation.onfinish = () => {
        particle.remove();
    };
}