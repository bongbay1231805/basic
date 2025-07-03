gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// color  #00A87F
// color: rgb(153, 153, 153)

// 마우스 따라 움직이는 법
// SwsImg.style.transform = `translate(${newX}px, ${newY}px)`;
// Sws.style.transform = `translate(${newX}px, ${newY}px)`;

////////////////////////🎁mv search_icon🎁////////////////////////
$(function () {
  let Icon = $(".fa-search");
  Icon.click(function () {
    let currentColor = $(this).css("color");
    Icon.css("color", "rgb(153, 153, 153)");
    if (currentColor == "rgb(153, 153, 153)") {
      $(this).css("color", "#00A87F");
    }
  });
});

////////////////////////🎁mv clock🎁////////////////////////
function updateClock() {
  var now = new Date();
  var hours = String(now.getHours()).padStart(2, "0");
  var minutes = String(now.getMinutes()).padStart(2, "0");
  var seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("hoursTens").textContent = hours[0];
  document.getElementById("hoursOnes").textContent = hours[1];
  document.getElementById("minTens").textContent = minutes[0];
  document.getElementById("minOnes").textContent = minutes[1];
  document.getElementById("secTens").textContent = seconds[0];
  document.getElementById("secOnes").textContent = seconds[1];
}
setInterval(updateClock, 1000);

////////////////////////🎁mv-video🎁////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".mv",
      start: "top top",
      end: "90% top",
      scrub: 2,
      duration: 3,
      pinSpacing: false,
    },
  })
  .to(
    ".mv", {
      opacity: 0.3,
      duration: 100,
    },
    5
  )
  .to(
    ".mv .nav", {
      x: -30 + "%",
      y: 50 + "%",
      duration: 100,
    },
    5
  )
  .to(
    ".mv .logo img", {
      x: -67 + "%",
      y: 410 + "%",
      scale: 0.2,
      duration: 100,
    },
    5
  );

////////////////////////🎁section1 gsap🎁////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section1",
      start: "top 10%",
      end: "top 10%",
      scrub: 2,
      duration: 10,
      // markers: true,
      pinSpacing: false,
    },
  })
  .to(".mv video", {
    opacity: 0,
  })
  .to(".mv .nav", {
    opacity: 0,
  })
  .to(".mv .logo img", {
    opacity: 0,
  })
  .to(".header", {
    opacity: 1,
  }, 0.2)
  .to(".ticket", {
    y: -289 + "px",
    opacity: 1
  }, 1)
 

////////////////////////🎁section1 sws_clock🎁////////////////////////
setInterval(() => {
  let today = new Date();

  let options = {
    timeZone: "Europe/Zurich",
  };
  let timeString = today.toLocaleTimeString("en-GB", options);
  let [hh, mm, ss] = timeString.split(":");

  document.querySelector("#hours").innerHTML = hh;
  document.querySelector("#min").innerHTML = mm;
  document.querySelector("#sec").innerHTML = ss;
}, 1000);
////////////////////////🎁section1 tk_clock🎁////////////////////////
setInterval(() => {
  let today = new Date();

  let options = {
    timeZone: "Asia/Tokyo",
  };
  let timeString = today.toLocaleTimeString("en-GB", options);
  let [hh, mm, ss] = timeString.split(":");

  document.querySelector("#hours2").innerHTML = hh;
  document.querySelector("#min2").innerHTML = mm;
  document.querySelector("#sec2").innerHTML = ss;
}, 1000);
////////////////////////🎁section1 tk_clock🎁////////////////////////
setInterval(() => {
  let today = new Date();

  let options = {
    timeZone: "Pacific/Honolulu",
  };
  let timeString = today.toLocaleTimeString("en-GB", options);
  let [hh, mm, ss] = timeString.split(":");

  document.querySelector("#hours3").innerHTML = hh;
  document.querySelector("#min3").innerHTML = mm;
  document.querySelector("#sec3").innerHTML = ss;
}, 1000);
////////////////////////🎁section1 sws mostion🎁////////////////////////
let wrapper = document.querySelector(".section1");
let Sws = document.querySelector(".switzerland");
let SwsImg = document.querySelector(".sub_sws");

