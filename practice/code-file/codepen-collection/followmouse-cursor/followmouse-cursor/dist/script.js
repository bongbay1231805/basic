let bottonWrap = document.getElementsByClassName("bottonWrap")[0];
let btn = document.getElementsByClassName("btn")[0];
let target = document.getElementsByClassName("target")[0];
let cursorItem = document.getElementsByClassName("cursorItem")[0];
let cursor = document.getElementsByTagName("span")[0];
let x=0, y = 0;
let mx=0, my = 0;
let tx=0, ty=0;
let overchk = false;

loop();

btn.addEventListener("mouseover", function(e){
	cursor.style.transform = "scale(2)";
	overchk = true;
})
btn.addEventListener("mouseout", function(e){
	cursor.style.transform = "scale(1)";
	overchk = false;
})

window.addEventListener("mousemove", function(e){
	x = e.clientX;
	y = e.clientY;
});

function loop(){
	mx += (x - mx ) * .09;
	my += (y - my ) * .09; 
	cursorItem.style.transform = "translate("+ mx +"px, "+ my + "px )";
	// console.log(overchk)
	if(overchk) {
		tx += (x - (getOffset(target).left + 100 ) - tx) * .04;
		ty += (y - (getOffset(target).top + 100 ) - ty) * .04;
		target.style.transform = "translate("+ tx +"px, "+ ty +"px)";
	}else{
		tx += (getOffset(bottonWrap).left - 100 - (getOffset(target).left -100 ) - tx) * .1;
		ty += (getOffset(bottonWrap).top - 100 - (getOffset(target).top -100 ) - ty) * .1;
		target.style.transform = "translate("+ tx +"px, "+ ty +"px)";
	}
	 requestAnimationFrame(loop);
}

function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

//https://monsieurnoss.com/about/