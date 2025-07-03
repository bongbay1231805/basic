gsap.registerPlugin(SplitText);
gsap.config({ trialWarn: false });
console.clear();

const repeatCount = 8;
const tl = gsap.timeline({ paused: true });
const split = new SplitText("h1", { type: "chars" });

split.chars.forEach((obj, i) => {
  let txt = obj.innerText;
  let clone = `<div class="cloneText"> ${txt} </div>`;
  let newHTML = `<div class="originalText"> ${txt} </div>${clone}`;
  obj.innerHTML = newHTML;
  gsap.set(obj.childNodes[1], {
    yPercent: i % 2 === 0 ? -100 : 100
  });
  let tween = gsap.to(obj.childNodes, {
    repeat: repeatCount,
    ease: "none",
    yPercent: i % 2 === 0 ? "+=100" : "-=100"
  });
  tl.add(tween, 0);
});
gsap.to(tl, { progress: 1, duration: 4, ease: "power4.inOut" });

GSDevTools.create();