wrapper.addEventListener("mouseover", function (e) {
  let wrapperRect = wrapper.getBoundingClientRect();

  let relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
  let relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

  let SwsMaxDisplacement = 50;
  let SwsImgMaxDisplacement = 75;

  let SwsImgMaxDisplacementX =
    (relX / wrapperRect.width) * SwsImgMaxDisplacement;
  let SwsImgMaxDisplacementY =
    (relY / wrapperRect.height) * SwsImgMaxDisplacement;

  let SwsMaxDisplacementX = (relX / wrapperRect.width) * SwsMaxDisplacement;
  let SwsMaxDisplacementY = (relY / wrapperRect.height) * SwsMaxDisplacement;

  gsap.to(SwsImg, {
    x: SwsImgMaxDisplacementX,
    y: SwsImgMaxDisplacementY,
    duration: 0.3,
    ease: "power3.out",
  });
  gsap.to(Sws, {
    x: -SwsMaxDisplacementX,
    y: SwsMaxDisplacementY,
    duration: 0.3,
    ease: "power3.out",
  });
});
////////////////////////🎁section1 tk mostion🎁////////////////////////
let wrapper2 = document.querySelector(".section1");
let Tk = document.querySelector(".Tokyo");
let TkImg = document.querySelector(".sub_tk");

wrapper2.addEventListener("mouseover", function (e) {
  let wrapperRect = wrapper2.getBoundingClientRect();

  let relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
  let relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

  let SwsMaxDisplacement = 50;
  let SwsImgMaxDisplacement = 75;

  let SwsImgMaxDisplacementX =
    (relX / wrapperRect.width) * SwsImgMaxDisplacement;
  let SwsImgMaxDisplacementY =
    (relY / wrapperRect.height) * SwsImgMaxDisplacement;

  let SwsMaxDisplacementX = (relX / wrapperRect.width) * SwsMaxDisplacement;
  let SwsMaxDisplacementY = (relY / wrapperRect.height) * SwsMaxDisplacement;

  gsap.to(TkImg, {
    x: SwsImgMaxDisplacementX,
    y: SwsImgMaxDisplacementY,
    duration: 0.3,
    ease: "power3.out",
  });
  gsap.to(Tk, {
    x: -SwsMaxDisplacementX,
    y: SwsMaxDisplacementY,
    duration: 0.3,
    ease: "power3.out",
  });
});
////////////////////////🎁section1 hw mostion🎁////////////////////////
let wrapper3 = document.querySelector(".section1");
let Hw = document.querySelector(".Hawaiian");
let HwImg = document.querySelector(".sub_hw");

wrapper2.addEventListener("mouseover", function (e) {
  let wrapperRect = wrapper3.getBoundingClientRect();

  let relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
  let relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);

  let SwsMaxDisplacement = 50;
  let SwsImgMaxDisplacement = 75;

  let SwsImgMaxDisplacementX =
    (relX / wrapperRect.width) * SwsImgMaxDisplacement;
  let SwsImgMaxDisplacementY =
    (relY / wrapperRect.height) * SwsImgMaxDisplacement;

  let SwsMaxDisplacementX = (relX / wrapperRect.width) * SwsMaxDisplacement;
  let SwsMaxDisplacementY = (relY / wrapperRect.height) * SwsMaxDisplacement;

  gsap.to(HwImg, {
    x: SwsImgMaxDisplacementX,
    y: SwsImgMaxDisplacementY,
    duration: 0.3,
    ease: "power3.out",
  });
  gsap.to(Hw, {
    x: -SwsMaxDisplacementX,
    y: SwsMaxDisplacementY,
    duration: 0.3,
    ease: "power3.out",
  });
});
////////////////////////🎁section1 slick🎁////////////////////////
$('.section1Wrap').slick({
  dots: true,
  infinite: true,
  fade: true,
  cssEase: 'linear',
  autoplay: true,
  autoplaySpeed: 2000,
});
// ////////////////////////🎁section2 gsap🎁////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".section2",
      start: "top 80%",
      end: "top 10%",
      scrub: 2,
      duration: 10,
      markers: true,
      pinSpacing: false,
    },
  })

.to("#plane",{x:2000,y:100,scale:5,duration:2})