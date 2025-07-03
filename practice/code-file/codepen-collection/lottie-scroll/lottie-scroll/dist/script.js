gsap.registerPlugin(ScrollTrigger);

var elem = document.getElementById('title');
var elem2 = document.getElementById('title2');
var elem3 = document.getElementById('title3');

LottieScrollTrigger({
  target: "#title",
  path: "https://assets.codepen.io/4086427/data_4.json",
  speed: "medium",
  pin: ".main",
  start: "center center",
  end: () => `+=${elem.offsetHeight}`,
  scrub: 1,
  markers: true
});

LottieScrollTrigger({
  target: "#title2",
  path: "https://assets.codepen.io/4086427/data_4.json",
  speed: "medium",
  pin: ".main",
  start: "center center",
  end: () => `+=${elem2.offsetHeight}`,
  pinnedContainer: '.main',
  scrub: 1,
  markers: true
});

LottieScrollTrigger({
  target: "#title3",
  path: "https://assets.codepen.io/4086427/data_4.json",
  speed: "medium",
  pin: ".main",
  start: "center center",
  end: () => `+=${elem3.offsetHeight}`,
  pinnedContainer: '.main',
  scrub: 1,
  markers: true
});


function LottieScrollTrigger(vars) {
	let playhead = {frame: 0},
		target = gsap.utils.toArray(vars.target)[0],
		speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"},
		st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1},
		animation = lottie.loadAnimation({
			container: target,
			renderer: vars.renderer || "svg",
			loop: false,
			autoplay: false,
			path: vars.path
		});
	for (let p in vars) { // let users override the ScrollTrigger defaults
		st[p] = vars[p];
	}
	animation.addEventListener("DOMLoaded", function() {
		gsap.to(playhead, {
			frame: animation.totalFrames - 1,
			ease: "none",
			onUpdate: () => animation.goToAndStop(playhead.frame, true),
			scrollTrigger: st
		});
	});
}