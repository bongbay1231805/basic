let animationDiv1 = document.getElementById('scrollingArea1')
animationDiv1.style.display = "none";

let animationDiv2 = document.getElementById('scrollingArea2')
animationDiv2.style.display = "none";

let animationDiv3 = document.getElementById('scrollingArea3')
animationDiv3.style.display = "none";

function loader(div, pathLocation) {
   let animation = bodymovin.loadAnimation({
       container: div,
       renderer: "svg",
       loop: true,  //false
       autoplay: true,
       path: pathLocation
   });
   animation.play();
}

window.addEventListener('scroll', () => {
   // can set scroll height by changing the number
   let scrollHeightPercent = document.documentElement.scrollHeight * 0.3
   console.log(scrollHeightPercent);

   let currentPOS = document.documentElement.scrollTop || document.body.scrollTop
      console.log(currentPOS)
       // once the scroll height has gone past the % stated abvoe it will make the style appear
   if (currentPOS >= scrollHeightPercent) {
       let animationDiv1 = document.getElementById('scrollingArea1');
       if (animationDiv1.style.display == 'none') {
           // stuff here
           animationDiv1.style.display= ""
         
           let bodyMotion1 = document.getElementById('lottie-scroll-1');
           loader(bodyMotion1, "https://assets1.lottiefiles.com/packages/lf20_UDstUT.json")
         
       };
   }
  if ((currentPOS - 1000) >= scrollHeightPercent) {
       let animationDiv2 = document.getElementById('scrollingArea2');
       if (animationDiv2.style.display == 'none') {
           // stuff here
           animationDiv2.style.display= ""
         
           let bodyMotion2 = document.getElementById('lottie-scroll-2');
           loader(bodyMotion2, "https://assets5.lottiefiles.com/packages/lf20_jNEOSb.json")
        
       };
   };
  
  if ((currentPOS - 1050) >= scrollHeightPercent) {
       let animationDiv3 = document.getElementById('scrollingArea3');
       if (animationDiv3.style.display == 'none') {
           // stuff here
           animationDiv3.style.display= ""
         
           let bodyMotion3 = document.getElementById('lottie-scroll-3');
           loader(bodyMotion3, "https://assets9.lottiefiles.com/datafiles/a8FZYDvMUxbdDry/data.json")
        
       };
   };
});