console.clear();

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

if (ScrollTrigger.isTouch !== 1) {
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 2,
    normalizeScroll: true,
    preventDefault: true
  });
}

const container = document.querySelector("#sectionStage"),
  sections = gsap.utils.toArray(".section"),
  tl = gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top top",
      end: "+=6000",
      pin: true,
      scrub: true
      // markers: true
    }
  });

sections.forEach((section, i) => {
  const panels = gsap.utils.toArray(".panel", section);

  tl.to(
    section,
    {
      y: section.clientHeight - section.scrollHeight,
      zIndex: 100,
      duration: panels.length * 0.5,
      onUpdate: function () {
        //if (!$("body").hasClass('goto')) {
        $("#currentSection span").removeClass("active");
        $("#sectionSelect li").removeClass("active");
        var $currentSectionString = $(
          '#currentSection span[data-section="' + i + '"]'
        ).html();
        $('#currentSection span[data-section="' + i + '"]').addClass("active");
        $('#sectionSelect li[data-section="' + i + '"]').addClass("active");
        $(".listbox__sections").removeClass("is-open");
        $("#activeSection").text($currentSectionString);

        if (tl.nextLabel()) $(".section-next").removeClass("disable");
        else $(".section-next").addClass("disable");
        if (tl.previousLabel() == "section-0")
          $(".section-prev").addClass("disable");
        else $(".section-prev").removeClass("disable");
      }
    },
    "section-" + i
  );
  if (sections[i + 1]) {
    tl.to(".content", {
      xPercent: -100 * (i + 1)
    });
  }
});

const buttons = gsap.utils.toArray(".section-btn");
buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    gsap.to(window, {
      duration: 0.66,
      scrollTo: tl.scrollTrigger.labelToScroll("section-" + i),
      onUpdate: ScrollTrigger.update,
      ease: "power1.inOut"
    });
  });
});

const next = gsap.utils.toArray(".section-next");
next.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    if (tl.nextLabel()) {
      gsap.to(window, {
        duration: 0.66,
        scrollTo: tl.scrollTrigger.labelToScroll(tl.nextLabel()),
        onUpdate: ScrollTrigger.update,
        ease: "power1.inOut"
      });
    }
  });
});

const previous = gsap.utils.toArray(".section-prev");
previous.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    const currentSplit = tl.currentLabel().split("-");
    const previousSlide = "section-" + (currentSplit[1] - 1);
    if (tl.previousLabel()) {
      gsap.to(window, {
        duration: 0.66,
        scrollTo: tl.scrollTrigger.labelToScroll(previousSlide),
        onUpdate: ScrollTrigger.update,
        ease: "power1.inOut"
      });
    }
  });
});

// LISTBOX BOTTOM EFFECTS - Click and Hover
var listBoxToggleOpenHandler = function () {
  $(".listbox").on("click touch", function () {
    $("#sectionSelect").toggleClass("is-open");
  });
};

listBoxToggleOpenHandler();

var listBoxActiveClassHoverHandler = function () {
  var active = $(".active");
  $(".listbox ul li")
    .on("mouseenter", function () {
      $(".listbox ul li.active").removeClass("active"); // remove class from previous active item
      $(this).addClass("active"); // item class to the current one
    })
    .on("mouseleave", function () {
      $(".listbox ul li.active").removeClass("active"); // remove class from previous active item
      active.addClass("active"); // item class to the current one
    });
};

listBoxActiveClassHoverHandler();

if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}
