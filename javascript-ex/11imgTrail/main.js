let container=document.querySelector('.items')
let imageIndex=1
let animationTimeoust=null
let currentlyPlaying=false

function addNewItem(x,y){
    //div 태그 만들기
    let newItem=document.createElement("div")
    newItem.className="item"

    let img=document.createElement("img")
    img.src=`./assets/img${imageIndex}.jpg`
    newItem.appendChild(img)

    imageIndex=(imageIndex % 15) + 1 //이미지가 1~15가 선택되도록
    console.log(imageIndex)
    container.appendChild(newItem)
    newItem.style.left=`${x - 75}px`
    newItem.style.top=`${y - 100}px`

    manageItemLimit()
}

function manageItemLimit(){
    while(container.children.length>20){ //while 반복문
        container.removeChild(container.firstChild)
    }
}

function startAnimation(){
    if(currentlyPlaying || container.children.length === 0){
        return
    }

    currentlyPlaying=true

    gsap.to('.item',{
        y:1000,
        scale:0.5,
        opacity:0,
        duration:0.5,
        stagger:0.025,
        onComplete:function(){//위의 애니메이션이 끝나고 나면 할일
            currentlyPlaying=false
        }
    })
}


container.addEventListener("mousemove",function(event){
    //console.log(event)
    clearTimeout(animationTimeoust)
    addNewItem(event.clientX,event.clientY)
    animationTimeoust=setTimeout(startAnimation,100)
})



// setInterval(할일, 시간) //시간마다 할일
// setTimeout(할일, 시간) //시간후에 할일

//멈추게 하기
// let stopInterval=setInterval(할일,시간)
// clearInterval(stopInterval) ==> setInterval 멈추기

// let stopTimeout=setTimeout(할일, 시간)
// clearTimeout(stopTimeout) ==> setTimeout 멈추기