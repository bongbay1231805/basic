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
    $(".sliderWrap").append($(".img").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({top:-currentIndex*100+"%"},600)

        if(currentIndex==3){
            setTimeout(function(){
                $(".sliderWrap").animate({top:0},0)
                currentIndex=0
            },700)
        }
    },3000)
})