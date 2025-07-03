$(function(){
    let currentIndex=0
    $(".sliderWrap").append($(".img").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".slider .sliderWrap").animate({marginLeft:-currentIndex*100+"%"},600)
        if(currentIndex==3){
            setTimeout(function(){
                $(".slider .sliderWrap").animate({marginLeft:0},0) 
            },700)
        }
    },3000)
})