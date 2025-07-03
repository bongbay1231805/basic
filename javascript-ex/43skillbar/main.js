gsap.registerPlugin(ScrollTrigger);


// 한번만 실행하게 수정할것 
let executed = false;

function animateSkills() {
  document.querySelectorAll('.skill-per').forEach((perElement) => {
    gsap.to(perElement, {
      duration: 2,
      width:perElement.getAttribute("per") + "%",
      onUpdate:function(){
        // Math.ceil() : 올림(5보다 작더라도 무조건 올림)
        //parseInt(36.333) ==> 정수
        perElement.setAttribute("per",Math.ceil(this.progress()*parseInt(perElement.style.width))+"%")
        //this 사용시에는 화살표 함수 말고 function(){}원래 형태로 제작한다.
      }
    })
  })
}

ScrollTrigger.create({
  trigger: ".main",
  start: "top 30%",
  onEnter: () => {
    if (!executed) {
      animateSkills();
      executed = true
    }
  }

})