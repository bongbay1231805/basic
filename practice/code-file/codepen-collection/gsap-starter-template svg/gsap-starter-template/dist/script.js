//gsap.to()... infinity and beyond!

//To learn more about using GreenSock's bonus plugins for free on CodePen visit: https://gsap.com/trial

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, GSDevTools);

console.clear();

gsap.defaults({ ease: "none" });

const tl = gsap
  .timeline({
    paused: true,
    defaults: {
      ease: "none",
      duration: 1
    }
  })
  .fromTo("#theLine", { 
    drawSVG: "0% 0%" 
  }, { 
    drawSVG: "0% 100%",
    ease: pathEase("#theLine", { smooth: 20 }) // <-- MAGIC!*/
  }, 0.02)
  .to("svg", { yPercent: -92 }, 0)
  .progress(0.0001);

const boxes = gsap
  .timeline({
    defaults: {
      scale: 1,
      autoAlpha: 1,
      transformOrigin: "center",
      ease: "elastic(2.5, 4)",
      markers: true
    }
  })
  .to("#_shifthappens", {}, 1)
  .to("#A_big_change_just_happened", {}, 2)
  .to("#Athlete", {}, 3.8)
  .to("#There_ll_be_winners", {}, 5.2)
  .to("#_1995_Box", {}, 7.58)
  .to("#_2000_Box", {}, 7.58)
  .to("#_2010_Box", {}, 9.2)
  .to("#_2023_Box", {}, 9.2)
  .to("#Infinity_Box", {}, 12.5)
  .to("#Heart_Box", {}, 12.5)
  .to("#Cloud_Box", {}, 13.0)
  .to("#Profile_Box", {}, 13.0)
  .to("#Build_the_promised_land", {}, 15.0)
  .to("#AI_s_box_of_magic_gifts", {}, 17.0)
  .to("#Thumbs_Up", {}, 18.8)
  .to("#The_evidence_is", {}, 19.2)
  .to("#So_whats_the_catch_", {}, 22.2)
  .to("#Ambitious", {}, 22.5)
  .to("#Long_term_vision", {}, 22.6)
  .to("#Willing_to_invest", {}, 22.8)
  .to("#Is_this_you_", {}, 23.5)
  .to("#Get_in_touch", {}, 24.8)
  .to("#A_great_experience", {}, 26.5)
  .to("#WEB_understand", {}, 27.2)
  .to("#Experienced", {}, 29.8)
  .to("#Start_Here", {}, 32.0);

const main = gsap
  .timeline({
    defaults: {
      duration: 1,
      ease: "none"
    },
    scrollTrigger: {
      trigger: "#svg",
      start: "15% center",
      end: "max",
      scrub: 0.2,
      markers: true,
    }
  })
  /*.to(tl, {progress: 0.5, duration: 3})
.to(tl, {progress: 0.5, duration: 2})
.to(tl, {progress: 0.602791, duration: 4})
.to(tl, {progress: 0.708, duration: 2})
.to(tl, {progress: 0.8616, duration: 2})
.to(tl, {progress: 0.1, duration: 20})
.to(tl, {progress: 0.3, duration: 40})
.to(tl, {progress: 0.5, duration: 50})*/
  .to(tl, { 
    progress: 1, 
    duration: 32,
    //ease: pathEase("#theLine", { smooth: true }) // <-- MAGIC!*/
  })
  .add(boxes, 0.015);

setInterval(function () {
  document.querySelector("#stats").innerHTML = main.totalProgress();
  document.querySelector("#stats").innerHTML += "<br>";
  document.querySelector("#stats").innerHTML +=
    (main.totalDuration() / 100) * main.totalProgress() * 100;
  document.querySelector("#stats").innerHTML += "<br>";
  document.querySelector("#stats").innerHTML += main.totalDuration();
}, 10);



/* 
Helper function that returns an ease that bends time to ensure the target moves on the y axis in a relatively steady fashion in relation to the viewport (assuming the progress of the tween is linked linearly to the scroll position). Requires MotionPathPlugin of course.
You can optionally pass in a config option with any of these properties: 
  - smooth: if true, the target can drift slightly in order to smooth out the movement. This is especially useful if the path curves backwards at times. It prevents super-fast motions at that point. You can define it as a number (defaults to 7) indicating how much to smooth it.
  - precision: number (defaults to 1) controlling the sampling size along the path. The higher the precision, the more accurate but the more processing.
  - axis: "y" or "x" ("y" by default)
*/ 
function pathEase(path, config={}) {
  let axis = config.axis || "y",
      precision = config.precision || 1,
      rawPath = MotionPathPlugin.cacheRawPathMeasurements(MotionPathPlugin.getRawPath(gsap.utils.toArray(path)[0]), Math.round(precision * 12)),
			useX = axis === "x",
			start = rawPath[0][useX ? 0 : 1],
			end = rawPath[rawPath.length - 1][rawPath[rawPath.length-1].length - (useX ? 2 : 1)],
			range = end - start,
			l = Math.round(precision * 200),
			inc = 1 / l,
			positions = [0],
			a = [],
			minIndex = 0,
      smooth = [0],
      minChange = (1 / l) * 0.6,
      smoothRange = config.smooth === true ? 7 : Math.round(config.smooth) || 0,
      fullSmoothRange = smoothRange * 2,
			getClosest = p => {
				while (positions[minIndex] <= p && minIndex++ < l) { }
				a.push(a.length && ((p - positions[minIndex-1]) / (positions[minIndex] - positions[minIndex - 1]) * inc + minIndex * inc));
        smoothRange && a.length > smoothRange && (a[a.length - 1] - a[a.length - 2] < minChange) && smooth.push(a.length - smoothRange);
			},
			i = 1;
  for (; i < l; i++) {
    positions[i] = (MotionPathPlugin.getPositionOnPath(rawPath, i / l)[axis] - start) / range;
  }
  positions[l] = 1;
  for (i = 0; i < l; i++) {
    getClosest(i / l);
  }
  a.push(1); // must end at 1.
  if (smoothRange) { // smooth at the necessary indexes where a small difference was sensed. Make it a linear change over the course of the fullSmoothRange
    smooth.push(l-fullSmoothRange+1);
    smooth.forEach(i => {
      let start = a[i],
          j = Math.min(i + fullSmoothRange, l),
          inc = (a[j] - start) / (j - i),
          c = 1;
      i++;
      for (; i < j; i++) {
        a[i] = start + inc * c++;
      }
    });
  }
  return p => {
    let i = p * l,
        s = a[i | 0];
    return i ? s + (a[Math.ceil(i)] - s) * (i % 1) : 0;
  }
}