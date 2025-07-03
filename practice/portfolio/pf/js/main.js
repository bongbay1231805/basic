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

//sec1 _ imgani ////////////////////////////////////////
// console.clear();

const additionalY = {
  val: 0,
};
let additionalYAnim;
let offset = 0;
const cols = gsap.utils.toArray(".col");

cols.forEach((col, i) => {
  const images = col.childNodes;

  // DUPLICATE IMAGES FOR LOOP
  images.forEach((image) => {
    var clone = image.cloneNode(true);
    col.appendChild(clone);
  });

  // SET ANIMATION
  images.forEach((item) => {
    let columnHeight = item.parentElement.clientHeight;
    let direction = i % 2 !== 0 ? "+=" : "-="; // Change direction for odd columns

    gsap.to(item, {
      y: direction + Number(columnHeight / 2),
      duration: 20,
      repeat: -1,
      ease: "none",
      modifiers: {
        y: gsap.utils.unitize((y) => {
          if (direction == "+=") {
            offset += additionalY.val;
            y = (parseFloat(y) - offset) % (columnHeight * 0.5);
          } else {
            offset += additionalY.val;
            y = (parseFloat(y) + offset) % -Number(columnHeight * 0.5);
          }

          return y;
        }),
      },
    });
  });
});

const imagesScrollerTrigger = ScrollTrigger.create({
  trigger: "#section1",
  start: "top 50%",
  end: "bottom 50%",
  onUpdate: function (self) {
    const velocity = self.getVelocity();
    if (velocity > 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 5000;
      additionalYAnim = gsap.to(additionalY, {
        val: 0,
      });
    }
    if (velocity < 0) {
      if (additionalYAnim) additionalYAnim.kill();
      additionalY.val = -velocity / 6000;
      additionalYAnim = gsap.to(additionalY, {
        val: 0,
      });
    }
  },
});
ScrollTrigger.sort();
ScrollTrigger.refresh();
//clock/////////////////////////////////////////////////////////

let points = document.querySelector(".points");
j = 12;
for (var i = 0; i < 360; i += 6) {
  let point = document.createElement("span");
  point.className = "point";
  if ((i / 6) % 5 == 0) {
    point.className = "point big";
    let text = document.createElement("span");
    text.className = "text";
    text.innerHTML = j;
    text.style.transform = `rotate(${-i}deg) translateY(2px)`;
    if (j == 12) {
      j = 0;
    }
    j = j + 1;
    point.appendChild(text);
  }
  point.style.transform = `rotate(${i}deg) translateY(-100px)`;
  points.appendChild(point);
}

const interval = setInterval(() => {
  var date = new Date();
  let secondsPoint = document.querySelector(".seconds");
  let minutesPoint = document.querySelector(".minutes");
  let hoursPoint = document.querySelector(".hours");

  let secPosition = date.getSeconds() * 6;
  let minPosition = date.getMinutes() * 6;
  let hourPosition = date.getHours() * 30;

  if (secPosition == 0) {
    secondsPoint.style.transition = "none";
  } else {
    secondsPoint.style.transition = "0.25s";
  }
  if (minPosition == 0) {
    minutesPoint.style.transition = "none";
  } else {
    minutesPoint.style.transition = "0.25s";
  }
  if (hourPosition == 0) {
    hoursPoint.style.transition = "none";
  } else {
    hoursPoint.style.transition = "0.25s";
  }

  secondsPoint.style.transform = `rotate(${secPosition - 180}deg)`;
  minutesPoint.style.transform = `rotate(${minPosition - 180}deg)`;
  hoursPoint.style.transform = `rotate(${hourPosition - 180}deg)`;
});


