gsap.registerPlugin(ScrollTrigger)

//visual
gsap.timeline({
    scrollTrigger:{
        trigger:".visual",
        start:"top top",
        end:"bottom top",
        scrub:2,
        pin:true,
    }
})
.to(".visual h1",{opacity:1,duration:10},5)
.to(".visual img",{scale:0.4, opacity:0.3,duration:10},5)

let imgBox=document.querySelectorAll('.imgBox')
// console.log(imgBox)

// 배열형태로 불러줌 --> gsap명령문
// console.log(gsap.utils.toArray('.imgBox'))

imgBox.forEach(function(imgBox){
    gsap.timeline({
        scrollTrigger:{
            trigger:imgBox,
            start:"50% 100%",
            toggleClass:{targets:imgBox,className:'active'},
            scrub:1,

        }
    })
})

let textBox=document.querySelectorAll('.textBox')
textBox.forEach(function(textBox){
    gsap.timeline({
        scrollTrigger:{
            trigger:textBox,
            start:"50% 100%",
            toggleClass:{targets:textBox,className:'active'},
            scrub:1,

        }
    })
})