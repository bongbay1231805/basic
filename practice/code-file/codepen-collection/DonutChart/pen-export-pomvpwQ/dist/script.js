function updateDonutChart(percent, elem) {
  const circle = document.querySelector(elem);
  const text = document.querySelector('.donut-text');
  const offset = 100 - percent;

  circle.style.strokeDashoffset = offset;
  text.textContent = `${percent}%`;
}

// 예를 들어, 70%로 업데이트

let prograss = 0
setInterval(()=>{
  updateDonutChart(prograss+1, '.donut-segment');
},1000)