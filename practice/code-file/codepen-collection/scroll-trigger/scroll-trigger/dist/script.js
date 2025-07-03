const activateTab = (e) => {
  let activateTab = document.querySelector(
    ".lai-main__section4-bottom-accordion-item.active"
  );
  let activateTabContent = document.querySelector(
    ".lai-main__section4-bottom-accordion-item.active .lai-main__section4-bottom-accordion-content p"
  );
  activateTab.classList.remove("active");
  activateTabContent.classList.remove("slide-down");
  e.currentTarget.classList.add("active");
  e.currentTarget.children[1].children[0].classList.add("slide-down");
};

function getScrollLookup(targets, {start, pinnedContainer, containerAnimation}) {
  targets = gsap.utils.toArray(targets);
  let initted,
      triggers = targets.map((el, i) => ScrollTrigger.create({
        trigger: el,
        start: start || "top top",
        pinnedContainer: pinnedContainer,
        refreshPriority: -10,
        onRefresh(self) {
          if (initted && Math.abs(self.start) > 999999) {
            triggers[i].kill();
            triggers[i] = ScrollTrigger.create({
              trigger: el,
              start: start || "start start",
              pinnedContainer: pinnedContainer,
              refreshPriority: -10,
            });
          }
        },
        containerAnimation: containerAnimation
      })),
      st = containerAnimation && containerAnimation.scrollTrigger,
      lookups = [],
      lookup = target => {
        let t = gsap.utils.toArray(target)[0],
            i = targets.indexOf(t);
        if (i < 0) {
          for (i = 0; i < lookups.length; i++) {
            if (lookups[i].targets.indexOf(t) !== -1) {
              return lookups[i](t);
            }
          }
          return console.warn("target not found", target);
        }
        return triggers[i].vars.containerAnimation ? st.start + (triggers[i].start / containerAnimation.duration()) * (st.end - st.start) : triggers[i].start;
      };
  lookup.targets = targets;
  lookup.add = (targets, config) => {
    lookups.push(getScrollLookup(targets, config));
    return lookup;
  };
  initted = true;
  return lookup;
}


document.addEventListener("DOMContentLoaded", () => {

  // Select the node that will be observed for mutations
  const targetNode = document.getElementById("accordion-container");

  // Options for the observer (which mutations to observe)
  const config = { attributes: true, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      let dom = mutation.target;
      let isContent = dom.classList.contains(
        "lai-main__section4-bottom-accordion-content"
      );

      if (isContent) {
        if (dom.style.height === "fit-content") {
          dom.parentNode.classList.add("active");
          dom.children[0].classList.add("slide-down");
        } else {
          dom.parentNode.classList.remove("active");
          dom.children[0].classList.remove("slide-down");
        }
      }
    }
  };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
    gsap.registerPlugin(ScrollTrigger);

    var targets = gsap.utils.toArray(
      ".lai-main__section4-bottom-accordion-content"
    );

    var middleTargets = targets;
    var first = middleTargets.shift();
    var last = middleTargets.pop();

    gsap.set(first, {
      height: "fit-content",
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".lai-main__section4",
        scrub: 0.3,
        start: "+=10",
        pin: true,
      },
    });
    timeline
      .to(first, {
        height: "0",
        duration: 0.1,
      })
      .to(middleTargets, {
        duration: 1,
        height: "fit-content",
        stagger: {
          each: 2,
          yoyo: true,
          repeat: 1,
        },
      })
      .to(last, {
        duration: 1,
        height: "fit-content",
      });
  
  let getPosition = getScrollLookup(".lai-main__section4-bottom-accordion-item", { containerAnimation: timeline});

gsap.utils.toArray(".lai-main__section4-bottom-accordion-item").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    gsap.to(window, {
      scrollTo: getPosition(el.getAttribute("scoll-pos")),
      overwrite: "auto",
      duration: 1
    });
  });
});

});