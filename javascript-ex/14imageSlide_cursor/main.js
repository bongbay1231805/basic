let imageSliders = document.querySelectorAll(".image-slider")
//[item,item]
imageSliders.forEach(function (imageSlider) {
  let prev = imageSlider.querySelector(".prev-slide");
  let next = imageSlider.querySelector(".next-slide");
  let slideNum = imageSlider.querySelector(".slide-num");
  let tracker = imageSlider.querySelector(".tracker");
  let images = imageSlider.querySelectorAll(".image-slider img");


  let slideId = 0 //슬라이드 번호
  prev.addEventListener("click", function () {
    slideId--
    if (slideId < 0) {
      slideId = images.length - 1
    }
    slideNum.innerHTML = `${slideId + 1} / ${images.length}`

    //모든 이미지 선택
    images.forEach(function (img) {
      img.style.width = 0
      img.style.right = 0
      img.style.left = "initial"
    })
    images[slideId].style.width = "100%"
    images[slideId].style.right = "initial"
    images[slideId].style.left = "0"
  }) //click함수

  next.addEventListener("click", function () {
    slideId++
    if (slideId > images.length - 1) {
      slideId = 0
    }
    slideNum.innerHTML = `${slideId + 1} / ${images.length}`

    //모든 이미지 선택
    images.forEach(function (img) {
      img.style.width = 0
      img.style.left = 0
      img.style.right = "initial"
    })
    images[slideId].style.width = "100%"
    images[slideId].style.left = "initial"
    images[slideId].style.right = "0"
  }) //click함수

  let scrollAmmount = 0
  let yPos = imageSlider.offsetTop // 문서의 top에서 선택한 영역의 top까지의 높이값
  // console.log(yPos) 477 1906
  let xPos = 0

  function mouseTracker() {
    scrollAmmount = window.scrollY + yPos

    tracker.style.top = `${scrollAmmount}px`
    tracker.style.left = `${xPos}px`
  }

  window.addEventListener("mousemove", function (e) {
    yPos = (e.clientY - tracker.offsetHeight / 2) - imageSlider.offsetTop
    xPos = (e.clientX - tracker.offsetWidth / 2) - imageSlider.offsetLeft
    mouseTracker()
  })

  window.addEventListener("scroll", function () {
    mouseTracker()
  })

  prev.addEventListener("mouseenter", function () {
    imageSlider.querySelector(".arrow-prev").style.width = "1rem"
    imageSlider.querySelector(".arrow-next").style.width = "0"
    tracker.style.paddingRight = 0
  })
  next.addEventListener("mouseenter", function () {
    imageSlider.querySelector(".arrow-prev").style.width = "0"
    imageSlider.querySelector(".arrow-next").style.width = "1rem"
    tracker.style.paddingLeft = 0
  })

  prev.addEventListener("mouseout",()=>{tracker.style.paddingRight="0.8em"})
  next.addEventListener("mouseout",()=>{tracker.style.paddingLeft="0.8em"})

}) //forEach문