//weather////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "8582ffda1c1390cabd3fd5d75d5e5847"; // 여기에 OpenWeatherMap API 키를 입력하세요.
  const weatherContainer = document.querySelector(".weather-container");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // const lat = position.coords.latitude;
      // const lon = position.coords.longitude;
      const lat = 37.5665;
      const lon = 126.978;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`
      )
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("location").textContent = `${data.name}`;
          document.getElementById(
            "temperature"
          ).textContent = `${data.main.temp} °C`;
          // document.getElementById("description").textContent = `날씨: ${data.weather[0].description}`;
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          document.getElementById("icon").src = iconUrl;
          document.getElementById("icon").alt = data.weather[0].description;

          const timezoneOffset = 9 * 60; // 서울 시간대는 UTC+9
          const localTime = new Date(
            (data.dt + data.timezone + timezoneOffset * 60) * 1000
          );
          const options = {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "long",
            day: "numeric",
            // hour: '2-digit',
            // minute: '2-digit',
            // second: '2-digit'
          };
          const formatter = new Intl.DateTimeFormat("ko-KR", options);
          document.getElementById("time").textContent = `${formatter.format(
            localTime
          )}`;
        })
        .catch((error) => {
          weatherContainer.innerHTML = `<p>날씨 정보를 불러오는 데 실패했습니다.</p>`;
          console.error("Error fetching weather data: ", error);
        });
    });
  } else {
    weatherContainer.innerHTML = `<p>위치 정보를 사용할 수 없습니다.</p>`;
  }
});
//section1 & section2////////////////////////////////////////////////////////
// 첫번째 영역
let sticky = document.querySelector('.sticky')
gsap.to(sticky, {
  scrollTrigger: {
    trigger: sticky,
    start: "top top",
    end: "+=150%",
    scrub: 1,
  },
  y: 300,
  scale: 0.75,
  // rotation: -15,
  ease: "power3.out"
})

// 두번째 영역
let conScale = document.querySelector('.con-scale')

gsap.fromTo(conScale, {
  y: 100,
  scale: 0.7,
  // rotation: 15
}, {
  scrollTrigger: {
    trigger: conScale,
    start: "top 80%",
    end: "top 20%",
    scrub: 2,
  },
  y: 0,
  scale: 1,
  duration: 1,
  // rotation: 0,
  ease: "power3.out"
})
//두번째 영역의 각각의 이미지 애니
let secImgs = document.querySelectorAll("#section2 .section-images")


secImgs.forEach(function (secImg) {
  let imgs = secImg.querySelectorAll("#section2 img")
  let secImgParent=secImg.parentNode //secImg의 부모태그 부르기

  imgs.forEach(function (img, index) {
    let imgDey = index * 0.8
    gsap.set(img, {
      y: 400
    })
    gsap.timeline({
        scrollTrigger: {
          trigger: secImgParent,
          start: "top 55%",
          end: "top top",
          scrub: 2,
        }
      })
      .to(img, {
        y: 0,
        duration: 2,
        delay: imgDey,
        ease: "power3.out"
      })
  })
})
//section2-2//////////////////////////////////////////////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section2-2",
      start: "top top",
      end: "+=1500",
      scrub: 2,
      duration: 2,
      pin: true,
    },
  })
  .to("#section2-2 span:nth-child(1)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",},"-=2")
  .to("#section2-2 span:nth-child(2)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})
  .to("#section2-2 span:nth-child(3)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})
  .to("#section2-2 span:nth-child(4)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})
  .to("#section2-2 span:nth-child(5)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})
  .to("#section2-2 span:nth-child(6)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})
  .to("#section2-2 span:nth-child(7)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})
  .to("#section2-2 span:nth-child(8)", { transform: "rotateX(0deg)",opacity:1, duration: 2.5,ease: "power1.out",})

  .to("#section2-2 .sec2_txt",{scale:0.8,duration:2.5})
//section2-3//////////////////////////////////////////////////////////////////

// slide
let list=document.querySelectorAll(".work ul li")
console.log(list)
let imgBoxs=document.querySelectorAll(".imgBox")
console.log(imgBoxs)
let txtBoxs=document.querySelectorAll(".textBox")

//가로 스크롤 
let scrollTween=gsap.to(list,{
    xPercent:-100*(list.length - 1),
    ease:"none",
    scrollTrigger:{
        trigger:".work",
        start:"center center",
        scrub:1,
        end:"+=300%",
        pin:true
    }
})

//배열안에 요소를 하나씩 가져와서 어떤 일을 시킨다
imgBoxs.forEach(function(imgBox){//item은 배열안에 각각요소를 순서대로 받는다

    
    gsap.timeline({
        scrollTrigger:{
            trigger:imgBox,
            start:"center right",
            end:'center center',
            containerAnimation:scrollTween,
            scrub:true,
            // markers:true
        }
    })
    .to(imgBox,{'clip-path':'inset(0%)',ease:"none",duration:1},0)
    
    
    
    
    //왼쪽으로 사라질때 이미지를 작게 
    gsap.timeline({
        scrollTrigger:{
            trigger:imgBox,
            start:"center center",
            end:'center left',
            containerAnimation:scrollTween,
            scrub:true,
            // markers:true
        }
    })
    .to(imgBox,{'clip-path':'inset(30%)',ease:"none",duration:1},0)
})

txtBoxs.forEach(function(txtBox){
    gsap.timeline({
        scrollTrigger:{
            trigger:txtBox,
            start:"center 70%",
            end:'center 40%',
            containerAnimation:scrollTween,
            scrub:true,
            // markers:true
        }
    })
    .to(txtBox,{opacity:1,x:-100},0)
    
    gsap.timeline({
        scrollTrigger:{
            trigger:txtBox,
            start:"center 30%",
            end:'center 20%',
            containerAnimation:scrollTween,
            scrub:true,
            // markers:true
        }
    })
    .to(txtBox,{opacity:0},0)
})
//section2 About me//////////////////////////////////////////////////////////////////
const getHeight = el => {
  const computedStyle = getComputedStyle(el);
  let elementHeight = el.clientHeight; // height with padding
  elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
  return elementHeight;
}

class RepeatTextScrollFx {
  DOM = {
    el: null,
    words: null,
  }
  totalWords = 9;
  tyIncrement = 12;
  delayIncrement = 0.1;
  scrollTimeline;
  observer;
  isLoaded = false; // Track loading state

  constructor(Dom_el) {
    this.DOM.el = Dom_el;
    this.layout();
    this.setBoundaries();
    this.createScrollTimeline();
    this.createObserver();

    window.addEventListener('resize', () => this.setBoundaries());
  }

  layout() {
    const halfWordsCount = Math.floor(this.totalWords / 2);
    let innerHTML = '';

    for (let i = 0; i < this.totalWords; ++i) {
      let ty;
      let delay;

      if (i === this.totalWords - 1) {
        ty = 0;
        delay = 0;
      } else if (i < halfWordsCount) {
        ty = halfWordsCount * this.tyIncrement - this.tyIncrement * i;
        delay = this.delayIncrement * (halfWordsCount - i) - this.delayIncrement;
      } else {
        ty = -1 * (halfWordsCount * this.tyIncrement - (i - halfWordsCount) * this.tyIncrement);
        delay = this.delayIncrement * (halfWordsCount - (i - halfWordsCount)) - this.delayIncrement;
      }

      innerHTML += `<span data-delay="${delay}" data-ty="${ty}">${this.DOM.el.innerHTML}</span>`;
    }

    this.DOM.el.innerHTML = innerHTML;
    this.DOM.el.classList.add('text-rep');
    this.DOM.words = [...this.DOM.el.querySelectorAll('span')].slice(0, -1);
  }

  setBoundaries() {
    const paddingBottomMarginTop = getHeight(this.DOM.el) * Math.floor(this.totalWords / 2) * this.tyIncrement / 100;
    gsap.set(this.DOM.el, {
      marginTop: paddingBottomMarginTop,
      paddingBottom: paddingBottomMarginTop
    });
  }

  createScrollTimeline() {
    this.scrollTimeline = gsap.timeline({ paused: true });
    gsap.to(this.DOM.words, {
      duration: 1,
      ease: 'power1',
      yPercent: (_, target) => target.dataset.ty,
      delay: (_, target) => target.dataset.delay,
    });
  }

  createObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!this.isLoaded) {
            this.isLoaded = true;
            gsap.ticker.add(this.progressTween);
          }
        } else {
          if (this.isLoaded) {
            gsap.ticker.remove(this.progressTween);
          }
        }
      });
    }, observerOptions);

    this.progressTween = () => {
      const scrollPosition = (window.scrollY + window.innerHeight);
      const elPosition = (scrollPosition - this.DOM.el.offsetTop);
      const durationDistance = (window.innerHeight + this.DOM.el.offsetHeight);
      const currentProgress = (elPosition / durationDistance);
      this.scrollTimeline.progress(currentProgress);
    };

    this.observer.observe(this.DOM.el);
  }
}


const section2 = document.querySelector('#section2');
let hasExecuted = false;

// Scroll 이벤트 리스너 추가
window.addEventListener('scroll', () => {
  const rect = section2.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (isVisible && !hasExecuted) {
    hasExecuted = true; // 실행 상태 변경

    // Section 2가 보일 때 실행할 코드
    console.log('Section 2 is visible');

    // RepeatTextScrollFx를 초기화
    const textElements = section2.querySelectorAll('[data-text-rep]');
    textElements.forEach(textEl => {
      new RepeatTextScrollFx(textEl);
    });
  }
});



//section3//////////////////////////////////////////////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section3",
      start: "top top",
      end: "+=1500",
      scrub: 2,
      duration: 2,
      pin: true,
    },
  })
  .to("#section3",{ background: "#000", duration: 2.5 }, "-=3")
  .to("#section3 h3",{ color: "#fff", duration: 2.5 }, "-=3")

const getGrid = (selector) => {
  let elements = gsap.utils.toArray(selector),
    bounds,
    getSubset = (axis, dimension, alternating, merge) => {
      let a = [],
        subsets = {},
        onlyEven = alternating === "even",
        p;
      bounds.forEach((b, i) => {
        let position = Math.round(b[axis] + b[dimension] / 2),
          subset = subsets[position];
        subset || (subsets[position] = subset = []);
        subset.push(elements[i]);
      });
      for (p in subsets) {
        a.push(subsets[p]);
      }
      if (onlyEven || alternating === "odd") {
        a = a.filter((el, i) => !(i % 2) === onlyEven);
      }
      if (merge) {
        let a2 = [];
        a.forEach((subset) => a2.push(...subset));
        return a2;
      }
      return a;
    };
  elements.refresh = () =>
    (bounds = elements.map((el) => el.getBoundingClientRect()));
  elements.columns = (alternating, merge) =>
    getSubset("left", "width", alternating, merge);
  elements.rows = (alternating, merge) =>
    getSubset("top", "height", alternating, merge);
  elements.refresh();

  return elements;
};



// Get the element with the class 'uzih3'
const element = document.querySelector('.uzih3');

// Check if the element is found ..
if (element) {
  // Remove existing innerHTML
  element.innerHTML = '';

  // Add new innerHTML using the class 'uzi3'
  element.classList.add('uzi3');
  element.innerHTML = `Hobby
