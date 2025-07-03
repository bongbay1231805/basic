const {
  gsap: {
    to,
    timeline,
    set,
    registerPlugin,
    utils: { random } },

  ScrollTrigger } =
window;

registerPlugin(ScrollTrigger);

set('svg', { display: 'block ' });

const strands = [...document.querySelectorAll('.strands path')];

set(strands, {
  '--hue': () => random(0, 360),
  '--luminosity': () => random(30, 50),
  strokeDashoffset: index => -Math.round(strands[index].getTotalLength()) - 25,
  strokeDasharray: index => Math.round(strands[index].getTotalLength()) + 50 });


set('.text', { scale: 2, transformOrigin: '50% 50%' });

const STRAND_TWEEN = () =>
to(
strands.sort(() => 0.5 - Math.random()),
{
  repeatRefresh: true,
  duration: () => random(2, 10),
  strokeDashoffset: 0,
  stagger: 0.1 });




const PLAY = () =>
timeline({
  scrollTrigger: {
    scrub: 1,
    start: 'top top',
    end: 'bottom bottom' } }).


add(STRAND_TWEEN());
// .add(TEXT_TWEEN(), '<3.5')

let TL = PLAY();