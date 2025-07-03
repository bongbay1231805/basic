var startCount = 0,
    num = {var:startCount};

gsap.timeline({
  scrollTrigger: {
  trigger: "#number",
  pin: true,  
  start: "top top",
  end: "+=2000", 
  scrub: true,
	markers: true,
  }
}).to(num, {var: 1000, duration: 5, ease:"none", onUpdate:changeNumber})
  .to({}, {duration:2})

function changeNumber() {
  number.innerHTML = (num.var).toFixed();
}