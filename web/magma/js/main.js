gsap.registerPlugin(ScrollTrigger)

//text ani
let pTag1=document.querySelector(".mg-featured-reel-wrap .items")
let count=0

//pTag1을 복사하여 붙임
let newItems=pTag1.cloneNode(true)

//복사한 내용을 태그에 삽입
let nextElement=document.querySelector(".mg-featured-reel-wrap")
nextElement.appendChild(newItems)
//pTag1.offsetWidth --> pTag의 넓이
nextElement.style.width=pTag1.offsetWidth * 2 + "px"

function marqueeText(count,element,direction){
    //scrollWidth ==> 숨어있는 공간이 있더라도 원래의 넓이를 찾아서 가져옴
    if(count>element.scrollWidth/2){
        count=0
        element.style.transform=`translate3d(0,0,0)`
    }
    element.style.transform=`translate3d(${count * direction}px,0,0)`
    return count
}

function animate(){
    count++
    count=marqueeText(count,nextElement,1)
    requestAnimationFrame(animate)
}
animate()
