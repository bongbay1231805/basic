const count = gsap.timeline({paused:true, defaults:{ease:'power1.in'}})
.fromTo('#num', {textContent:'0%'},{textContent:'100%', snap:'textContent'}, 0)
.fromTo('#fill', {transformOrigin:'0 100%', scaleY:0.08}, {scaleY:0.95}, 0)

const anim = gsap.timeline({defaults:{ease:'power2.inOut', duration:3}})
.set('svg', {opacity:1}, 0)
.fromTo('#bg', {height:0, top:'100%'},{height:'100%', top:0, ease:'power1.in'}, 0)
.fromTo(count, {progress:0},{progress:1, ease:'steps(40)'}, 0)
.fromTo('svg', {yPercent:100},{yPercent:0}, 0)
.to('svg', {opacity:0, duration:0.7}, 2.9)

window.onclick =()=> anim.play(0) //click to replay

window.onresize = ()=> anim.invalidate() //need to recalculate 100% of #bg