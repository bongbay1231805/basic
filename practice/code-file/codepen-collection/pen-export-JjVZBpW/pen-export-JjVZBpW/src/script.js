var morph = gsap.to("#circle", { duration: 1, morphSVG:"#hippo", repeat:1, yoyo:true, repeatDelay:0.2})

document.getElementById("play").onclick = function(){
  morph.restart(true);
}