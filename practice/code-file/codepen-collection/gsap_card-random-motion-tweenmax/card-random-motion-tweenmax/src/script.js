const _cards = document.querySelectorAll("li");
const _button1 = document.querySelectorAll("button")[0];
const _button2 = document.querySelectorAll("button")[1];

_button1.addEventListener('click', function(event) {
	cardRandom();
})

_button2.addEventListener('click', function(event) {
	cardSetting();
})


TweenMax.set(_cards, { top: window.innerHeight, left: window.innerWidth /2 })

function cardSetting(){
	_cards.forEach(function(mc, i){
		TweenMax.to(mc, 1, {
			top:i * 40 + 100,
			left:i * 40 + 100,
			rotation: 0,
			ease:Power3.easeInOut, 
			delay: i * .2 
		})
	})
}


function cardRandom(){
	_cards.forEach(function(mc, i){
		TweenMax.to(mc, 1, {
			top:Math.random()*window.innerHeight,
			left:Math.random()*window.innerWidth /2, 
			rotation: Math.random()*180, 
			ease:Power3.easeInOut, 
			delay: i * .2 
		})
	})
}

cardSetting();