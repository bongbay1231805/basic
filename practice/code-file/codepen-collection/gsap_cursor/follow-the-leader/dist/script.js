TweenLite.defaultEase = Linear.easeNone;

var svgns = "http://www.w3.org/2000/svg";
var root = document.querySelector("svg");
var ease = 0.5;

var pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2 };


window.addEventListener("mousemove", function (event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
});

var leader = pointer;

var i = 50;
while (i--) {
  leader = createCircle(leader);
}

function createCircle(leader) {

  var circle = document.createElementNS(svgns, "circle");
  root.appendChild(circle);

  TweenLite.set(circle, { x: -15, y: -15, attr: { r: 10 } });

  var pos = circle._gsTransform;

  TweenMax.to(circle, 1000, {
    x: "+=1",
    y: "+=1",
    repeat: -1,
    modifiers: {
      x: function () {
        return pos.x + (leader.x - pos.x) * ease;
      },
      y: function () {
        return pos.y + (leader.y - pos.y) * ease;
      } } });



  return pos;
}