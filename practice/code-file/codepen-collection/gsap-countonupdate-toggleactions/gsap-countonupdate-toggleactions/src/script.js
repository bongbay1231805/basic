gsap.registerPlugin(ScrollTrigger);

var startCount = {var: 0};

gsap.to(startCount, {
  var: 1000, duration: 3, ease:"none",
  onUpdate: changeNumber,
  scrollTrigger: {
    trigger: "#number",
    toggleActions: "restart none reverse none",
  },
})

function changeNumber() {
  number.innerHTML = (startCount.var).toFixed();
}
