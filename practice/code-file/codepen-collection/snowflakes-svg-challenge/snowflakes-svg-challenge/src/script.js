const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];
const colorChangeInterval = 2000; // 2 seconds
const maxDarkness = 255;
const colorStep = 10;

class Snowflake {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = Math.random() * 1 + 0.5;
        this.colorStep = 0;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -this.size;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                this.x + this.size * Math.cos((18 + i * 72) * Math.PI / 180),
                this.y - this.size * Math.sin((18 + i * 72) * Math.PI / 180)
            );
            ctx.lineTo(
                this.x + this.size / 2 * Math.cos((54 + i * 72) * Math.PI / 180),
                this.y - this.size / 2 * Math.sin((54 + i * 72) * Math.PI / 180)
            );
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    darken() {
        if (this.colorStep < maxDarkness) {
            this.colorStep += colorStep;
            const darkness = Math.min(this.colorStep, maxDarkness);
            this.color = `rgb(${100 - darkness / 3}, ${149 - darkness / 3}, ${237 - darkness / 3})`;
        }
    }
}

function createSnowflakes() {
    const numberOfSnowflakes = 100;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        const size = Math.random() * 10 + 5;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = 'rgb(100, 149, 237)'; // Cornflower blue
        snowflakes.push(new Snowflake(x, y, size, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snowflakes.forEach(snowflake => {
        snowflake.update();
        snowflake.draw();
    });
    requestAnimationFrame(animate);
}

function darkenColors() {
    snowflakes.forEach(snowflake => snowflake.darken());
}

createSnowflakes();
animate();
setInterval(darkenColors, colorChangeInterval);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});