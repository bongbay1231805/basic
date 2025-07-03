/*https://greensock.com/forums/topic/24859-locomotive-scroll-direction-with-scrolltrigger/ */
gsap.registerPlugin(ScrollTrigger);
/*GSAP 코어에 플러그인을 등록하면 두 가지가 원활하게 함께 작동하고 빌드 도구/번들러에서 트리 흔들림 문제도 방지됩니다. 다음과 같이 플러그인을 사용하기 전에 한 번만 등록하면 됩니다.*/

const pageContainer = document.querySelector(".container");

/* SMOOTH SCROLL */
//이것은 locomotive.js에 있음(github)
const scroller = new LocomotiveScroll({
  el: pageContainer,
  smooth: true
});
// Locomotive Scroll이 업데이트될 때마다 ScrollTrigger도 업데이트하도록 지시합니다(동기화 위치 지정).
scroller.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(pageContainer, {
  scrollTop(value) {
    return arguments.length
      ? scroller.scrollTo(value, 0, 0)
      : scroller.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      left: 0,
      top: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: pageContainer.style.transform ? "transform" : "fixed"
});

////////////////////////////////////
////////////////////////////////////
window.addEventListener("load", function () {
  let pinBoxes = document.querySelectorAll(".pin-wrap > *");
  let pinWrap = document.querySelector(".pin-wrap");
  let pinWrapWidth = pinWrap.offsetWidth;
  let horizontalScrollLength = pinWrapWidth - window.innerWidth;

  // Pinning and horizontal scrolling

  gsap.to(".pin-wrap", {
    scrollTrigger: {
      scroller: pageContainer, //locomotive-scroll
      scrub: true,//스크롤바와 동기화//false하면 스크롤바와 무관하게 애니메이션됨
      trigger: "#sectionPin",
      pin: true,//활성 상태에서 트리거 요소 고정
      // anticipatePin: 1,
      start: "top top",//트리거 상단이 뷰포트 상단에 닿을 때
      end: pinWrapWidth//시작을 넘어 pinWrap의 width만큼 스크롤한 후 종료
    },
    x: -horizontalScrollLength,
    ease: "none"
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

 ScrollTrigger.refresh();
});