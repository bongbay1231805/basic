const progressBar = document.querySelector(".progressBar");
const numText = progressBar.querySelector("p");

window.addEventListener("scroll", function (e) {
  const scrollTop = document.documentElement.scrollTop;
  const documentHeight = document.body.offsetHeight - window.innerHeight;
  const per = Math.ceil(scrollTop / documentHeight * 100);
  progressBar.style.width = `${per}%`;
  numText.innerText = `${per}%`;
});