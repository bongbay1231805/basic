let imageSources = [
  "./assets/img1.jpg",
  "./assets/img2.jpg",
  "./assets/img3.jpg",
  "./assets/img4.jpg",
  "./assets/img5.jpg"
]

let menuItem = document.querySelectorAll(".menu-item")
console.log(menuItem)
//[item,item,item,item,item]
menuItem.forEach(function (item) {
  let copyElements = item.querySelectorAll(".info, .name, .tag")
  copyElements.forEach(function (div) {
    let copy = div.querySelector("p")
    let duplicateCopy = document.createElement("p")
    duplicateCopy.textContent = copy.textContent
    div.appendChild(duplicateCopy)
  })
})

function removeExtraImages(container) {
  while (container.children.length > 10) { //이미지의 갯수가 10보다 커지면
    container.removeChild(container.firstChild) //첫번째 자식요소를 지운다.
  }
}

let appendImages = function (src) {
  let preview1 = document.querySelector(".preview-img-1")
  let preview2 = document.querySelector(".preview-img-2")

  let img1 = document.createElement("img")
  let img2 = document.createElement("img")

  img1.src = src
  img2.src = src
  console.log(img1)
  img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
  img2.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"

  preview1.appendChild(img1)
  preview2.appendChild(img2)

  gsap.to([img1, img2], {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
    duration: 1,
    onComplete: function () { //gsap 애니메이션이 끝나고 나서 할 일
      removeExtraImages(preview1)
      removeExtraImages(preview2)
    }
  })
}

let mouseoverAnimation = function (elem) {
  // console.log(elem)
  gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
    top: "-100%",
    duration: 0.3
  })
  gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
    top: "0%",
    duration: 0.3
  })
}
let mouseOutAnimation = function (elem) {
  gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
    top: "0%",
    duration: 0.3
  })
  gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
    top: "100%",
    duration: 0.3
  })
}

document.querySelectorAll(".menu-item").forEach(function (item, index) {
  item.addEventListener("mouseover", function () {
    // console.log("실행")
    mouseoverAnimation(item)
    appendImages(imageSources[index])
  })
  item.addEventListener("mouseout", function () {
    // console.log("실행")
    mouseOutAnimation(item)
  })

})

document.querySelector(".hoverWrap").addEventListener("mouseout", function(){
  gsap.to(".preview-img  img",{
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "power3.out",
  })
})


document.querySelector(".hoverWrap").addEventListener("mousemove",function(e){
  let preview=document.querySelector(".preview")
  gsap.to(preview,{
    x:e.clientX,
    y:e.clientY,
    duration:1,
    ease: "power3.out",

  })
})