const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scroll-trigger",
    pin: true,
    scrub: 1,
    start: "top top",
    end: "+=4000",
    toggleActions: "play pause play reset" } });



tl.from(".title", {
  opacity: 0,
  duration: 1 }).

from(
"[data-slide='1'] .image",
{
  opacity: 0,
  duration: 1,
  scale: 0.75 },

"+=1").

from(
"[data-slide='1'] .text",
{
  opacity: 0,
  duration: 1,
  stagger: 1 },

"+=1").

to(
"[data-slide='1'] .text",
{
  opacity: 0,
  duration: 1,
  stagger: 1 },

"+=10").

to("[data-slide='1'] .image", {
  opacity: 0,
  duration: 1 }).

from(
"[data-slide='2'] .image",
{
  opacity: 0,
  duration: 1,
  scale: 0.75 },

"+=1").

from(
"[data-slide='2'] .text",
{
  opacity: 0,
  duration: 1,
  stagger: 1 },

"+=1").

to(
"[data-slide='2'] .text",
{
  opacity: 0,
  duration: 1,
  stagger: 1 },

"+=10").

to("[data-slide='2'] .image", {
  opacity: 0,
  duration: 1 }).

from(
"[data-slide='3'] .image",
{
  opacity: 0,
  duration: 1,
  scale: 0.75 },

"+=1").

from(
"[data-slide='3'] .text",
{
  opacity: 0,
  duration: 1,
  stagger: 1 },

"+=1").

to(
"[data-slide='3'] .text",
{
  opacity: 0,
  duration: 1,
  stagger: 1 },

"+=10").

to("[data-slide='3'] .image", {
  opacity: 0,
  duration: 1 });