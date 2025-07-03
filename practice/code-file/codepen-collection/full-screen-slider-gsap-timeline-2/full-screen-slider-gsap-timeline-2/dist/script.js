/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */

var slides=document.querySelectorAll('.slide'),tl=new TimelineLite({paused:true});
for(var i=slides.length;i--;){
    var D=document.createElement('div'); D.className='Dot'; D.id='Dot'+i;
    D.addEventListener('click',function(){ tl.seek(this.id).pause() });
    document.getElementById('Dots').appendChild(D);
    tl.add('Dot'+i)
    if(i>0){
      if(i!=slides.length-1){tl.addPause()}
        tl.to(slides[i],0.5,{scale:.5,ease:Back.easeOut})
        .to(slides[i],0.7,{xPercent:-50},'L'+i)
        .from(slides[i-1],0.7,{xPercent:50},'L'+i)
        .to('#Dot'+i,0.7,{backgroundColor:'rgba(255,255,255,0.2)'},'L'+i)
        .set(slides[i],{zIndex:1-i}).set(slides[i-1],{zIndex:slides.length})
        .from(slides[i-1],0.5,{scale:.5,ease:Back.easeIn})
    };
};
function GO(e){
  var SD=isNaN(e)?e.wheelDelta||-e.detail:e;
  if(SD<0){tl.play()}else{tl.reverse()};
};

document.addEventListener("mousewheel",GO);
document.addEventListener("DOMMouseScroll",GO);
document.getElementById('nextBtn').addEventListener("click",function(){GO(-1)});
document.getElementById('prevtBtn').addEventListener("click",function(){GO(1)});

/* a Pen by Diaco m.lotfollahi  : https://diacodesign.com */