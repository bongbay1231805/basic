$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(this).find($(".submenu")).stop().slideDown()
    })
    $(".nav>ul>li").mouseout(function(){
        $(this).find($(".submenu")).stop().slideUp()
    })
})

$(function(){
    let currentIndex=0
    $(".sliderWrap").append($(".slider").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({marginTop:-currentIndex * 300 + "px"},600)
        if(currentIndex == 3){
            $(".sliderWrap").animate({marginTop:0},0)
            currentIndex=0
        }
    },3000)
})