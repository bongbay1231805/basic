$(function(){
    $(".nav>ul>li").mouseover(function(){
        $(".submenu").stop().slideDown(300)
        $("#header .container").addClass("on")
    })
    $(".nav>ul>li").mouseout(function(){
        $(".submenu").stop().slideUp(100)
        $("#header .container").removeClass("on")
    })
})

$(function(){
    let currentIndex=0
    $(".sliderWrap").append($(".slider").first().clone(true))

    setInterval(function(){
        currentIndex++
        $(".sliderWrap").animate({marginLeft:-currentIndex * 100 + "%"},600)
        if(currentIndex==3){
            setTimeout(function(){
                $(".sliderWrap").animate({marginLeft:0},0)
                currentIndex=0
            })
        }
    },3000)
})