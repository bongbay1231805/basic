gsap.registerPlugin(ScrollTrigger);

let $number1 = document.querySelector('#number1');
let $number2 = document.querySelector('#number2');
let $number3 = document.querySelector('#number3');

let startCount = { 
  var1: $number1.innerText,
  var2: $number2.innerText,
  var3: $number3.innerText
};

gsap.to(startCount, {
  var1: 256,
  var2: 3.141,
  var3: 2154.3285,
  duration: 3,
  ease:"none",
  onUpdate: changeNumber,
  scrollTrigger: {
    trigger: ".number_wrapper",
    toggleActions: "restart none reverse none",
    start: "top 80%",
    end: "+=150% 80%",
  },
})

function changeNumber() {
  $number1.innerHTML = (startCount.var1).toFixed(0);
  $number2.innerHTML = (startCount.var2).toFixed(2);
  $number3.innerHTML = (startCount.var3).toFixed(4);
}