class SvgLinkEffect {
  constructor(effect) {
    if (effect.config.random) {
      this.randomizeArray(effect.nodes);
    }

    effect.element.addEventListener("click", () => {
      let reverse = effect.element.classList.contains("active") ? true : false;
      effect.element.classList.toggle("active");
      effect.handler(effect.nodes, effect.config, reverse);
    });
  }

  randomizeArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

const svgBounceEffect = (nodes, config, reverse) => {
  nodes.forEach((node, index) => {
    const { duration, ease, y1, y2, offset } = config;
    setTimeout(() => {
      if (reverse) {
        gsap.to(node, {
          duration: duration,
          ease: ease,
          y: y1
        });
      } else {
        gsap.to(node, {
          duration: duration,
          ease: ease,
          y: y2
        });
      }
    }, index * offset);
  });
};

const svgAlertnatingEffect = (nodes, config, reverse) => {
  nodes.forEach((node, index) => {
    const { duration, ease, offset } = config;
    setTimeout(() => {
      if (reverse) {
        gsap.to(node, {
          duration: duration,
          ease: ease,
          y: index % 2 === 0 ? -44 : 44
        });
      } else {
        gsap.to(node, {
          duration: duration,
          ease: ease,
          y: index % 2 === 0 ? 44 : -44
        });
      }
    }, index * offset);
  });
};

document.addEventListener("DOMContentLoaded", (event) => {
  const waveLink = document.getElementById("wave-link");
  const waveLinkEffect = {
    element: waveLink,
    handler: svgBounceEffect,
    nodes: [...waveLink.querySelectorAll("rect")],
    config: {
      offset: 10,
      duration: 1,
      random: false,
      ease: "elastic.out(0.8, 0.3)",
      y1: -20,
      y2: 44
    }
  };

  const randomElasticLink = document.getElementById("random-elastic-link");
  const randomElasticLinkEffect = {
    element: randomElasticLink,
    handler: svgBounceEffect,
    nodes: [...randomElasticLink.querySelectorAll("rect")],
    config: {
      offset: 10,
      duration: 1,
      random: true,
      ease: "elastic.out(0.8, 0.3)",
      y1: -20,
      y2: 44
    }
  };

  const cascadeLink = document.getElementById("cascade-link");
  const cascadeLinkEffect = {
    element: cascadeLink,
    handler: svgBounceEffect,
    nodes: [...cascadeLink.querySelectorAll("rect")],
    config: {
      offset: 10,
      duration: 1,
      random: true,
      ease: "expo.out",
      y1: -20,
      y2: 44
    }
  };

  const randomStepLink = document.getElementById("random-step-link");
  const randomStepLinkEffect = {
    element: randomStepLink,
    handler: svgBounceEffect,
    nodes: [...randomStepLink.querySelectorAll("rect")],
    config: {
      offset: 10,
      duration: 0.8,
      random: true,
      ease: "steps(5)",
      y1: -20,
      y2: 44
    }
  };

  const stepLinkHorizontal = document.getElementById("step-link-horizontal");
  const stepLinkHorizontalEffect = {
    element: stepLinkHorizontal,
    handler: svgBounceEffect,
    nodes: [...stepLinkHorizontal.querySelectorAll("rect")],
    config: {
      offset: 5,
      duration: 0.25,
      random: false,
      ease: "steps(10)",
      y1: -20,
      y2: 44
    }
  };

  const alternatingLink = document.getElementById("alternating-link");
  const alternatingLinkEffect = {
    element: alternatingLink,
    handler: svgAlertnatingEffect,
    nodes: [...alternatingLink.querySelectorAll("rect")],
    config: {
      offset: 5,
      duration: 1,
      random: false,
      ease: "expo.out"
    }
  };

  const alternatingElasticLink = document.getElementById(
    "alternating-elastic-link"
  );
  const alternatingElasticLinkEffect = {
    element: alternatingElasticLink,
    handler: svgAlertnatingEffect,
    nodes: [...alternatingElasticLink.querySelectorAll("rect")],
    config: {
      offset: 10,
      duration: 1,
      random: false,
      ease: "elastic.out(0.8, 0.3)"
    }
  };

  new SvgLinkEffect(waveLinkEffect);
  new SvgLinkEffect(randomElasticLinkEffect);
  new SvgLinkEffect(cascadeLinkEffect);
  new SvgLinkEffect(randomStepLinkEffect);
  new SvgLinkEffect(stepLinkHorizontalEffect);
  new SvgLinkEffect(alternatingLinkEffect);
  new SvgLinkEffect(alternatingElasticLinkEffect);
});
