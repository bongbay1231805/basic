"use strict";
var div = document.getElementById("movableDiv");
function moveDiv(event) {
    var x = event.clientX;
    var y = event.clientY;
    div.style.left = x + "px";
    div.style.top = y + "px";
}
document.addEventListener("pointermove", moveDiv);