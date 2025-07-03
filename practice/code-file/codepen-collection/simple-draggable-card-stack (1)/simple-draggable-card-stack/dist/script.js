gsap.registerPlugin(Draggable, InertiaPlugin);

let cards = gsap.utils.toArray(".card")

gsap.set(".card", {
  rotation: "random(-40, 40, 5)",
  zIndex: (index) => index,
  text: (index) => `${index}`,
})


Draggable.create(".card", {
  bounds: ".container",
  inertia: true,
  zIndexBoost: false,
  onDragStart: (self) => {
    // you can animate in here
    console.log("clicked");
    gsap.to(self.target, {
      duration: 0.1,
      scale: 1.05,
      ease: "sine.out",
      rotation: 0,
    })
  },
  onThrowComplete:(self) => {
    // and here
    gsap.set(".card", {
      zIndex: "+=1",
    })
    gsap.to(self.target, {
      x: 0,
      y: 0,
      rotation: "random(-40, 40, 5)",
      scale: 1,
      ease: "expo.out",
      zIndex: 0,
    })
  },
});