<span>저의 취미는 새로운 도전을 통해 세상을 넓히는 것으로<br>
주짓수, 수영, 마라톤 대회 참가, 서핑, 스노우보드 등 다양한 활동을 경험해 왔습니다.<br><br>

이를 통해 활발하고 움직이는 삶을 사랑하는 성향을 깨달았고,<br>
이제는 하나의 운동을 선택해 꾸준히 즐기며 일상 속에서도 활기를 불어넣고 있습니다.</span>`
}


// All elements with class .grid
const grids = document.querySelectorAll(".grid");

// Function to apply scroll-triggered animations to a given gallery
const applyAnimation = (grid, animationType) => {
  // Child elements of grid
  const gridWrap = grid.querySelector("#section3 .grid-wrap");
  const gridItems = grid.querySelectorAll("#section3 .grid__item");
  const gridItemsInner = [...gridItems].map((item) =>
    item.querySelector("#section3 .grid__item-inner")
  );

  // Define GSAP timeline with ScrollTrigger
  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: gridWrap,
      start: "top bottom+=5%",
      end: "bottom top-=5%",
      scrub: true,
    }
  });

  // Apply different animations based on type
  switch (animationType) {
    case "type3":
      // Set some CSS related style values
      grid.style.setProperty("--grid-width", "105%");
      grid.style.setProperty("--grid-columns", "8");
      grid.style.setProperty("--perspective", "1500px");
      grid.style.setProperty("--grid-inner-scale", "0.5");

      timeline
        .set(gridItems, {
          transformOrigin: "50% 0%",
          z: () => gsap.utils.random(-5000, -2000),
          rotationX: () => gsap.utils.random(-65, -25),
          filter: "brightness(0%)"
        })
        .to(
          gridItems,
          {
            xPercent: () => gsap.utils.random(-150, 150),
            yPercent: () => gsap.utils.random(-300, 300),
            rotationX: 0,
            filter: "brightness(200%)"
          },
          0
        )
        .to(
          gridWrap,
          {
            z: 6500
          },
          0
        )
        .fromTo(
          gridItemsInner,
          {
            scale: 2
          },
          {
            scale: 0.5
          },
          0
        );

      break;
    default:
      console.error("Unknown animation type.");
      break;
  }
};

// Apply animations to each grid---

// you can tweek to use the switch case you want😂😂

const scroll = () => {
  grids.forEach((grid, i) => {
    // Determine animation type
    let animationType;
    switch (i % 2) {
      case 0:
        animationType = "type3";
        break;
    }
    applyAnimation(grid, animationType);
  });
};


scroll();
document.body.classList.remove("loading");
//section4 tit//////////////////////////////////////////////////////////////////
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#section4",
      start: "top top",
      end: "+=6500",
      scrub: 2,
      duration: 2.5,
      pin: true,
    },
  })
  .set(".sec4_con_txt",{transform:"translate(-50%,-50%)"})
  .set(".sec4_con_img",{transform:"translate(-50%,-50%)"})
  .to(".sec4_tit_bg",{scale:2.5,display:"none",duration:2.5})
  .to(".sec4_tit h3",{scale:20,opacity:0,display:"none", duration:2.5},"-=2.5")

  .to(".sec4_con_1 .sec4_con_txt",{opacity:1,duration:2.5},"-=2")
  .to(".sec4_con_1 .sec4_con_img",{opacity:1,scale:4,duration:2.5},"-=1")
  .to(".sec4_con_1 .sec4_con_img",{opacity:0})
  .to(".sec4_con_1 .sec4_con_txt",{opacity:0,duration:2.5},"-=1")

  .to(".sec4_con_2 .sec4_con_txt",{opacity:1,duration:2.5},"-=2")
  .to(".sec4_con_2 .sec4_con_img",{opacity:1,scale:4,duration:2.5},"-=1")
  .to(".sec4_con_2 .sec4_con_img",{opacity:0})
  .to(".sec4_con_2 .sec4_con_txt",{opacity:0,duration:2.5},"-=1")

  .to(".sec4_con_3 .sec4_con_txt",{opacity:1,duration:2.5},"-=2")
  .to(".sec4_con_3 .sec4_con_img",{opacity:1,scale:4,duration:2.5},"-=1")
  .to(".sec4_con_3 .sec4_con_img",{opacity:0})
  .to(".sec4_con_3 .sec4_con_txt",{opacity:0,duration:2.5},"-=1")

  .to(".sec4_con_4 .sec4_con_txt",{opacity:1,duration:2.5},"-=2")
  .to(".sec4_con_4 .sec4_con_img",{opacity:1,scale:4,duration:2.5},"-=1")
  .to(".sec4_con_4 .sec4_con_img",{opacity:0})
  .to(".sec4_con_4 .sec4_con_txt",{opacity:0,duration:2.5},"-=1")
  
  .to("#section4 .sec5_tit",{bottom:"0vh",duration:2.5},"-=1")
  .from(".row-2", {height: "0%",duration: 2.5,})
  .from(".row li", {y: 200,opacity: 0,ease: "none",duration: 2});
//section5 skill//////////////////////////////////////////////////////////////////
const animation1 = gsap.to(".slide_cir1", {
  backgroundSize:'120%',
  duration: 2,
  ease: "power2.out"
});


const animation2 = gsap.to(".slide_cir2", {
  backgroundSize:'120%',
  duration: 2,
  ease: "power2.out"
});


const animation3 = gsap.to(".slide_model", {
  backgroundSize:'50%',
  top:'18vh',
  filter:`grayscale(0)`,
  duration: 2.5,
  ease: "power2.out"
});

const timeline = gsap.timeline();
timeline.add(animation1)
       .add(animation2, "-=2")
       .add(animation3, "-=2") 

ScrollTrigger.create({
  trigger: "#section5",
  start: "top 50%",
  end: "bottom top",
  animation: timeline,
  once: true
});
//section5 bg color//////////////////////////////////////////////////////////////////
gsap
.timeline({
  scrollTrigger: {
    trigger: "#section5",
    start: "top top",
    end: "+=500",
    scrub: 2,
    duration: 2.5,
    pin: true,
  },
})
.to("#section5",{background:"#333", duration:1})


//section5 progress//////////////////////////////////////////////////////////////////
let MAX = 100
let circleProgressInstances = []
document.querySelectorAll(".progress2").forEach((progressEle, index) => {
    let initialValue = document.querySelectorAll(".value-input")[index].value
    let cp = new CircleProgress(progressEle, {
        max: MAX,
        value: 0,
        animationDuration:1500,
        // textFormat: (val)=>val+"%",
        textFormat: (val)=>val,
    });

    circleProgressInstances.push(cp)

    ScrollTrigger.create({
        trigger:"#section5",
        start:"top 20%",
        // markers: true,
        scrub:1,
        onEnter:()=>{
            cp.value=initialValue;
        },
        onLeaveBack:()=>{
            cp.value=0;
        }
    })
})


// 기존에 생성된 CircleProgress 인스턴스들을 저장할 배열
let circleProgressInstances2 = [];

// 스킬바 초기화 및 ScrollTrigger 설정 함수
function setupSkills() {
  document.querySelectorAll(".progress3").forEach((progressEle, index) => {
    let initialValue = document.querySelectorAll(".value-input")[index].value;
    let cp = new CircleProgress(progressEle, {
      max: MAX, // 적절한 최대 값 설정
      value: 0, // 초기 값은 0으로 설정
      animationDuration: 1500,
      textFormat: (val) => val, // 텍스트 포맷 설정 (옵션)
    });

    // CircleProgress 인스턴스를 배열에 추가
    circleProgressInstances2.push(cp);

    // ScrollTrigger 생성
    ScrollTrigger.create({
      trigger: ".sec7_skill",
      start: "top 70%",
      scrub: 1,
      onEnter: () => {
        // 스크롤이 화면에 진입했을 때 초기 값으로 설정
        cp.value = initialValue;
      },
      onLeaveBack: () => {
        // 스크롤이 화면을 벗어날 때 다시 초기화
        cp.value = 0;
      },
    });
  });
}

// 모든 [data-to-view] 속성을 가진 요소들에 클릭 이벤트 리스너 추가
document.querySelectorAll('[data-to-view]').forEach((element) => {
  element.addEventListener('click', () => {
    // 기존에 생성된 CircleProgress 인스턴스들을 초기화
    circleProgressInstances2.forEach(cp => {
      cp.value = 0; // 값 초기화
    });
    circleProgressInstances2 = []; // 배열 비우기

    // 새로운 스킬바 설정 함수 호출
    setupSkills();
  });
});

// 페이지 로드 시 스킬바 설정 함수 호출
window.addEventListener('load', setupSkills);


//section6//////////////////////////////////////////////////////////////////

gsap
.timeline({
  scrollTrigger: {
    trigger: "#section6",
    start: "top top",
    end: "+=2500",
    scrub: 2,
    duration: 2.5,
    pin: true,
  },
})
.to("#section6",{background:"#333", duration:1})
.to(".header .letters",{color:"#fff", duration:1.5},"-=0.5")
.to(".header .letters:first-child", {x:() => -innerWidth *3,scale:10,ease: "power2.inOut",duration:2.5})
.to(".header .letters:last-child", {x:() => innerWidth *3,scale:10,ease: "power2.inOut",duration:2.5},"-=2.5")
.to(".img-holder", {rotation:0,clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",duration:2.5},"-=2.8")
.to(".img-holder img", {scale:1,duration:5,ease: "power2.inOut"})
.to(".img-holder img", {scale:0.9,duration:5,ease: "power2.in"})
//section7 vdo//////////////////////////////////////////////////////////////////
const videos = document.querySelectorAll('#section7 video'); // 모든 video 요소 선택

videos.forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });

    video.addEventListener('mouseout', () => {
        video.pause();
    });
});
//section7 btn//////////////////////////////////////////////////////////////////
var nav = {
  
  init: function(){
    this._bindEvents();
    this._openInitView();
  },
  
  _openInitView: function(){
    //open intial view
    var el = document.querySelector('[data-view-initial]');
    el.classList.add('view--block');
    el.classList.add('view--visible');
  },
  
  _bindEvents: function(){
    var self = this,
        triggers = document.querySelectorAll('[data-to-view]');
    
    //add click event listeners
    //to all view triggers
    [].forEach.call(triggers, function(el){
      el.addEventListener('click', function(){
        var selector = this.getAttribute('data-to-view');
        self._toView(selector);
      }, false);
    });
  },
  
  _toView: function(elSelector){
    var newViewEl = document.querySelector(elSelector),
        currOpenViewEl = document.querySelector('.view--visible'),
        self = this;
    
    //check if new view is the
    //view that is currently open
    if(newViewEl === currOpenViewEl) return;
    
    //close currently open view
    this._closeView(currOpenViewEl, function(done){
      //open new view
      //pass close view done method as callback
      self._openView(newViewEl, done);
    });
  },
  
  _closeView: function(el, callback){
    //move the view to the "up" position
    el.classList.add('view--up');
    el.classList.remove('view--visible');
    
    //trigger the callback x sec into the animation
    setTimeout(function(){
      callback(function(){
        el.classList.remove('view--block');
        el.classList.remove('view--up');
      });
    }, 100);
  },
  
  _openView: function(el, callback){
    //display block the view so its loaded
    //and move the view to the "down" position
    el.classList.add('view--block');
    el.classList.add('view--down');
    
    setTimeout(function(){
      //when the classes are added
      //start the animation by adding the
      //visible class and pulling the view up
      el.classList.add('view--visible');
      
      setTimeout(function(){
        //animation is done
        el.classList.remove('view--down');
        callback();
      }, 600);  
    }, 50);
  }
  
};

nav.init();
//section7 bg color//////////////////////////////////////////////////////////////////
gsap
.timeline({
  scrollTrigger: {
    trigger: "#section7",
    start: "top top",
    end: "+=500",
    scrub: 2,
    duration: 2.5,
    pin: true,
  },
})
.to("#section7 .pro",{background:"#cfcfcf", duration:2.5})
//section8//////////////////////////////////////////////////////////////////
let videoSources = [
  "video/hanacard.mp4",
  "video/sushi.mp4",
  "video/ops.mp4",
  "video/zara.mp4",
  "img/6.jpg"
];

let menuItem = document.querySelectorAll(".menu-item");

menuItem.forEach(function (item, index) {
  let copyElements = item.querySelectorAll(".info, .tag");

  copyElements.forEach(function (div) {
    let copy = div.querySelector("p");
    let duplicateCopy = document.createElement("p");
    duplicateCopy.textContent = copy.textContent;
    div.appendChild(duplicateCopy);
  });

  // Copy <a> tag content as well
  let anchor = item.querySelector(".name a");
  let anchorCopy = anchor.cloneNode(true); // <a> 태그를 복제합니다.
  let anchorContainer = item.querySelector(".name"); // 복제할 위치를 찾습니다.
  anchorContainer.appendChild(anchorCopy); // 복제된 <a> 태그를 추가합니다.

  // 마우스 오버 시 애니메이션을 추가합니다.
  item.addEventListener("mouseover", function () {
    mouseoverAnimation(item);
    appendVideo(videoSources[index]);
    gsap.to(anchorCopy, { // 복제된 <a> 태그에 애니메이션을 적용합니다.
      top: "0%", // top 위치를 이동시킵니다.
      duration: 0.3
    });
    gsap.to(anchor, { // 복제된 <a> 태그에 애니메이션을 적용합니다.
      top: "-100%", // top 위치를 이동시킵니다.
      duration: 0.3
    });
  });

  // 마우스 아웃 시 애니메이션을 추가합니다.
  item.addEventListener("mouseout", function () {
    mouseOutAnimation(item);
    gsap.to(anchorCopy, { // 복제된 <a> 태그에 애니메이션을 적용합니다.
      top: "0%", // top 위치를 이동시킵니다.
      duration: 0.3
    });
    gsap.to(anchor, { // 복제된 <a> 태그에 애니메이션을 적용합니다.
      top: "-100%", // top 위치를 이동시킵니다.
      duration: 0.3
    });
  });
});

// 이미지 추가 함수는 그대로 사용합니다.
function appendVideo(src) {
  let preview1 = document.querySelector(".preview-vid-1");

  let video1 = document.createElement("video");
  video1.src = src;
  video1.autoplay = true;
  video1.loop = true;
  video1.muted = true;
  video1.playsInline = true;

  video1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

  preview1.appendChild(video1);

  gsap.to([video1], {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    duration: 1,
    onComplete: function () {
      removeExtraVideo(preview1); // Correct placement of removeExtraVideo call
    }
  });
}

// 이미지 삭제 함수는 그대로 사용합니다.
function removeExtraVideo(container) {
  while (container.children.length > 10) {
    container.removeChild(container.firstChild);
  }
}

// 마우스 오버 애니메이션 함수 수정 없이 그대로 사용합니다.
function mouseoverAnimation(elem) {
  gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
    top: "-100%",
    duration: 0.3
  });
  gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
    top: "0%",
    duration: 0.3
  });
  gsap.to(elem.querySelectorAll(".name a:nth-child(2) p"), {
    top: "0%",
    duration: 0.3
  });
}

// 마우스 아웃 애니메이션 함수 수정 없이 그대로 사용합니다.
function mouseOutAnimation(elem) {
  gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
    top: "0%",
    duration: 0.3
  });
  gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
    top: "100%",
    duration: 0.3
  });
  gsap.to(elem.querySelectorAll(".name a:nth-child(2) p"), {
    top: "100%",
    duration: 0.3
  });
}

// 기존의 마우스 이벤트 함수는 그대로 사용하되, 이미지 애니메이션은 복제된 <a> 태그에 적용하도록 수정합니다.
document.querySelector(".hoverWrap").addEventListener("mouseout", function () {
  gsap.to(".preview-vid video", {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    ease: "power3.out",
  });
});

document.querySelector(".hoverWrap").addEventListener("mousemove", function (e) {
  let preview = document.querySelector(".preview");
  gsap.to(preview, {
    x: e.clientX,
    y: e.clientY/1.1,
    ease: "power3.out",
  });
});

//section8//////////////////////////////////////////////////
gsap
.timeline({
  scrollTrigger: {
    trigger: "#section8",
    start: "top top",
    end: "+=500",
    scrub: 2,
    duration: 2.5,
    pin: true,
  },
})
.to("#section8",{background:"#eee", duration:2.5})

//section8 bg//////////////////////////////////////////////////
/* -- Glow effect -- */

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}
//section9//////////////////////////////////////////////////

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#section9",
    start: "top top",
    end: "+=4000",
    scrub: 2,
    pin: true,
  },
});

// Animate images with stagger
const images2 = document.querySelectorAll("#section9 .sec9_u_img");
images2.forEach((img, index) => {
  tl2.to(img, { opacity: 0, duration: 2 },); // Overlapping each image fade
  tl2.to(".sec_fin_img",{opacity:0.5,duration: 2.5 })
});

// Animate spans
const spans = document.querySelectorAll("#section9 span");
spans.forEach((span, index) => {
  tl2.fromTo(span, 
    { opacity: 0, filter: "blur(4px)", scale: 0.9, duration: 2.5, }, 
    { opacity: 1, filter: "blur(0)", scale: 1, duration: 2.5, delay: index * 3, ease: "power1.in" }, 
    `-=100` // Starts with images fading
  );
});
tl2.to(spans,{opacity:0,duration:3.5,fontSize:"2vw"},"+=1")
tl2.fromTo("#section10",{height:"-10vh",opacity:0,ease: "power1.inOut",duration:10},
  {height:"77vh",opacity:1,ease: "power1.inOut",duration:10},"-=2")
tl2.to("#section9 .sec9_bg img",{height:"90vh",duration:10},"-=2")
tl2.to("#section9 .animated-title",{opacity:1, duration:2.5})
tl2.to("#section9 .animated-title2",{opacity:1, duration:2.5})
tl2.to("#section9 .sec9_bg_wh",{opacity:0.3, duration:2.5})

////////////////////////////////////////////////////

////////////////////////////////////////////////////

