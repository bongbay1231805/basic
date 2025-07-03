gsap.registerPlugin(ScrollTrigger)

gsap.timeline({
    scrollTrigger:{
        trigger:'.sec02',
        start:'top 50%',
        end:'30% top',
        scrub:2,
        markers:true,
    }
})
.fromTo(".circle",{width:0, height:0,top:'3%'},{width:2500,height:2500,top:'30%'})


// textBox
gsap.timeline({
    scrollTrigger:{
        trigger:'.sec02 .textBox',
        start:'top 80%',
        end:'100% 80%',
        scrub:2,
        markers:true,
    }
})
.fromTo('.textBox',{top:"50%",opacity:0},{top:'40%',opacity:1})