// For YouTube Video
// https://youtu.be/rMX-rDN1BxU

import Boid from "https://esm.sh/boid";

const MAX_CURSORS = 40;
const MAX_SPEED = 15;
const MAX_FORCE = 0.4;
const MASS = 0.1;
const IS_WINDOWS = false;

let target;
let flockers = [];

document.addEventListener("mousemove", (e) => {
  const mouse = document.querySelector(".mouse");
  mouse.style.left = e.clientX + "px";
  mouse.style.top = e.clientY + "px";

  if (IS_WINDOWS) {
    document.body.classList.add("win");
  }
  
  // set the new target for the swarm (mouse x,y)
  target = new Boid.Vec2(e.clientX, e.clientY);
});

// Add Container for the swarm
const container = document.createElement("div");
container.className = "boidContainer";
document.body.append(container);

/**
 Initialize the swarm effect, and add the cursors to their container.
*/
while (flockers.length < MAX_CURSORS) {
  const flocker = new Boid();
  flocker.setBounds(document.body.scrollWidth, document.body.scrollHeight);
  flocker.position.x = window.innerWidth * Math.random();
  flocker.position.y = window.innerHeight * Math.random();
  flocker.maxSpeed = MAX_SPEED;
  flocker.maxForce = MAX_FORCE;
  flocker.mass = MASS;
  flocker.edgeBehavior = Boid.EDGE_BOUNCE;

  const cursor = document.createElement("div");
  cursor.className = "cursor";
  container.append(cursor);

  flockers.push(flocker);
}

/**
  The swarm effect.  The cursors seek to be close to the mouse's postion.
*/
function update() {
  window.requestAnimationFrame(update);

  if (!target) {
    return;
  }

  flockers.forEach(function (boid, index) {
    boid.flock(flockers);
    boid.seek(target);
    boid.update();

    // update cursor's CSS
    var point = boid.position;
    const cursor = Array.from(container.children)[index];
    cursor.style.top = point.y + "px";
    cursor.style.left = point.x + "px";
  });
  
}

// Start Everything
update();